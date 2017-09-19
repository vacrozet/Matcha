import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import './card.css'




class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: '',
      sexe: '',
      toSexe: '',
      birthday: '',
      age: ''
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
      <div className='page_profile'>
        <div className='body_profile'>
          <div className='all_pictures'>
            <div className='photo'>Photo</div>
            <div className='photo'>Photo</div>
            <div className='photo'>Photo</div>
            <div className='photo'>Photo</div>
            <div className='photo'>Photo</div>
          </div>
          <div className='cadre_profile'>
            <div className='text_profile'>Profile</div>
            <div>Login: {this.state.login}</div>
            <div>Sexe: {this.state.sexe}</div>
            <div>Interessé par: {this.state.toSexe}</div>
            <div>date de naissance: {this.state.birthday}</div>
            <div>Age: {this.state.age}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
