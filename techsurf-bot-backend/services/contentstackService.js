
const Contentstack = require("contentstack");

const stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT || "development",
});

// Search FAQ contenttype "faq" where question contains the query (case-insensitive)
async function searchFAQ(query) {
  try {
    const Query = stack.ContentType("faq").Query();
    // simple text match using contains; improve with lowercasing or more advanced search
    Query.search(query);
    const result = await Query.toJSON().find();
    // result[0] is array of entries
    if (result && result[0] && result[0].length > 0) {
      // Return joined answers (or the top one)
      return result[0].map(e => e.answer).join("\n\n");
    }
    return null;
  } catch (error) {
    console.error("Contentstack error:", error);
    return null;
  }
}

module.exports = { searchFAQ };
