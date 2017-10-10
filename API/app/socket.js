var server = require('http').Server(global.app)
var io = require('socket.io')(server)
const db = require('./db.js')

let tabUser = []
io.on('connection', (socket) => {
  console.log('socket activé')

  socket.on('UserLoginConnected', (data) => {
    console.log(`socket user connecter --- > ${data.login}`)
    let isPresent = true
    tabUser.forEach((element) => {
      if (element.login === data.login) {
        console.log('user deja present dans le tabUser')
        element.socket = socket
        isPresent = false
      }
    }, this)
    if (isPresent === true) {
      tabUser.push({
        login: data.login,
        socket: socket
      })
    // element.socket.emit('activOnline', {
    //   view: 'view'
    // })
    } else {
      console.log('user already present')
    }
    console.log(tabUser)
  })
  socket.on('userViewProfile', (data) => {
    console.log('socket recu')
    console.log(tabUser)
    tabUser.forEach((element) => {
      if (element.login === data.login) {
        element.socket.emit('activNotif', {})
      }
    }, this)
    // tabUser[1].socket.emit('activNotif', {
    //   login: data.login
    // })
  })

  socket.on('UserLoginDisconnected', (data) => {
    console.log(`socket user Disconnected --> ${data.login}`)
    tabUser.splice(data.login)
    // tabUser.forEach((element) => {
    //   if (element === data.login) {
    //     delete [element]
    //   }
    // }, this)
    console.log(tabUser)
  })

  // socket.on('UserLoginDisconnected', (data) => {
  //   // console.log(data)
  //   socket.emit('afficheLoginDisconnect', {
  //     login: data.login
  //   })
  // })
  socket.on('sendChat', (data) => {
    console.log(' je rentre dans le socket')
    console.log(data)
    console.log(tabUser)
  // Recuperer la socket de l'utilisateur qui doit recevoir le message (lui envoyer)
    tabUser.forEach((element) => {
      if (element.login === data.desti) {
        console.log('Socket Emit')
        element.socket.emit('receiveChat', {
          message: data.message,
          login: data.login
        })
      }
    }, this)
    db.get().then((db) => {
      db.collection('Conversations').update({_id: data.idConv},
        {
          $push: {
            convers: {
              login: data.login,
              message: data.message
            }
          }
        })
    })
  })
})

server.listen(3005, () => {
  console.log('listening on *:3005')
})

// setInterval(() => {
//   console.log(tabUser)
// }, 2000)
