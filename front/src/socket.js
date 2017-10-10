import store from './store.js'
import io from 'socket.io-client'
const socket = io(`http://localhost:3005`)

export default socket

socket.on('receiveChat', (data) => {
  console.log('je recois le socket receiveChat')
  console.log(data)
  let obj = {
    login: data.login,
    message: data.message
  }
  store.addChat(obj)
})
