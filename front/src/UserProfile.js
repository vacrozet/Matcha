import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import {Pill, Button} from 'elemental'

import './StyleSheet.css'

class UserProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loginUserView: this.props.match.params.login,
      login: '',
      nom: '',
      prenom: '',
      date: '',
      age: '',
      sexe: '',
      img: [],
      tag: [],
      like: '',
      block: false
    }
    this.likeProfile = this.likeProfile.bind(this)
    this.unlikeProfile = this.unlikeProfile.bind(this)
    this.blockUser = this.blockUser.bind(this)
  }
  likeProfile (event) {
    axiosInst().post('./like/addlike', {
      login: this.state.login
    }).then((res) => {
      console.log(res.data)
      if (res.data.addlike === true) {
        this.setState({
          like: true
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  unlikeProfile (event) {
    axiosInst().delete(`./like/deletelike/${this.state.login}`).then((res) => {
      if (res.data.unlike === true) {
        this.setState({
          like: false
        })
      }
      console.log(res.data.unlike)
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  blockUser (event) {
    axiosInst().post('./block/addblock', {
      login: this.state.login
    }).then((res) => {
      if (res.data.block === true) {
        this.props.history.push('/accueil')
      }
      console.log(res)
    })
  }
  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      axiosInst().get(`./user/userprofile/${this.props.match.params.login}`).then((res) => {
        console.log(res.data.result[0])
        this.setState({
          login: res.data.result[0].login,
          nom: res.data.result[0].nom,
          prenom: res.data.result[0].prenom,
          date: res.data.result[0].date,
          age: res.data.result[0].age,
          sexe: res.data.result[0].sexe,
          img: res.data.result[0].img,
          tag: res.data.result[0].tag,
          block: false
        })
        axiosInst().get(`./like/getlike/${this.state.login}`).then((res) => {
          if (res.data.like === false) {
            this.setState({
              like: false
            })
          } else {
            this.setState({
              like: true
            })
          }
          console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    } else {

    }
  }

  render () {
    return (
      <div>
        <div className='bodyUserProfile'>
          <div className='profileUserCard'>
            <div className='photoProfileUserCard'>
              <img className='photo' src={this.state.img[0]} alt='Photo_1' />
              <img className='photo' src={this.state.img[1]} alt='Photo_2' />
              <img className='photo' src={this.state.img[2]} alt='Photo_3' />
              <img className='photo' src={this.state.img[3]} alt='Photo_4' />
              <img className='photo' src={this.state.img[4]} alt='Photo_5' />
            </div>
            <div className='detailProfileUser'>
              <div className='textUserProfile'>Login: </div>
              <div>{this.state.login}</div>
              <div className='textUserProfile'>Prenom: </div>
              <div>{this.state.prenom}</div>
              <div className='textUserProfile'>Nom: </div>
              <div>{this.state.nom}</div>
              <div className='textUserProfile'>Age: </div>
              <div>{this.state.age}</div>
              <div className='textUserProfile'>Anniversaire: </div>
              <div>{this.state.date}</div>
              <div className='textUserProfile'>Bio: </div>
              <div>{this.state.bio}</div>
              <div className='textUserProfile'>Tous les #Tag:</div>
            </div>
            <div className='allTagUserProfile'>
              { this.state.tag ? this.state.tag.map((tag) => {
                return (
                  <Pill label={`#${tag}`} key={tag} type='primary' value={`#${tag}`} />
                )
              }
              ) : (
                null
              )}
            </div>
            <div className='buttonForLikeAndBlock'>
              { !this.state.like ? (
                <Button className='primary' id='sizeButton' type='success' value='like' onClick={this.likeProfile}>Like</Button>
              ) : (
                <Button className='primary' id='sizeButton' type='danger' value='Unlike' onClick={this.unlikeProfile}>UnkLike</Button>
              )
              }
              <Button className='primary' id='sizeButton' type='success' value='Block' onClick={this.blockUser}>block</Button>
              <Button className='primary' id='sizeButton' type='primary' value='report User' onClick={this.handleKeyPress}>Report User</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile
