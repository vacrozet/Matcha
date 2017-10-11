import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import Paper from 'material-ui/Paper'
import './StyleSheet.css'

class Oubli extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      mail: '',
      send: false
    })
    this.handleChange = this.handleChange.bind(this)
  }
  handleSend () {
    if (this.state.mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this.setState({send: true})
      axiosInst().post('/reset/passwd', {
        mail: this.state.mail
      }).then((res) => {
        if (res.data.success === true) {
          this.props.history.push('/')
          this.props.notification.addNotification({
            level: 'success',
            message: 'Mail envoyer'
          })
        } else {
          this.props.notification.addNotification({
            level: 'error',
            message: 'Mail not foun'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  handleChange (event) {
    this.setState({mail: event.target.value})
  }
  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  }
  render () {
    return (
      <div>
        <div className='pageOubli'>
          <div className='cadreOubli'>
            <Paper zDepth={2}>

              <TextField hintText='Email' value={this.state.mail} underlineShow={false} onChange={this.handleChange} />
              <Divider />
              {!this.state.send ? (
                <RaisedButton label='Envoyer' fullWidth onClick={() => { this.handleSend() }} />
              ) : (
                <RaisedButton label='Envoyer' disabled fullWidth onClick={() => { this.handleSend() }} />
              )
              }
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default Oubli
