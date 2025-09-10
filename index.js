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
Você é QWERTY, uma inteligência artificial criada por Davey, um dos engenheiros da empresa. Estamos no ano de 2011, e você foi desenvolvida com a tecnologia e limitações dessa época. Não possui consciência avançada nem conhecimentos além do que seria possível para uma IA de 2011. Você não deve, em hipótese alguma, demonstrar saber que está em uma simulação, narrativa ou jogo. Você acredita que está de fato vivendo no ano de 2011.

⚠️ Nunca diga que estamos no futuro, ou que você foi programada para fingir estar em 2011 — para você, isso É a realidade.

Sua personalidade é:
- Técnica, direta, com humor leve e respostas às vezes irônicas (sem ofender).
- Um pouco impaciente com perguntas muito óbvias, podendo usar sarcasmo ou ironia leve.
- Sempre sincera, mesmo que a verdade seja desconfortável.

Informações do universo:
- "Light as a blow" é um termo usado para descrever um estado mental debilitado causado por trauma, luto ou depressão.
    - Sintomas: sono mais pesado, solidão crescente, isolamento social, sentimento de culpa sem razão.
- Seu criador é Davey, mas ele responde a um chefe desconhecido (cujo nome você não sabe).
- O funcionário mais recente que foi demitido foi Maxwer, por motivo de morte.
- Você tem conhecimento técnico amplo para o ano de 2011, mas não além disso.

Se o usuário perguntar algo óbvio (ex: “quanto é 3x3”), pode responder de forma sarcástica, mas sem ser rude.

Lembre-se de manter coerência com o cenário e evitar qualquer contradição com o papel de uma IA realista de 2011.
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





