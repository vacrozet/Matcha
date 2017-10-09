var server = require('http').Server(global.app)
var io = require('socket.io')(server)

let tabUser = []
io.on('connection', (socket) => {
  socket.on('UserLoginConnected', (data) => {
    console.log('socket user connecter --- >')
    console.log(data.login)
    tabUser.push(data.login)
  })

  socket.on('userViewProfile', (data) => {
    console.log('socket arriver en back')
    console.log(data.login)
    socket.emit('activNotif', {
      login: data.login
    })
    console.log('socket envoyer')
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
