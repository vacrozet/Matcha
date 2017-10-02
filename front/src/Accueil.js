import React, { Component } from 'react'
import './StyleSheet.css'
import axiosInst from './utils/axios.js'
import FlatButton from 'material-ui/FlatButton'

class Acceuil extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      connexion: false,
      tab: []
    }
  }
  handleButtonPress (login) {
    this.props.history.push(`/userprofile/${login}`)
  }
  componentWillMount () {
    if (!global.localStorage.getItem('token')) {
      this.props.history.push('/')
    } else {
      axiosInst().get('/user/alluser').then((res) => {
        const tabl = res.data.tab
        if (tabl.length > 0) {
          this.setState({
            tab: res.data.tab
          })
          res.data.tab.forEach((element) => {
            console.log(element)
          }, this)
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
          <div className='multiProfile'>
            { this.state.tab ? this.state.tab.map((nam) => {
              
              return (
                <div className='multiProfile' key={nam._id}>
                  <div className='photoProfileMulti'>
                    <img className='photo' src={nam.img[0]} alt='photoProfile' />
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
                    <div className='textDescri'>Connecté:</div>
                    <div>in progress</div>
                    <FlatButton label="Voir" primary={true} onClick={() => {this.handleButtonPress(nam.login)}} />
                  </div>
                </div>
              )
            }
            ) : (
              <div>coucou</div>
            )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Acceuil
