import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import './StyleSheet.css'

class Inscription extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      nom: '',
      prenom: '',
      login: '',
      passwd: '',
      rePasswd: '',
      date: '',
      bio: '',
      tag: '',
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
      axiosInst().post('/user/signup',
        {
          login: this.state.login,
          nom: this.state.nom,
          prenom: this.state.prenom,
          passwd: this.state.passwd,
          rePasswd: this.state.rePasswd,
          date: this.state.date,
          bio: this.state.bio,
          isSexe: this.state.isSexe,
          toSexe: this.state.toSexe,
          tag: this.state.tag,
          email: this.state.email
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
            <input type='prenom' name='prenom' onChange={this.handleChange} placeholder='Prenom' onKeyPress={this.handleKeyPress} /><br />
            <input type='name' name='nom' onChange={this.handleChange} placeholder='Nom' onKeyPress={this.handleKeyPress} /><br />
            <input type='password' name='passwd' onChange={this.handleChange} placeholder='Password' onKeyPress={this.handleKeyPress} /><br />
            <input type='password' name='rePasswd' onChange={this.handleChange} placeholder='Re-Password' onKeyPress={this.handleKeyPress} /><br />
            <input type='mail' name='email' onChange={this.handleChange} placeholder='email' onKeyPress={this.handleKeyPress} /><br />
            <input type='text' name='date' onChange={this.handleChange} placeholder='YYYY-MM-DD' onKeyPress={this.handleKeyPress} />
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
            <input type='text' name='tag' onChange={this.handleChange} placeholder='#' onKeyPress={this.handleKeyPress} /><br />
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
