import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "";

const generateAction = async (req,res) => {
  const {userInput} = req.body
  console.log(` API : ${basePromptPrefix}${userInput}\n`)

  const prompt = `
  Write a linked in post using the title and using appropriate tags for 
  
  Title: ${userInput}

  Linkedin post :
  `
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 250
  })

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({output: basePromptOutput});
}

export default generateAction