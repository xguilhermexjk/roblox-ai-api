const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  const { question } = req.body;
  const answer = `Você perguntou: "${question}". Resposta gerada pela IA fake!`;
  res.json({ answer });
});

app.get('/', (req, res) => {
  res.send('API está rodando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
