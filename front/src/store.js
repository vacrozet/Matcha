import { observable, action, useStrict } from 'mobx'
import { Component } from 'react'

useStrict(true)

class Store extends Component {
  @observable chat = []
  @observable UserConnected = []

  @action
  addChat (chat) {
    if (chat.length === 0) {
      this.chat = chat
    } else {
      this.chat.push(chat)
    }
    // this.chat = this.chat.slice(0)
  }
  @action
  addUser (User) {
    this.UserConnected.push(User)
  }

  @action
   getChat() {
     return this.chat
   }

  @action
  setChat (chat) {
    this.chat = chat
  }
}

let store = new Store()
export default store
