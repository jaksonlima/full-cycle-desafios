const express = require('express');
const { insert, exclude, findAll } = require('./db');
const app = express()
const port = 3000


app.post('/registers', async (req, res) => {
  await insert();

  res.status(200).send()
})

app.delete('/registers/:id', async (req, res) => {
  await exclude(req.params?.id);

  res.status(200).send()
})

app.get('/findall', async (req, res) => {
  const data = await findAll()

  res.json(data)
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))

