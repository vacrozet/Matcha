import React, { Component } from 'react'
import './StyleSheet.css'
import axios from 'axios'

class Acceuil extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      login: '',
      passwd: '',
      rePasswd: '',
      birthday: '',
      bio: '',
      isSexe: 'Homme',
      toSexe: 'All',
      inst_axios: axios.create({
        baseURL: 'http://localhost:3001',
        timeout: 1000,
        headers: {
          'X-Custom-Header': 'foobar'
        }
      })
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
        // this.state.inst_axios.post('signup.js', {
        //   login: this.state.login,
        //   passwd: this.state.passwd,
        //   birthday: this.state.birthday,
        //   bio: this.state.bio,
        //   isSexe: this.state.isSexe,
        //   toSexe: this.state.toSexe
        // })
        this.state.inst_axios.post('/user/signup',
          {
            login: this.state.login,
            passwd: this.state.passwd,
            birthday: this.state.birthday,
            bio: this.state.bio,
            isSexe: this.state.isSexe,
            toSexe: this.state.toSexe
          }).then((res) => {
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })
      }
    }
  }
  myFunction (event) {
    document.querySelector('.container').classList.toggle('change')
    // this.setState({
    //   voley: this.state.voley ? 1 : 0
    // })
  }
  render () {
    return (
      <div className='all'>
        <div className='header' >
          <div className='container' onClick={this.myFunction} >
            <div className='bar1' />
            <div className='bar2' />
            <div className='bar3' />
          </div>
        </div>
        <div className='body' >
          <div className='Signup'>
            <input type='login' name='login' onChange={this.handleChange} placeholder='Login' onKeyPress={this.handleKeyPress} /><br />
            <input type='text' name='passwd' onChange={this.handleChange} placeholder='Password' onKeyPress={this.handleKeyPress} /><br />
            <input type='text' name='rePasswd' onChange={this.handleChange} placeholder='Re-Password' onKeyPress={this.handleKeyPress} /><br />
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
        </div>
      </div>
    )
  }
}

export default Acceuil
