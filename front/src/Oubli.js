import React, { Component } from 'react'
import './StyleSheet.css'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'

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
    // if (this.state.mail) {

    // }
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
