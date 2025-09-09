const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/', async (req, res) => {
  const { question } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Você é uma IA útil e amigável.' },
        { role: 'user', content: question },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const answer = chatCompletion.choices[0].message.content;
    res.json({ answer });

  } catch (error) {
    console.error("Erro ao chamar OpenAI:", error.response?.data || error.message || error);
    res.status(500).json({ answer: 'Erro ao consultar a IA.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

