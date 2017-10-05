const express = require('express')
const hostname = 'localhost'
const bodyParser = require('body-parser')
const app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const cors = require('cors')
const db = require('./db.js')
const port = 3001

db.connect()

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
  socket.on('UserLoginConnected', (data) => {
    console.log(data)
    // socket.emit('afficheLoginConnect', {
    //   login: data.login
    // })
  })
  socket.on('UserLoginDisconnected', (data) => {
    console.log(data)
    // socket.emit('afficheLoginDisconnect', {
    //   login: data.login
    // })
  })
})
server.listen(3005, () => {
  console.log('listening on *:3005')
})

process.on('SIGINT', () => {
  db.close()
  process.exit()
})
