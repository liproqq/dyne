const express = require('express')
const app = express()
const mysql = require('mysql')
const port = 3030

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dynedb'
})

connection.connect()

connection.query('select * from game', function (err, rows, fields) {
  if (err) throw err

//   console.log(rows)
//   console.log(fields)
})

connection.end()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})