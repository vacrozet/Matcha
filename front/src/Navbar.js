import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
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
      passwd: '',
      age: '',
      sexe: '',
      token: '',
      img: [],
      longitude: '',
      latitude: ''
    }
    this.myFunction = this.myFunction.bind(this)
    this.signIn = this.signIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
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
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((geolocPosition) => {
            axios.post('http://localhost:3001/user/signin', {
              login: this.state.login,
              passwd: this.state.passwd,
              longitude: geolocPosition.coords.longitude,
              latitude: geolocPosition.coords.latitude
            }).then((res) => {
              if (res.data.success === true) {
                global.localStorage.setItem('token', res.data.token)
                this.setState({
                  connexion: true,
                  login: res.data.login,
                  age: res.data.age,
                  sexe: res.data.sexe,
                  img: res.data.img
                })
                this.props.notification.addNotification({
                  message: 'Connected',
                  level: 'success'
                })
                // console.log(res.data)
                this.props.history.push('/accueil')
              } else {
                this.props.notification.addNotification({
                  message: res.data.error,
                  level: 'error'
                })
              }
            }).catch((err) => {
              this.props.notification.addNotification({
                message: err,
                level: 'error'
              })
            })
          })
        } else {
          axios.post('http://localhost:3001/user/signin', {
            login: this.state.login,
            passwd: this.state.passwd,
            longitude: 0,
            latitude: 0
          }).then((res) => {
            if (res.data.success === true) {
              global.localStorage.setItem('token', res.data.token)
              this.setState({
                connexion: true,
                login: res.data.login,
                age: res.data.age,
                sexe: res.data.sexe,
                img: res.data.img
              })
              this.props.notification.addNotification({
                message: 'Connected',
                level: 'success'
              })
              // console.log(res.data)
              this.props.history.push('/accueil')
            } else {
              this.props.notification.addNotification({
                message: res.data.error,
                level: 'error'
              })
            }
          }).catch((err) => {
            this.props.notification.addNotification({
              message: err,
              level: 'error'
            })
          })
        }
      }
    }
  }
  logoutUser () {
    global.localStorage.removeItem('token')
    this.props.history.push('/')
    this.props.notification.addNotification({
      message: 'Disconnected',
      level: 'success'
    })
    this.setState({
      connexion: false,
      login: '',
      passwd: false
    })
  }
  componentWillMount () {
    global.localStorage.getItem('token')
    if (global.localStorage.getItem('token')) {
      axiosInst().get('/user/profile').then((res) => {
        this.setState({
          login: res.data.result[0].login,
          age: res.data.result[0].age,
          sexe: res.data.result[0].sexe,
          img: res.data.result[0].img
        })
      }).catch((err) => {
        console.log(err)
      })
      this.setState({connexion: true})
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
                  <button className='button_connexion_volet' value='connexion' onKeyPress={this.handleKeyPress} >Connexion</button>
                </div>
                <div className='Signin_navbar' onClick={this.signIn}>SignIn</div>
              </div>
              <Link className='Signup_navbar' to='/inscription'>SignUp</Link>
            </div>
          ) : (
            <div className='connexion volet_sign'>
              <div>
                <div><img id='pictureProfile' className='photo' src={this.state.img[0]} alt='Picture_profile' /></div>
                <div>{this.state.login}</div>
                <div>{this.state.age} ans</div>
                <div>{this.state.sexe}</div>
              </div>
            </div>
          )
          }
          { !this.state.connexion ? (
            <div>
              <Link className='word_volet' to='/'>Accueil</Link>
              <Link className='word_volet' to='/'>Profile</Link>
              <Link className='word_volet' to='/'>Notification</Link>
              <Link className='word_volet' to='/' onClick={this.logoutUser}>Deconnexion</Link>
            </div>
          ) : (
            <div>
              <Link className='word_volet' to='/accueil'>Accueil</Link>
              <Link className='word_volet' to='/profile'>Profile</Link>
              <Link className='word_volet' to='/notification'>Notification</Link>
              <Link className='word_volet' to='/' onClick={this.logoutUser}>Deconnexion</Link>
            </div>
          )
          }
        </div>
      </div>
    )
  }
}

export default Volet
