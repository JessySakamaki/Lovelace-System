const express = require('express');
const cors = require('cors');
const CapituloDAO = require('./capituloDAO');

const app = express();
const port = 3000;

//JSON
app.use(cors());
app.use(express.json());

//Get todos
app.get('/capitulos', async (req, res) => {
    const capitulos = await CapituloDAO.getCapitulos();
    res.json(capitulos);
});

//Get by id
app.get('/capitulos/:id', async (req, res) => {
    const capitulos = await CapituloDAO.getCapitulo(req.params.id);
    res.json(capitulos);
});

// Insere um novo cap
app.post('/capitulos', async (req, res) => {
    const {titulo, qtd_paginas} = req.body;
    const capitulos = await CapituloDAO.insertCapitulo(titulo, qtd_paginas);
    res.json(capitulos);
});

// PUT Atualiza Cap
app.put('/capitulos/:id', async (req, res) => {
    const {titulo, qtd_paginas} = req.body;
    const capitulos = await CapituloDAO.updateCapitulo(req.params.id, titulo, qtd_paginas);
    res.json(capitulos);
});

// DELETE Remove Cap
app.delete('/capitulos/:id', async (req, res) => {
    await CapituloDAO.deleteCapitulo(req.params.id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
});
