import React, { Component } from 'react'
import './StyleSheet.css'
import axiosInst from './utils/axios.js'

class Inscription extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      login: '',
      passwd: '',
      rePasswd: '',
      birthday: '',
      bio: '',
      isSexe: 'Homme',
      toSexe: 'All',
      signUpOk: false,
      message: '',
      connexion: false
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
      this.state.rePasswd === '' || this.state.birthday === '' ||
      this.state.email === '' || this.state.passwd !== this.state.rePasswd) {
        return false
      } else {
        axiosInst().post('/user/signup',
          {
            login: this.state.login,
            passwd: this.state.passwd,
            birthday: this.state.birthday,
            bio: this.state.bio,
            isSexe: this.state.isSexe,
            toSexe: this.state.toSexe
          }).then((res) => {
            if (res.data === true) {
              this.setState({signUpOk: true})
            } else {
              this.props.notification.addNotification({
                message: res.data.message,
                level: 'error',
                position: 'top right'
              })
            }
          }).catch((err) => {
            console.log(err)
          })
      }
    }
  }
  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      this.setState({connexion: true})
    }
  }
  render () {
    return (
      <div className='body'>
        { !this.state.connexion ? (
          <div className='Signup'>
            <input type='login' name='login' onChange={this.handleChange} placeholder='Login' onKeyPress={this.handleKeyPress} /><br />
            <input type='password' name='passwd' onChange={this.handleChange} placeholder='Password' onKeyPress={this.handleKeyPress} /><br />
            <input type='password' name='rePasswd' onChange={this.handleChange} placeholder='Re-Password' onKeyPress={this.handleKeyPress} /><br />
            <input type='email' name='email' onChange={this.handleChange} placeholder='email' onKeyPress={this.handleKeyPress} /><br />
            <input type='text' name='birthday' onChange={this.handleChange} placeholder='YYYY-MM-DD' onKeyPress={this.handleKeyPress} />
            <p>Sexe:</p>
            <select className='select_signup' name='isSexe' onChange={this.handleChange}>
              <option value='Homme' defaultValue>Homme</option>
              <option value='Femme'>Femme</option>
            </select><br /><br />
            <p> Interessé par:</p>
            <select className='select_signup' name='toSexe' onChange={this.handleChange}>
              <option value='All' defaultValue>All</option>
              <option value='Homme'>Homme</option>
              <option value='Femme'>Femme</option>
            </select><br /><br />
            <textarea type='text' name='bio' onChange={this.handleChange} placeholder='bio ici' /><br />
            <button id='button_signup' value='inscription' onClick={this.handleKeyPress}>Inscription</button>
          </div>
        ) : (
          <div className='Signup'> vous êtes déjà inscrit vue que vous êtes connecter </div>
        )
        }
      </div>
    )
  }
}

export default Inscription
