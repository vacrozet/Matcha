import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import axiosInst from './utils/axios.js'
import LinearProgress from 'material-ui/LinearProgress'
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
const style = {
  margin: 5
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
      tab: [],
      UserLog: []
    }
    this.handleChangeAgeMin = this.handleChangeAgeMin.bind(this)
    this.handleChangeAgeMax = this.handleChangeAgeMax.bind(this)
    this.handleChangePopulariteMin = this.handleChangePopulariteMin.bind(this)
    this.handleChangePopulariteMax = this.handleChangePopulariteMax.bind(this)
    this.handleChangedistance = this.handleChangedistance.bind(this)
    this.handleChangeTag = this.handleChangeTag.bind(this)
    this.handleChangeNumber = this.handleChangeNumber.bind(this)
    this.handleDistance = this.handleDistance.bind(this)
    this.handleAge = this.handleAge.bind(this)
    this.handlePopularite = this.handlePopularite.bind(this)
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
  handleChangeNumber (event) {
    this.setState({distance: event.target.value})
    console.log(this.state.distance)
  }
  handleKeyPress (event) {
    var tag = true
    var age = true
    var popularite = true
    console.log(this.state.distance)
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
  handleDistance () {
    if (this.state.tab.length > 1) {
      var maj = this.state.tab
      maj.sort((a, b) => {
        var sortvalue
        if (a.distance < b.distance) {
          sortvalue = -1
        }
        if (a.distance === b.distance) {
          sortvalue = 0
        }
        if (a.distance > b.distance) {
          sortvalue = 1
        }
        return sortvalue
      })
      this.setState({
        tab: maj
      })
    }
  }
  handlePopularite (event) {
    if (this.state.tab.length > 1) {
      var maj = this.state.tab
      maj.sort((a, b) => {
        var sortvalue
        if (a.distance < b.distance) {
          sortvalue = 1
        }
        if (a.distance === b.distance) {
          sortvalue = 0
        }
        if (a.distance > b.distance) {
          sortvalue = -1
        }
        return sortvalue
      })
      this.setState({
        tab: maj
      })
    }
  }
  handleAge (event) {
    if (this.state.tab.length > 1) {
      var maj = this.state.tab
      maj.sort((a, b) => {
        var sortvalue
        if (a.age < b.age) {
          sortvalue = -1
        }
        if (a.age === b.age) {
          sortvalue = 0
        }
        if (a.age > b.age) {
          sortvalue = 1
        }
        return sortvalue
      })
      this.setState({
        tab: maj
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
            </SelectField><br />
            <TextField hintText='#tag' value={this.state.tag} type='text' underlineShow onChange={this.handleChangeTag} />
            <TextField hintText='Distance Max' value={this.state.distance} type='number' min='1' max='1000' underlineShow onChange={this.handleChangeNumber} />
            <RaisedButton label='Rechercher' primary onClick={() => { this.handleKeyPress() }} /><br />
            <RaisedButton label='Distance' style={style} primary onClick={() => { this.handleDistance() }} />
            <RaisedButton label='Age' style={style} primary onClick={() => { this.handleAge() }} />
            <RaisedButton label='Popularite' style={style} primary onClick={() => { this.handlePopularite() }} />
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
                    <div className='textDescri'>Popularité</div>
                    <LinearProgress mode='determinate' value={nam.popularite} style={style} />
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
