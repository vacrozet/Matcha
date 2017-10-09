import store from './store.js'
import io from 'socket.io-client'
const sockets = io(`http://localhost:3005`)

let ws

sockets.on('connection', (socket) => {
  ws = socket

  // socket.on('activNotif', (data) => {
  //   console.log('socket recu')
  //   console.log(data)
  //   if (data.login === user.login) {
  //     document.getElementById('Notification').setAttribute('style', 'color: red')
  //   }
  // })
  // socket.on('receiveChat', (data) => {
  //   store.addChat(data.chat)
  // })
})

export default ws
