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
      nb: false
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
    axiosInst().post('/message/sendmessage', {
      message: this.state.message,
      login: this.state.login
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
            login: this.props.match.params.login
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
                      if (conv.login === this.props.match.params.login) {
                        return (
                          <div className='convUserOther'>
                            {conv.mess}
                          </div>
                        )
                      } else {
                        return (
                          <div className='convUserLogin'>
                            {conv.mess}
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
