const express = require('express')
const mysql = require('mysql')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/all-url', (req, res) => {
  const myConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  })

  myConnection.connect(err => {
    if (err) {
      console.log(err.message)
      return res.status(500).send('Server error...')
    }
  })

  myConnection.query('select * from pdf', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error...' })
    } else {
      res.send(results)
    }
  })

  myConnection.end()
})

app.post('/upload', (req, res) => {
  const data = req.body

  const myConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  })

  myConnection.connect(err => {
    if (err) {
      console.log(err.message)
      return res.status(500).send('Server error...')
    }
  })

  myConnection.query(
    `insert into pdf(uri) values('${data.uri}')`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Server error...' })
      } else {
        res.send(data)
      }
    }
  )

  myConnection.end()
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))
