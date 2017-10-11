import { observable, action, useStrict } from 'mobx'

useStrict(true)

class Store {
  @observable chat = []
  @observable UserConnected = []
  @observable noti = []

  @action
  addChat (chat) {
    if (this.chat) {
      this.chat.push(chat)
    } else {
      this.chat = [chat]
    }
  }

  @action
  addUser (user) {
    this.UserConnected.push(user)
  }
  @action
  dellUser (user) {
    this.UserConnected = this.UserConnected.filter((element) => (element !== user) ? element : null)
  }
  @action
  addNoti (noti) {
    if (this.noti) {
      this.noti.push(noti)
    } else {
      this.noti = [noti]
    }
  }
  @action
  setNoti (noti) {
    this.noti = noti
  }

  @action
  setChat (chat) {
    this.chat = chat
    }
  }
let store = new Store()
export default store
export { Store }
