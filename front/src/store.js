import { observable, action, useStrict } from 'mobx'
import { Component } from 'react'

useStrict(true)

class Store extends Component {
  @observable chat = []
  @observable notification = {}

  @action
  addChat (chat) {
    this.chat.push(chat)
    // this.chat = this.chat.slice(0)
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
