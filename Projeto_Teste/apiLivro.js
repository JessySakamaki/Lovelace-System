const express = require('express');
const cors = require('cors');
const LivroDAO = require('./livroDAO');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/livros', async (req, res) => {
  const livros = await LivroDAO.getLivros();
  res.json(livros);
});

app.get('/livros/:id', async (req, res) => {
  const livros = await LivroDAO.getLivro(req.params.id);
  res.json(livros);
});

app.post('/livros', async (req, res) => {
  const { autor, idioma, titulo, sinopse, capitulos_disponiveis } = req.body;
  const livros = await LivroDAO.insertLivro(
    autor,
    idioma,
    titulo,
    sinopse,
    capitulos_disponiveis
  );
  res.json(livros);
});

app.put('/livros/:id', async (req, res) => {
  const { autor, idioma, titulo, sinopse, capitulos_disponiveis } = req.body;
  const livros = await LivroDAO.updateLivro(
    req.params.id,
    titulo,
    autor,
    idioma,
    sinopse,
    capitulos_disponiveis
  );
  res.json(livros);
});

app.delete('/livros/:id', async (req, res) => {
  await LivroDAO.deleteLivro(req.params.id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
