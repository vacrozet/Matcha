import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import './StyleSheet.css'

class Messenger extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      axiosInst().get('user/getchat').then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div>
        <div classeName='bodyMessenger'>
        coucou
        </div>
      </div>
    )
  }
}

export default Messenger
