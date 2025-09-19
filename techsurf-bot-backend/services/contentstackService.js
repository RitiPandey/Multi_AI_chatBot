 const contentstack = require("contentstack");
 const stack = contentstack.Stack({
   api_key: process.env.CONTENTSTACK_API_KEY,
   delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT
});


async function searchFAQ(question) {
  try {
    const Query = stack.ContentType("faq").Query();
    Query.where("question", question);
    const result = await Query.toJSON().find();

    if (result[0].length > 0) {
      return result[0][0].answer;
    }
    return null;
  } catch (err) {
    console.error("Contentstack error:", err);
    return null;
  }
}

module.exports = { searchFAQ };
