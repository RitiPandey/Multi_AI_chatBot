// server/src/stream.js
import 'dotenv/config';
import express from 'express';
import contentstack from 'contentstack';
import OpenAI from 'openai';
import fetch from 'node-fetch'; // install node-fetch if you don't have it
import { randomUUID } from 'crypto';

const router = express.Router();

// Contentstack stack (same as before)
const Stack = contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
});

// OpenAI + Groq clients
const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// Groq client uses same SDK but baseURL to Groq endpoint
const groqClient = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// helper: fetch relevant entries (simple)
async function fetchRelevantEntries({ contentTypeUid, queryText, limit = 4 }) {
  try {
    const Query = Stack.ContentType(contentTypeUid).Query();
    // a safe approach: query on title OR location OR description - adjust per your model
    Query.skip(0).limit(limit);
    const [result] = await Query.toJSON().find();
    return result || [];
  } catch (err) {
    console.error('Contentstack fetch error', err);
    return [];
  }
}

// Helper: chunk text into N-character pieces
function chunkText(text, size = 200) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) chunks.push(text.slice(i, i + size));
  return chunks;
}

// SSE endpoint
router.get('/stream', async (req, res) => {
  const { prompt, provider = 'groq', contentTypeUid = 'tour' } = req.query;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  const sessionId = randomUUID();

  // get CMS context
  const entries = await fetchRelevantEntries({ contentTypeUid, queryText: prompt, limit: 4 });
  const cmsContext = entries.map((e, i) => `#${i + 1} ${e.title || e.uid}\n${(e.description || e.body || '').toString().slice(0, 800)}`)
    .join('\n\n');

  // system message
  const systemMessages = [
    { role: 'system', content: 'You are a helpful domain agent. Use the provided CMS_CONTEXT when answering.' },
    { role: 'system', content: `CMS_CONTEXT:\n${cmsContext || '(none)'}` },
  ];
  const messages = [
    ...systemMessages,
    { role: 'user', content: prompt },
  ];

  // choose client & model
  let client = provider === 'openai' ? openaiClient : groqClient;
  let model = provider === 'openai' ? (process.env.OPENAI_MODEL || 'gpt-4o-mini') : (process.env.GROQ_MODEL || 'llama-3.1-8b-instant');

  try {
    // Try streaming support — OpenAI supports streaming via stream: true; Groq may not
    // We attempt streaming for OpenAI. For Groq we fetch full result then chunk it.
    if (provider === 'openai' && client) {
      const stream = await client.chat.completions.create({
        model,
        messages,
        stream: true,
      });

      for await (const part of stream) {
        const delta = (part.choices?.[0]?.delta?.content) || '';
        if (delta) {
          res.write(`data: ${JSON.stringify({ delta })}\n\n`);
        }
      }

      // done
      res.write('event: done\ndata: [DONE]\n\n');
      res.end();
      return;
    }

    // For non-streaming providers (or if streaming fails), get full content then chunk
    const completion = await client.chat.completions.create({
      model,
      messages,
    });

    const text = completion.choices?.[0]?.message?.content || 'No reply';
    const chunks = chunkText(text, 300);
    for (const c of chunks) {
      res.write(`data: ${JSON.stringify({ delta: c })}\n\n`);
      await new Promise(r => setTimeout(r, 120)); // small pacing so frontend renders progressively
    }

    res.write('event: done\ndata: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Stream error', err);
    if (err?.response?.status === 429) {
      res.write(`event: error\ndata: ${JSON.stringify({ message: 'Quota exceeded' })}\n\n`);
      res.end();
    } else {
      res.write(`event: error\ndata: ${JSON.stringify({ message: err.message || 'AI error' })}\n\n`);
      res.end();
    }
  }
});

export default router;
