import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import './card.css'
import { Button, Pill } from 'elemental'
import {Link} from 'react-router-dom'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: '',
      prenom: '',
      nom: '',
      sexe: '',
      toSexe: '',
      birthday: '',
      age: '',
      tag: '',
      token: '',
      tagProfile: [],
      bio: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.searchTag = this.searchTag.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleClear (tag) {
    console.log(tag)
    console.log('je lance l instance et la requete')
    axiosInst().delete(`./user/deletetag/${tag}`).then((res) => {
      this.searchTag()
      this.props.notification.addNotification({
        message: 'Tag deleted',
        level: 'success'
      })
    }).catch((err) => {
      console.log(err)
    })
  }
  searchTag () {
    axiosInst().get('/user/profile').then((res) => {
      this.setState({
        tagProfile: res.data.result[0].tag
      })
    }).catch((err) => {
      console.log(err)
    })
  }
  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.value === 'ajouter') {
      if (this.state.tag !== '') {
        axiosInst().post('./user/addTag', {
          tag: this.state.tag
        }).then((res) => {
          this.setState({tag: ''})
          if (res.data.success === 'OK') {
            this.props.notification.addNotification({
              message: 'Tag add',
              level: 'success'
            })
          }
          this.searchTag()
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      axiosInst().get('/user/profile').then((res) => {
        this.setState({
          login: res.data.result[0].login,
          prenom: res.data.result[0].prenom,
          nom: res.data.result[0].nom,
          sexe: res.data.result[0].sexe,
          toSexe: res.data.result[0].to_match,
          age: res.data.result[0].age,
          tagProfile: res.data.result[0].tag,
          bio: res.data.result[0].bio
        })
      }).catch((err) => {
        console.log(err)
      })
      this.setState({
        token: global.localStorage.getItem('token')
      })
    }
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
            <div>Prenom: {this.state.prenom}</div>
            <div>Nom: {this.state.nom}</div>
            <div>Sexe: {this.state.sexe}</div>
            <div>Interessé par: {this.state.toSexe}</div>
            <div>Age: {this.state.age}</div>
            <div>Bio: {this.state.bio}</div>
            <div><Link className='bmp primary' to='/profile/modify'><Button type='primary'>Modifier</Button></Link></div>
          </div>
          <div className='all_htag'>
            <div className='affichage_tag'>
              { this.state.tagProfile ? this.state.tagProfile.map((tag) => {
                return (
                  <Pill label={`#${tag}`} key={Math.random()} type='primary' value={`#${tag}`} onClear={() => {
                    this.handleClear(tag)
                  }} />)
              }
              ) : (
                  null)
              }
            </div>
            <div className='binput'>
              <input type='name' name='tag' value={this.state.tag} onChange={this.handleChange} placeholder='#TAG' onKeyPress={this.handleKeyPress} />
              <Button className='primary' type='primary' value='ajouter' onClick={this.handleKeyPress}>Ajouter</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
