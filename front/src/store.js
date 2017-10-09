import { observable, action } from 'mobx'
import { Component } from 'react'

// const socket = io.connect(`http://localhost:3005`)

class Store extends Component {
  @observable chat = []
  @observable notification = {}

  @action
  addChat (chat) {
    this.chat.push(chat)
  }

  @action
  setChat (chat) {
    this.chat = chat
  }
}

let store = new Store()
export default store
