import React, { Component } from 'react'
import axiosInst from './utils/axios.js'

class Profile extends Component {
  componentWillMount () {
    axiosInst().get('/user/profile').then((res) => {
      console.log(res.data.result[0])
    }).catch((err) => {
      console.log(err)
    })
  }


  render () {
    return (
      <div className='body'>
        okok
      </div>
    )
  }
}

export default Profile
