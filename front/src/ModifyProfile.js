import RaisedButton from 'material-ui/RaisedButton'
import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import './card.css'

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
      toSexe: '',
      location: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleKeyPress (event) {
    axiosInst().patch('/user/modifyprofile',
      {
        login: this.state.login,
        prenom: this.state.prenom,
        nom: this.state.nom,
        mail: this.state.mail,
        passwd: this.state.passwd,
        rePasswd: this.state.rePasswd,
        birthday: this.state.birthday,
        bio: this.state.bio,
        toSexe: this.state.toSexe,
        location: this.state.location
      }).then((res) => {
        if (res.data.success === 'OK') {
          this.props.notification.addNotification({
            level: 'success',
            message: res.data.message
          })
          this.props.history.push('/profile')
        } else {
          this.props.notification.addNotification({
            message: 'Profile Not Update',
            level: 'error'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  componentWillMount () {
    axiosInst().get('/user/profile').then((res) => {
      this.setState({
        login: res.data.result[0].login,
        location: res.data.result[0].location
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
            <input type='text' value={this.state.prenom} name='prenom' onChange={this.handleChange} />
          </div>
          <div className='cmp'>
            <p>Nom</p>
            <input type='text' value={this.state.nom} name='nom' onChange={this.handleChange} />
          </div>
          <div className='cmp'>
            <p>Email</p>
            <input type='mail' value={this.state.mail} name='mail' onChange={this.handleChange} />
          </div>
          <div className='cmp'>
            <p>Passwd</p>
            <input type='passwd' value={this.state.passwd} name='passwd' onChange={this.handleChange} />
          </div>
          <div className='cmp'>
            <p>RePasswd</p>
            <input type='passwd' value={this.state.rePasswd} name='rePasswd' onChange={this.handleChange} />
          </div>
          <div className='cmp'>
            <p>Birthday</p>
            <input type='text' value={this.state.birthday} name='birthday' onChange={this.handleChange} placeholder='YYYY-MM-JJ' />
          </div>
          <div className='cmp'>
            <p>Adresse</p>
            <input type='text' value={this.state.location} name='location' onChange={this.handleChange} />
          </div>
          <div className='cmp'>
            <p>Bio</p>
            <input type='text' value={this.state.bio} name='bio' onChange={this.handleChange} />
          </div>
          <div className='cmp'>
            <p>Recherche:</p>
            <select className='select_signup' name='toSexe' onChange={this.handleChange}>
              <option value='' defaultValue>---</option>
              <option value='All'>All</option>
              <option value='Homme'>Homme</option>
              <option value='Femme'>Femme</option>
            </select><br />
          </div><br />
          <RaisedButton label='confirmer' primary={true} onClick={this.handleKeyPress} />
        </div>
      </div>
    )
  }
}

export default modifyProfile
