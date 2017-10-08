import RaisedButton from 'material-ui/RaisedButton'
import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import Paper from 'material-ui/Paper'

class Message extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: '',
      discution: '',
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
  sendMessage (message) {
    console.log(message)
    console.log(this.state.idConv)
    axiosInst().post('/message/sendmessage', {
      message: this.state.message,
      login: this.state.login,
      idConv: this.state.idConv
    }).then((res) => {
      this.setState({
        discution: res.data.result,
        nb: res.data.present
      })
    })
  }
  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      axiosInst().get(`/user/getmessage/${this.props.match.params.login}`).then((res) => {
        console.log(res)
        if (res.data.success === true) {
          this.setState({
            discution: res.data.result,
            nb: res.data.present,
            login: this.props.match.params.login,
            idConv: res.data.idConv
          })
          setTimeout(() => {
            console.log(this.state.discution)
          }, 2000)
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
            <Paper zDepth={3}>
              <div className='UserDescription'>
                {this.props.match.params.login}
              </div>
            </Paper>
            <Paper zDepth={3}>
              <div className='UserMessage'>
                <div className='cadreMessage'>
                  <div className='discution'>
                    {this.state.nb ? (this.state.discution.map((conv) => {
                      console.log('je passe la')
                      if (conv.login === this.props.match.params.login) {
                        return (
                          <Paper zDepth={3} key={Math.random()}>
                            <div className='convUserOther' key={Math.random()}>
                              <div className='loginOtherUser' key={Math.random()}>
                                {conv.login} :
                              </div>
                              <div className='convOtherUser' key={Math.random()}>
                                {conv.message}
                              </div>
                            </div>
                          </Paper>
                        )
                      } else {
                        return (
                          <div className='convUserLogin' key={Math.random()}>
                              <div className='loginUser' key={Math.random()}>
                                {conv.login} :
                              </div>
                              <div className='convUser' key={Math.random()}>
                                {conv.message}
                              </div>
                          </div>
                        )
                      }
                    })
                    ) : (
                      <Paper zDepth={3}>
                        <div className='notMessage'>aucun Message a afficher</div>
                      </Paper>
                  )
                  }
                  </div>
                </div>
                <div className='cadreSendMessage'>
                  <input className='inputMessage' name='message' value={this.state.message} onChange={this.handleChange} />
                  <RaisedButton label='Envoyer' primary onClick={() => { this.sendMessage(this.state.message) }} />
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default Message
