const mysql = require('mysql');
const express = require('express')
const app = express()
const port = 3000

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb'
});

async function excluir(id) {
  const insert = `DELETE FROM fullcycle WHERE ID = ${id};`

  const data = await new Promise((resolved, reject) => {
    connection.query(insert, function (err, rows, fields) {
      if (err) {
        reject(new Error(err))
      }

      resolved()
    });
  })

  return data
}

async function insert() {
  const insert = `INSERT INTO fullcycle (value) VALUES ('${new Date().toLocaleString('pr-BR')}');`

  const data = await new Promise((resolved, reject) => {
    connection.query(insert, function (err, rows, fields) {
      if (err) {
        reject(new Error(err))
      }

      resolved()
    });
  })

  return data
}

async function findAll() {
  const findall = 'select * from fullcycle;'
  const data = await new Promise((resolved, reject) => {
    connection.query(findall, function (err, rows, fields) {
      if (err) {
        reject(new Error(err))
      }

      resolved(rows)
    });
  })

  return data
}

app.post('/registers', async (req, res) => {
  await insert();

  res.status(200).send()
})

app.delete('/registers/:id', async (req, res) => {
  await excluir(req.params?.id);

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

