var server = require('http').Server(global.app)
var io = require('socket.io')(server)
const db = require('./db.js')

let tabUser = []
io.on('connection', (socket) => {
  console.log('socket activé')

  socket.on('UserLoginConnected', (data) => {
    let isPresent = true
    tabUser.forEach((element) => {
      if (element.login === data.login) {
        element.socket = socket
        isPresent = false
      }
    }, this)
    if (isPresent === true) {
      tabUser.push({
        login: data.login,
        socket: socket
      })
    socket.broadcast.emit('UserConnected', {
      login: data.login
    })
    } else {
      console.log('user already present')
    }
  })
  socket.on('userViewProfile', (data) => {
    tabUser.forEach((element) => {
      if (element.login === data.login) {
        element.socket.emit('activNotif', {})
      }
    }, this)
  })

  socket.on('UserLoginDisconnected', (data) => {
    console.log(`socket user Disconnected --> ${data.login}`)
    socket.broadcast.emit('UserDisconnected', {
      login: data.login
    })
    tabUser.splice(data.login)
  })
  socket.on('sendChat', (data) => {
    tabUser.forEach((element) => {
      if (element.login === data.desti) {
        element.socket.emit('receiveChat', {
          message: data.message,
          login: data.login
        })
        element.socket.emit('activNotif', {})
      }
    }, this)
    db.get().then((db) => {
      var noti = []
      noti.push(Date.now())
      noti.push(`${data.login} vous à envoyé un message`)
      db.collection('Conversations').update({_id: data.idConv},
        {
          $push: {
            convers: {
              login: data.login,
              message: data.message,
              time: Math.round(Date.now() / 1000)
            }
          }
        })
      console.log(noti)
      db.collection('Users').update({login: data.desti},
        {
          $push: {
            notification: noti
          },
          set: {
            newNotification: true
          }
        })
    })
  })
})

server.listen(3005, () => {
  console.log('listening on *:3005')
})
