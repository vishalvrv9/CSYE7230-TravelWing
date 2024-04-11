const { OpenAI } = require('openai');
const { chatgptKey } = require('../config/vars');


// const openAi = new OpenAI({
//   apiKey: process.env.CHATGPT_KEY,
// });

exports.chatGPTResponse = async (prompt, openaiConfig) => {
  try {
    console.log(openaiConfig, prompt);
    const response = await openAi.chat.completions.create({
      ...openaiConfig,
      messages: [{
        role: "user",
        content: prompt
      }]
    });
    return response.choices[0].message;
  } catch (err) {
    console.log(err);
    return "couldn't process the request now! please try again later!!";
  }
};
