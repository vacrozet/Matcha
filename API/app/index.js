const express = require('express')
const hostname = 'localhost'
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const db = require('./db.js')
const port = 3001

db.connect()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true, limit: '512kb'}))
app.use(bodyParser.json({limit: '5mb'}))
// app.use(bodyParser.json({ type: 'application/json-patch+json' }))

app.use('/', require('./route/index.js'))

app.use((req, res) => {
  res.status(404)
  res.json({
    message: 'URL not Found API'
  })
})

// Démarrer le serveur
app.listen(port, hostname, () => {
  console.log('Mon serveur fonctionne sur http://' + hostname + ':' + port)
})

// End connecton with database
process.on('SIGINT', () => {
  db.close()
  process.exit()
})
