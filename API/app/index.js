const express = require('express')
const hostname = 'localhost'
const bodyParser = require('body-parser')
const app = express()
var http = require('http').Server(express)
const cors = require('cors')
const db = require('./db.js')
var io = require('socket.io')(http)
const port = 3001

db.connect()
// require('./ws.js')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true, limit: '512kb'}))
app.use(bodyParser.json({limit: '5mb'}))

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
io.on('connection', (socket) => {
  console.log('a user connected')
})
http.listen(3000, () => {
  console.log('listening on *:3000')
})
// var io = require('socket.io').listen(app.listen())
// End connecton with database
process.on('SIGINT', () => {
  db.close()
  process.exit()
})
