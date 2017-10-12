var server = require('http').Server(global.app)
var io = require('socket.io')(server)
const db = require('./db.js')

function addNotification (data) {
  let notification = []
  notification.push(data.time)
  notification.push(`${data.loginUser} à consulté votre profile`)
  db.get().then((db) => {
    db.collection('Users').update({login: data.login},
    {
      $push: {notification: notification},
      $set: {newNotification: true}
    })
  })
}
function dislikeProfile (data) {
  let notification = []
  notification.push(data.time)
  notification.push(`${data.loginUser} à Dislike votre Profile`)
  db.get().then((db) => {
    db.collection('Users').update({login: data.login},
    {
      $push: {notification: notification},
      $set: {newNotification: true}
    })
  })
}
let tabUser = []
io.on('connection', (socket) => {
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
    }
  })
  socket.on('userViewProfile', (data) => {
    tabUser.forEach((element) => {
      if (element.login === data.login) {
        element.socket.emit('activNotif', {
          login: data.loginUser
        })
      }
    }, this)
    addNotification (data)
  })
  socket.on('likeProfile', (data) => {
    tabUser.forEach((element) => {
      if (element.login === data.login) {
        element.socket.emit('activEvenement',{
          login: data.login
        })
      }
    }, this)
  })
  socket.on('DislikeProfile', (data) => {
    tabUser.forEach((element) => {
      if (element.login === data.login) {
        element.socket.emit('activEvenement',{
          login: data.login
        })
      }
    }, this)
    dislikeProfile(data)
  })
  socket.on('UserLoginDisconnected', (data) => {
    socket.broadcast.emit('UserDisconnected', {
      login: data.login
    })
    tabUser = tabUser.filter((element) => (element.login !== data.login) ? element : null)
  })
  socket.on('sendChat', (data) => {
    tabUser.forEach((element) => {
      if (element.login === data.desti) {
        element.socket.emit('receiveChat', {
          message: data.message,
          login: data.login
        })
        element.socket.emit('activEvenement', {
          login: data.login
        })
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
      db.collection('Users').update({login: data.desti},
        {
          $push: {
            notification: noti
          },
          $set: {
            newNotification: true
          }
        })
    })
  })
})

server.listen(3005, () => {
  console.log('listening on *:3005')
})
