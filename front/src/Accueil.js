import React, { Component } from 'react'
import './StyleSheet.css'
import axiosInst from './utils/axios.js'
import {Button} from 'elemental'
// import {Link} from 'react-router-dom'

class Acceuil extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      connexion: false,
      tab: []
    }
  }
  handleButtonPress (event) {
    this.props.history.push(`/userprofile/${event.target.value}`)
  }
  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      axiosInst().get('/user/alluser').then((res) => {
        if (res.data.tab.length >= 1) {
          console.log(res.data.tab.length)
          this.setState({
            tab: res.data.tab
          })
        }
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
                    <Button className='primary' type='primary' value={nam.login} onClick={this.handleButtonPress.bind(this)}>Voir</Button>
                  </div>
                </div>
              )
            }
            ) : (
              <div>Personne sur ce reseaux de merde</div>
            )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Acceuil
