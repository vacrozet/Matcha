import React, { Component } from 'react'
import axiosInst from './utils/axios.js'

class modifyProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount () {
    axiosInst().get('/user/profile').then((res) => {
      this.setState({
        login: res.data.result[0].login,
        sexe: res.data.result[0].sexe,
        toSexe: res.data.result[0].to_match,
        birthday: res.data.result[0].date,
        age: res.data.result[0].age
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

export default modifyProfile
