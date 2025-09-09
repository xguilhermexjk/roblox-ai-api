const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/', async (req, res) => {
  const { question } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Você é uma IA útil e amigável.' },
        { role: 'user', content: question },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const answer = completion.data.choices[0].message.content;
    res.json({ answer });

  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: 'Erro ao consultar a IA.' });
  }
});

app.get('/', (req, res) => {
  res.send('API está rodando com IA real!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
