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
      mail: ''
    })
    this.handleChange = this.handleChange.bind(this)
  }
  handleSend () {
    console.log(this.state.mail)
    axiosInst().post('/reset/passwd', {
      mail: this.state.mail
    }).then((res) => {
      if (res.data.success === true) {
        console.log(res)
        this.props.notification.addNotification({
          level: 'success',
          message: 'Mail envoyer'
        })
        this.props.history.push('/')
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
              <RaisedButton label='Envoyer' fullWidth={true} onClick={() => {
                this.handleSend()
              }} />
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default Oubli
