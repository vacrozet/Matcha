import React, { Component } from 'react'
import { Button } from 'elemental'
import './card.css'
import axiosInst from './utils/axios.js'

class modifyProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: '',
      prenom: '',
      nom: '',
      mail: '',
      passwd: '',
      rePasswd: '',
      birthday: '',
      bio: '',
      mdpConfirmation: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.value === 'inscription') {
      if (this.state.login === '' || this.state.passwd === '' ||
      this.state.rePasswd === '' || this.state.date === '' ||
      this.state.email === '' || this.state.passwd !== this.state.rePasswd) {
        return false
      } else {
        axiosInst().post('/user/signup',
          {
            login: this.state.login,
            passwd: this.state.passwd,
            date: this.state.date,
            bio: this.state.bio,
            isSexe: this.state.isSexe,
            toSexe: this.state.toSexe
          }).then((res) => {
            if (res.data.success === true) {
              this.props.notification.addNotification({
                message: res.data.message,
                level: 'success',
                position: 'tr'
              })
              this.props.history.push('/')
            } else {
              console.log(res.data)
              this.props.notification.addNotification({
                message: res.data.message,
                level: 'error',
                position: 'tr'
              })
            }
          }).catch((err) => {
            console.log(err)
          })
      }
    }
  }
  componentWillMount () {
    axiosInst().get('/user/profile').then((res) => {
      this.setState({
        login: res.data.result[0].login
      })
    }).catch((err) => {
      console.log(err)
    })
  }
  render () {
    return (
      <div className='page_profile'>
        <div className='body_profile_modify'>
          <div className='cmp'>login: {this.state.login}</div>
          <div className='cmp'>
            <p>Prenom</p>
            <input value={this.state.prenom} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div className='cmp'>
            <p>Nom</p>
            <input value={this.state.nom} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div className='cmp'>
            <p>Email</p>
            <input value={this.state.mail} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div className='cmp'>
            <p>Passwd</p>
            <input value={this.state.passwd} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div className='cmp'>
            <p>RePasswd</p>
            <input value={this.state.rePasswd} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <div className='cmp'>
            <p>Birthday</p>
            <input value={this.state.birthday} onChange={this.handleChange} placeholder='YYYY-MM-JJ' onKeyPress={this.handleKeyPress} />
          </div>
          <div className='cmp'>
            <p>Bio</p>
            <input value={this.state.bio} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
          <Button className='primary' type='primary' value='confirmer' onClick={this.handleKeyPress}>Confirmer</Button>
        </div>
      </div>
    )
  }
}

export default modifyProfile
