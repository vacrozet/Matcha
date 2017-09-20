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
      sexe: '',
      toSexe: '',
      birthday: '',
      age: '',
      tag: '',
      token: '',
      tagProfile: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.affichTag = this.affichTag.bind(this)
    this.searchTag = this.searchTag.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  affichTag (result) {
    console.log(result)
  }
  searchTag () {
    /// Chercher tous les tags  et utiliser la fonction affichTag ///
  }
  handleKeyPress (event) {
    if (event.key === 'Enter' || event.target.value === 'ajouter') {
      if (this.state.tag !== '') {
        axiosInst().post('./user/addTag', {
          tag: this.state.tag
        }).then((res) => {
          this.setState({tag: ''})
          this.searchTag()
          console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
  componentWillMount () {
    axiosInst().get('/user/profile').then((res) => {
      this.setState({
        login: res.data.result[0].login,
        sexe: res.data.result[0].sexe,
        toSexe: res.data.result[0].to_match,
        birthday: res.data.result[0].date,
        age: res.data.result[0].age,
        tagProfile: res.data.result[0].tag
        /// IL FAUT RECEVOIR UN TABLEAU ///
        /// REPRISE ICI ///
      })
      if (this.state.tagProfile.length === 0) {
        console.log('aucun element dans le tableau')
      } else {
        this.affichTag(this.state.tagProfile)
        /// RENVOI a affichTag dans l'argument result ///
      }
    }).catch((err) => {
      console.log(err)
    })
    this.setState({
      token: global.localStorage.getItem('token')
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
            <Button className='primary' type='primary'><Link className='bmp' to='/'>Modifier</Link></Button>
          </div>
          <div className='all_htag'>
            <div className='affichage_tag'>
              <Pill label='TEST' type='primary' onClear={this.handleClear} />
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
