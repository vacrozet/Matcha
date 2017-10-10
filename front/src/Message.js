import RaisedButton from 'material-ui/RaisedButton'
import React, { Component } from 'react'
import store from './store.js'
import axiosInst from './utils/axios.js'
import socket from './socket.js'

class Message extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: '',
      loginSend: '',
      message: '',
      nb: false,
      idConv: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }
  handleChange (event) {
    this.setState({
      message: event.target.value
    })
  }
  sendMessage (message, evt) {
    if ((evt.key === 'Enter' || evt === 'submit') && message.trim() !== '') {
      let obj = {
        login: this.state.loginSend,
        message: this.state.message,
        desti: this.state.login,
        idConv: this.state.idConv
      }
      this.setState({message: ''})
      socket.emit('sendChat', obj)
      store.addChat(obj)
    }
  }
  componentWillMount () {
    if (global.localStorage.getItem('token') && this.props.match.params.login !== '') {
      axiosInst().get(`/user/getmessage/${this.props.match.params.login}`).then((res) => {
        if (res.data.success === true) {
          store.setChat(res.data.result)
          this.setState({
            nb: res.data.present,
            login: this.props.match.params.login,
            idConv: res.data.idConv,
            loginSend: res.data.loginSend
          })
        }
      })
    } else {
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div>
        <div className='bodyMessage'>
          <div className='conversation'>
            <div className='UserDescription'>
              <div>{this.props.match.params.login}</div>
            </div>
            <div className='cadreMessage'>
              <div className='discution'>
                {this.state.nb ? (store.chat.map((conv) => {
                  if (conv.login === this.props.match.params.login) {
                    return (
                      <div className='convUserOther' key={Math.random()}>
                        {conv.message}
                      </div>
                    )
                  } else {
                    return (
                      <div className='convUserLogin' key={Math.random()}>
                        {conv.message}
                      </div>
                    )
                  }
                })
              ) : (
                <div className='notMessage'>aucun Message a afficher</div>
              )
              }
              </div>
            </div>
            <div className='cadreSendMessage'>
              <div className='inputMessage'>
                <input className='inputMessage1' name='message' value={this.state.message} onChange={this.handleChange} onKeyPress={(evt) => { this.sendMessage(this.state.message, evt) }} />
              </div>
              <div className='buttonSend'>
                <RaisedButton label='Envoyer' name='submit' primary onClick={(evt) => { this.sendMessage(this.state.message, 'submit') }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Message
