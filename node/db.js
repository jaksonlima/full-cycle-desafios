const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb'
});

function startConnection() {
  const createTable = `
  CREATE TABLE IF NOT EXISTS fullcycle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(255) NOT NULL
  )
  `
  connection.query(createTable)
}

startConnection()

async function exclude(id) {
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
  const findall = 'SELECT * FROM fullcycle;'

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

module.exports = {
  findAll,
  insert,
  exclude
}