import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'
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
      location: '',
      popularite: '',
      block: ''
    }
    this.likeProfile = this.likeProfile.bind(this)
    this.unlikeProfile = this.unlikeProfile.bind(this)
    this.blockUser = this.blockUser.bind(this)
    this.unBlockUser = this.unBlockUser.bind(this)
  }
  likeProfile (event) {
    axiosInst().post('./like/addlike', {
      login: this.state.login
    }).then((res) => {
      if (res.data.addlike === true) {
        this.setState({
          like: true
        })
        this.props.notification.addNotification({
          message: 'User Like',
          level: 'success'
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
        this.props.notification.addNotification({
          message: 'User DisLike',
          level: 'success'
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  blockUser (event) {
    axiosInst().post('./block/addblock', {
      login: this.state.login
    }).then((res) => {
      if (res.data.block === true) {
        this.setState({
          block: true
        })
        this.props.notification.addNotification({
          message: 'User Block',
          level: 'success'
        })
      }
    })
  }
  unBlockUser () {
    axiosInst().delete(`./block/deleteblock/${this.state.login}`).then((res) => {
      if (res.data.Unblock === true) {
        this.setState({
          block: false
        })
        this.props.notification.addNotification({
          message: 'User UnBlock',
          level: 'success'
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      console.log(this.props.match.params.login)
      axiosInst().get(`./user/userprofile/${this.props.match.params.login}`).then((res) => {
        console.log('requete')
        let capteur = false
        if (res.data.result[0].block.length > 0) {
          res.data.result[0].block.forEach((element) => {
            if (element === res.data.user) {
              capteur = true
            }
          }, this)
        }
        axiosInst().get(`./like/getlike/${this.props.match.params.login}`).then((res1) => {
          this.setState({
            login: res.data.result[0].login,
            nom: res.data.result[0].nom,
            prenom: res.data.result[0].prenom,
            date: res.data.result[0].date,
            age: res.data.result[0].age,
            sexe: res.data.result[0].sexe,
            img: res.data.result[0].img,
            tag: res.data.result[0].tag,
            location: res.data.result[0].location,
            popularite: res.data.result[0].popularite,
            block: capteur,
            like: res1.data.like
          })
        }).catch((err1) => {
          console.log(err1)
        })
      }).catch((err) => {
        console.log(err)
      })
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
              <div className='textUserProfile'>Popularité: </div>
              <div>{this.state.popularite}</div>
              <div className='textUserProfile'>Prenom: </div>
              <div>{this.state.prenom}</div>
              <div className='textUserProfile'>Nom: </div>
              <div>{this.state.nom}</div>
              <div className='textUserProfile'>Age: </div>
              <div>{this.state.age}</div>
              <div className='textUserProfile'>Anniversaire: </div>
              <div>{this.state.date}</div>
              <div className='textUserProfile'>Adresse: </div>
              <div>{this.state.location}</div>
              <div className='textUserProfile'>Bio: </div>
              <div>{this.state.bio}</div>
              <div className='textUserProfile'>Tous les #Tag:</div>
            </div>
            <div className='allTagUserProfile'>
              { this.state.tag ? this.state.tag.map((tag) => {
                return (
                  <Chip key={Math.random()} type='primary' value={`#${tag}`}>{`#${tag}`}</Chip>
                )
              }
              ) : (
                null
              )}
            </div>
            <div className='buttonForLikeAndBlock'>
              { !this.state.like ? (
                <RaisedButton label='Like' primary={true} onClick={() => { this.likeProfile(this.state.login) }} />
              ) : (
                <RaisedButton label='DisLike' secondary={true} onClick={() => { this.unlikeProfile(this.state.login) }} />
              )
              }
              { !this.state.block ? (
                <RaisedButton label='Block' secondary={true} onClick={() => { this.blockUser(this.state.login) }} />
              ) : (
                <RaisedButton label='UnBlock' secondary={true} onClick={() => { this.unBlockUser(this.state.login) }} />
              )
              }
              <RaisedButton label='ReportUser' secondary={true} onClick={() => { this.blockUser(this.state.login) }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile
