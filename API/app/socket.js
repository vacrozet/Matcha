var server = require('http').Server(global.app)
var io = require('socket.io')(server)

function list user() {
  // fonction pour chercher dans la db les users.
}

io.on('connection', (socket) => {
  console.log('connexion')
  socket.on('userViewProfile', (data) => {
    console.log('socket arriver en back')
    console.log(data.login)
    socket.emit('activNotif', {
      login: data.login
    })
    console.log('socket envoyer')
  })
  socket.on('UserLoginConnected', (data) => {
    console.log(data)
    socket.emit('afficheLoginConnect', {
      login: data.login
    })
  })
  socket.on('UserLoginDisconnected', (data) => {
    // console.log(data)
    socket.emit('afficheLoginDisconnect', {
      login: data.login
    })
  })
  socket.on('sendChat', (data) => {
  // Recuperer la socket de l'utilisateur qui doit recevoir le message (lui envoyer)
  //  Ajouter le chat dans la db
  })
})

server.listen(3005, () => {
  console.log('listening on *:3005')
})
