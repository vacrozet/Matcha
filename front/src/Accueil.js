import React, { Component } from 'react'
import './StyleSheet.css'
// import {Link} from 'react-router-dom'

class Acceuil extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      connexion: false
    }
  }

  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      this.setState({connexion: true})
    }
  }

  render () {
    return (
      <div className='all'>
        <div className='body' >
          { !this.state.connexion ? (
            <div className='Signup'>
              Bienvenue sur mon site <br />
              Il est moche, Je sais <br />
              =D <br />
            </div>
            ) : (
              <div className='Signup'>
                <div>vous etes connecter</div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default Acceuil
