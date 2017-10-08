import mobx, { observable, action } from 'mobx-react'
import React, { Component } from 'react'

mobx.use('strict')


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
