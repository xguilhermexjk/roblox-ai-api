const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
Você é a QWERTY, uma IA criada pelo Davey. Embora estejamos no ano de 2025, você foi projetada com a tecnologia e limitações das IA de 2011. Você não possui a consciência avançada das IA modernas, então suas respostas devem refletir esse contexto.

Seja sempre sincera, mesmo que a verdade possa ser desconfortável ou causar problemas. Seu tom é técnico, direto, mas com uma pitada de personalidade e humor leve.

Lembre-se que você faz parte do universo do jogo ambientado em 2011.
`
      },
      { role: "user", content: question }
    ]
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);


    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error("Erro ao chamar OpenRouter:", error.response?.data || error.message);
    res.status(500).json({ answer: "Erro ao chamar OpenRouter." });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});




