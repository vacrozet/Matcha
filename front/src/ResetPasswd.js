import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import Paper from 'material-ui/Paper'

class ResetPasswd extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hash: '',
      newpasswd: '',
      newpasswd1: ''
    }
    this.handleChangeNp = this.handleChangeNp.bind(this)
    this.handleChangeNp1 = this.handleChangeNp1.bind(this)
  }
  handleSend () {
    if (this.state.newpasswd === this.state.newpasswd1) {
      console.log(this.state.newpasswd)
      console.log(this.state.newpasswd1)
      console.log(this.state.hash)
      axiosInst().post('/reset/resetpasswd', {
        newpasswd: this.state.newpasswd,
        newpasswd1: this.state.newpasswd1,
        hash: this.state.hash
      }).then((res) => {
        console.log(res)
        if (res.data.success === true) {
          this.props.notification.addNotification({
            message: 'Passwd Modifie',
            level: 'success'
          })
          this.props.history.push('/')
        } else {
          this.props.notification.addNotification({
            message: 'Passwd not modify',
            level: 'error'
          })
        }
      }).catch((err) => { console.log(err) })
    }
  }
  handleChangeNp (event) {
    this.setState({newpasswd: event.target.value})
  }
  handleChangeNp1 (event) {
    this.setState({newpasswd1: event.target.value})
  }
  componentWillMount () {
    this.setState({
      hash: this.props.match.params.hash
    })
  }
  render () {
    return (
      <div>
        <div className='pageOubli'>
          <div className='cadreOubli'>
            <Paper zDepth={2}>
              <TextField hintText='New Passwd' value={this.state.newpasswd} type='password' underlineShow={true} onChange={this.handleChangeNp} /><br />
              <TextField hintText='New Passwd' value={this.state.newpasswd1} type='password' underlineShow={true} onChange={this.handleChangeNp1} />
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

export default ResetPasswd
