import store from './store.js'
import io from 'socket.io-client'
const socket = io(`http://localhost:3005`)

socket.on('receiveChat', (data) => {
  let obj = {
    login: data.login,
    message: data.message
  }
  store.addChat(obj)
})
socket.on('activNotif', (data) => {
  let obj1 = []
  obj1.push(data.time)
  obj1.push(data.message)
  store.addNoti(obj1)
})

export default socket
