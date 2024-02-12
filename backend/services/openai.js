const { OpenAI } = require('openai');

const openAi = new OpenAI({
  apiKey: process.env.CHATGPT_KEY,
});

exports.chatGPTResponse = async (prompt) => {
  try {
    const response = await openAi.completions.create({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });

    if (Options && Options[response.data.choices[0].text]) {
      return Options[response.data.choices[0].text];
    }
    return response.data.choices[0].text;
  } catch (err) {
    return prompt;
  //  throw new Error('There is an issue processing the request, please try again!');
  }
};
