import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import './StyleSheet.css'
import './Navbar.css'

class Volet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      volet: false,
      connexion: false,
      login: '',
      passwd: ''
    }
    this.myFunction = this.myFunction.bind(this)
    this.signIn = this.signIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  myFunction (event) {
    document.querySelector('.container').classList.toggle('change')
    document.querySelector('.volet').classList.toggle('voley')
  }

  signIn (event) {
    document.querySelector('.connexion').classList.toggle('volet_sign')
    document.querySelector('.Signin_navbar').classList.toggle('Signin_navbar_click')
    document.querySelector('.input_connect').classList.toggle('input_connect_click')
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.value === 'connexion') {
      if (this.state.login === '' || this.state.passwd === '') {
        return false
      } else {
        axiosInst().post('/user/signin',
          {
            login: this.state.login,
            passwd: this.state.passwd
          }).then((res) => {
            console.log(res.data)
            if (res.data.success === true) {
              global.localStorage.setItem('token', res.data.token)
              this.setState({connexion: true})
            } else {
              console.log('user not found Front')
            }
          }).catch((err) => {
            console.log(err)
          })
        // console.log('je passe ici')
        // console.log(this.state.login)
        // console.log(this.state.passwd)
      }
    }
  }
  componentWillMount () {
    global.localStorage.getItem('token')
    if (global.localStorage.getItem('token')) {
      this.setState({connection: true})
      console.log('je passe ici')
    }
  }

  render () {
    return (
      <div className='volet'>
        <div className='container' onClick={this.myFunction} >
          <div className='bar1' />
          <div className='bar2' />
          <div className='bar3' />
        </div>
        <div className='all_word_volet'>
          { !this.state.connexion ? (
            <div className='connexion'>
              <div className='Signin_navbar'>
                <div className='input_connect' >
                  <input className='input_connexion_volet' name='login' onChange={this.handleChange} type='login' placeholder='Login' onKeyPress={this.handleKeyPress} />
                  <input className='input_connexion_volet' name='passwd' onChange={this.handleChange} type='passwd' placeholder='Password' onKeyPress={this.handleKeyPress} />
                  <button className='button_connexion_volet' value='Connexion' onKeyPress={this.handleKeyPress} >Connexion</button>
                </div>
                <div className='Signin_navbar' onClick={this.signIn}>SignIn</div>
              </div>
              <div className='Signup_navbar'>SignUp</div>
            </div>
          ) : (
            <div className='connexion'>
              <div>toto</div>
            </div>
          )
          }
          <div className='word_volet'> Accueil </div>
          <div className='word_volet'> Profil </div>
          <div className='word_volet'> Notification </div>
          <div className='word_volet'> Deconnexion </div>
        </div>
      </div>
    )
  }
}

export default Volet
