import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import axiosInst from './utils/axios.js'
import socket from './socket.js'
import React from 'react'
import './StyleSheet.css'

const items = []
for (let i = 18; i < 99; i++) {
  items.push(<MenuItem value={i} key={i} primaryText={`Age-Min ${i}`} />)
}
const items1 = []
for (let i = 99; i > 18; i--) {
  items1.push(<MenuItem value={i} key={i} primaryText={`Age-Max ${i}`} />)
}
const items2 = []
for (let i = 0; i < 99; i++) {
  items2.push(<MenuItem value={i} key={i} primaryText={`popularite Superieur à ${i}`} />)
}
const items4 = []
for (let i = 100; i > 0; i--) {
  items4.push(<MenuItem value={i} key={i} primaryText={`popularite inferieur à ${i}`} />)
}
const items3 = []
for (let i = 100; i > 1; i--) {
  items3.push(<MenuItem value={i} key={i} primaryText={`Distance Inférieur à ${i}`} />)
}

class Acceuil extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      connexion: false,
      AgeMin: 18,
      AgeMax: 99,
      populariteMin: 0,
      populariteMax: 100,
      distance: '',
      tag: '',
      tab: []
    }
    this.handleChangeAgeMin = this.handleChangeAgeMin.bind(this)
    this.handleChangeAgeMax = this.handleChangeAgeMax.bind(this)
    this.handleChangePopulariteMin = this.handleChangePopulariteMin.bind(this)
    this.handleChangePopulariteMax = this.handleChangePopulariteMax.bind(this)
    this.handleChangedistance = this.handleChangedistance.bind(this)
    this.handleChangeTag = this.handleChangeTag.bind(this)
    socket.on('UserDisconnected', (data) => {
      var maj = this.state.tab
      maj.forEach((element) => {
        if (element.login === data.login) {
          element.connected = 'Offline'
        }
      }, this)
      this.setState({
        tab: maj
      })
    })
    socket.on('UserConnected', (data) => {
      var maj = this.state.tab
      maj.forEach((element) => {
        if (element.login === data.login) {
          element.connected = 'Online'
        }
      }, this)
      this.setState({
        tab: maj
      })
    })
  }
  handleButtonPress (login) {
    this.props.history.push(`/userprofile/${login}`)
  }
  handleChangeAgeMin (event, index, value) {
    this.setState({AgeMin: value})
  }
  handleChangeAgeMax (event, index, value) {
    this.setState({AgeMax: value})
  }
  handleChangePopulariteMin (event, index, value) {
    this.setState({populariteMin: value})
  }
  handleChangePopulariteMax (event, index, value) {
    this.setState({populariteMax: value})
  }
  handleChangedistance (event, index, value) {
    this.setState({distance: value})
  }
  handleChangeTag (event) {
    this.setState({tag: event.target.value})
  }
  handleKeyPress (event) {
    var tag = true
    var age = true
    var popularite = true
    if (this.state.tag !== '') {
      var tagtab = this.state.tag.split(' ')
      if (tagtab.length !== 1 || tagtab[0][0] !== '#') {
        this.props.notification.addNotification({
          message: '#Tag Mal renseigné',
          level: 'error'
        })
        tag = false
      } else {
        tag = true
      }
    }
    if (this.state.AgeMin > this.state.AgeMax) {
      this.props.notification.addNotification({
        message: 'Age Mal renseigné',
        level: 'error'
      })
      age = false
    }
    if (this.state.populariteMin > this.state.populariteMax) {
      this.props.notification.addNotification({
        message: 'popularité Mal renseigné',
        level: 'error'
      })
      popularite = false
    }

    if (age === true && popularite === true && tag === true) {
      axiosInst().get('/user/alluser', {
        params: {
          AgeMin: this.state.AgeMin,
          AgeMax: this.state.AgeMax,
          populariteMin: this.state.populariteMin,
          populariteMax: this.state.populariteMax,
          distance: this.state.distance,
          tag: this.state.tag
        }
      }).then((res) => {
        this.setState({
          tab: res.data.tab
        })
      }).catch((err1) => {
        console.log(err1)
      })
    }
  }
  componentWillMount () {
    if (!global.localStorage.getItem('token')) {
      this.props.history.push('/')
    } else {
      axiosInst().get('/user/alluser', {
        params: {
          AgeMin: this.state.AgeMin,
          AgeMax: this.state.AgeMax,
          populariteMin: this.state.populariteMin,
          populariteMax: this.state.populariteMax
        }
      }).then((res) => {
        const tabl = res.data.tab
        if (tabl.length > 0) {
          tabl.forEach((element) => {
            if (element.connected === true) {
              element.connected = 'Online'
            }
          }, this)
          this.setState({
            tab: res.data.tab
          })
        }
      }).catch((erreur) => {
        console.log(erreur)
      })
      this.setState({
        connexion: true
      })
    }
  }
  render () {
    return (
      <div className='all'>
        <div className='body_accueil_search'>
          <div className='searchProfile'>
            <SelectField hintText='Age-Min' value={this.state.AgeMin} onChange={this.handleChangeAgeMin} maxHeight={200}>
              {items}
            </SelectField>
            <SelectField hintText='Age-Max' value={this.state.AgeMax} onChange={this.handleChangeAgeMax} maxHeight={200}>
              {items1}
            </SelectField>
            <SelectField hintText='Popularité Min' value={this.state.populariteMin} onChange={this.handleChangePopulariteMin} maxHeight={200}>
              {items2}
            </SelectField>
            <SelectField hintText='Popularité Max' value={this.state.populariteMax} onChange={this.handleChangePopulariteMax} maxHeight={200}>
              {items4}
            </SelectField>
            <SelectField hintText='Distance' value={this.state.distance} onChange={this.handleChangedistance} maxHeight={200}>
              {items3}
            </SelectField><br />
            <TextField hintText='#tag' value={this.state.tag} type='text' underlineShow onChange={this.handleChangeTag} />
            <RaisedButton label='Rechercher' primary onClick={() => { this.handleKeyPress() }} />
          </div>
          <div className='resultProfile'>
            { this.state.tab ? this.state.tab.map((nam) => {
              return (
                <div className='multiProfile' key={nam._id}>
                  <div className='photoProfileMulti'>
                    <img className='photo' src={nam.img[0]} alt='profile' />
                  </div>
                  <div className='descriProfilMulti'>
                    <div className='textDescri'>Login:</div>
                    <div>{nam.login}</div>
                    <div className='textDescri'>Age:</div>
                    <div>{nam.age}</div>
                    <div className='textDescri'>Sexe:</div>
                    <div>{nam.sexe}</div>
                    <div className='textDescri'>Tag:</div>
                    <div>{nam.tag[0]}</div>
                    <div className='textDescri'>Distance:</div>
                    <div>{nam.distance} km</div>
                    <div className='textDescri'>Etat de connexion:</div>
                    <div>{nam.connected}</div>
                    <FlatButton label='Voir' primary onClick={() => { this.handleButtonPress(nam.login) }} />
                  </div>
                </div>
              )
            }
          ) : (
            null
          )
          }
          </div>
        </div>
      </div>
    )
  }
}

export default Acceuil
