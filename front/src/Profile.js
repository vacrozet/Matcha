import RaisedButton from 'material-ui/RaisedButton'
import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import {Link} from 'react-router-dom'
import Dropzone from 'react-dropzone'
import Chip from 'material-ui/Chip'
import './card.css'

const style = {
  height: 33
}
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
      bio: '',
      img: [
        `http://localhost:3001/picture/${global.localStorage.getItem('token')}/0?tot=${Math.random()}`,
        `http://localhost:3001/picture/${global.localStorage.getItem('token')}/1?tot=${Math.random()}`,
        `http://localhost:3001/picture/${global.localStorage.getItem('token')}/2?tot=${Math.random()}`,
        `http://localhost:3001/picture/${global.localStorage.getItem('token')}/3?tot=${Math.random()}`,
        `http://localhost:3001/picture/${global.localStorage.getItem('token')}/4?tot=${Math.random()}`
      ],
      popularite: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.searchTag = this.searchTag.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.onDropReject = this.onDropReject.bind(this)
    this.enterKeyPress = this.enterKeyPress.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }
  sendPicture (pic, index) {
    axiosInst().post('/picture/' + index, {
      pic: pic
    }).then((res) => {
      if (res.data.success === true) {
        this.props.notification.addNotification({
          level: 'success',
          title: 'Picture upload :',
          message: 'Done'
        })
      } else {
        this.props.notification.addNotification({
          level: 'error',
          title: 'Picture upload :',
          message: res.data.error
        })
      }
      this.setState({
        popularite: res.data.popularite
      })
    }).catch((err) => {
      if (err) {
        console.log(err.response)
      }
    })
  }
  onDropReject () {
    this.props.notification.addNotification({
      level: 'error',
      title: 'Picture upload :',
      message: 'Failed'
    })
  }
  onDrop1 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[0] = reader.result
        self.sendPicture(img[0], 0)
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
    setTimeout(() => {
      let url = `http://localhost:3001/picture/${global.localStorage.getItem('token')}/0?${new Date().getTime()}`
      document.getElementById('pictureProfile').style.backgroundImage = `url('${url}')`
    }, 50)
  }
  onDrop2 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[1] = reader.result
        self.sendPicture(img[1], 1)
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
  }
  onDrop3 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[2] = reader.result
        self.sendPicture(img[2], 2)
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
  }
  onDrop4 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[3] = reader.result
        self.sendPicture(img[3], 3)
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
  }
  onDrop5 (acceptedFiles) {
    let self = this
    acceptedFiles.forEach(file => {
      var reader = new global.FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let img = self.state.img
        img[4] = reader.result
        self.sendPicture(img[4], 4)
        self.setState({
          img: img
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    })
  }
  handleClear (tag) {
    axiosInst().delete(`./user/deletetag/${tag}`).then((res) => {
      this.searchTag()
      this.props.notification.addNotification({
        message: 'Tag deleted',
        level: 'success'
      })
      this.setState({
        popularite: res.data.popularite
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
  enterKeyPress (event) {
    if (event.key === 'Enter') {
      this.handleKeyPress()
    }
  }
  handleKeyPress () {
    if (this.state.tag !== '') {
      axiosInst().post('./user/addTag', {
        tag: this.state.tag
      }).then((res) => {
        this.setState({
          tag: '',
          popularite: res.data.popularite
        })
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
          bio: res.data.result[0].bio,
          location: res.data.result[0].location,
          popularite: res.data.result[0].popularite
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
            <Dropzone className='photo' disablePreview accept='image/png' maxSize={2000000} onDrop={this.onDrop1.bind(this)} onDropRejected={this.onDropReject}>
              <img className='photo' src={this.state.img[0]} alt='Profile 1' />
            </Dropzone>
            <Dropzone className='photo' disablePreview accept='image/png' maxSize={2000000} onDrop={this.onDrop2.bind(this)} onDropRejected={this.onDropReject}>
              <img className='photo' src={this.state.img[1]} alt='Profile 2' />
            </Dropzone>
            <Dropzone className='photo' disablePreview accept='image/png' maxSize={2000000} onDrop={this.onDrop3.bind(this)} onDropRejected={this.onDropReject}>
              <img className='photo' src={this.state.img[2]} alt='Profile 3' />
            </Dropzone>
            <Dropzone className='photo' disablePreview accept='image/png' maxSize={2000000} onDrop={this.onDrop4.bind(this)} onDropRejected={this.onDropReject}>
              <img className='photo' src={this.state.img[3]} alt='Profile 4' />
            </Dropzone>
            <Dropzone className='photo' disablePreview accept='image/png' maxSize={2000000} onDrop={this.onDrop5.bind(this)} onDropRejected={this.onDropReject}>
              <img className='photo' src={this.state.img[4]} alt='Profile 5' />
            </Dropzone>
          </div>
          <div className='cadre_profile'>
            <div className='text_profile'>Profile</div>
            <div>Login: {this.state.login}</div>
            <div>Prenom: {this.state.prenom}</div>
            <div>Nom: {this.state.nom}</div>
            <div>Sexe: {this.state.sexe}</div>
            <div>Interessé par: {this.state.toSexe}</div>
            <div>Age: {this.state.age}</div>
            <div>Adresse: {this.state.location}</div>
            <div>Bio: {this.state.bio}</div>
            <div>Popularite: {this.state.popularite}</div>
            <div><Link className='bmp primary' to='/profile/modify'><RaisedButton label='Modifier' primary /></Link></div>
          </div>
          <div className='all_htag'>
            <div className='affichage_tag'>
              { this.state.tagProfile ? this.state.tagProfile.map((tag) => {
                return (
                  <Chip key={Math.random()} type='primary' style={style} value={`#${tag}`} onRequestDelete={() => { this.handleClear(tag) }}>{`#${tag}`}</Chip>
                )
              }
              ) : (
                  null)
              }
            </div>
            <div className='binput'>
              <input type='name' name='tag' value={this.state.tag} onChange={this.handleChange} placeholder='#TAG' onKeyPress={this.enterKeyPress} />
              <RaisedButton label='ajouter' value='ajouter' primary onClick={() => { this.handleKeyPress() }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
