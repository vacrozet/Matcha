import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import './StyleSheet.css'

class Messenger extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chat: []
    }
  }

  handleClick (login) {
    this.props.history.push(`/message/${login}`)
  }
  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      axiosInst().get('user/getchat').then((res) => {
        if (res.data.success === true) {
          this.setState({
            chat: res.data.result
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div className='bodyMessenger'>
        { this.state.chat ? (this.state.chat.map((conv) => {
          return (
            <Paper zDepth={3} key={Math.random()}>
              <div className='cadreApercu' key={Math.random()}>
                <div>{conv.login}</div>
                <div>{conv.lastMessage}</div>
                <RaisedButton label='voir' primary onClick={() => { this.handleClick(conv.login) }} />
              </div>
            </Paper>
          )
        })
        ) : (
          null
        )
        }
      </div>
    )
  }
}

export default Messenger
