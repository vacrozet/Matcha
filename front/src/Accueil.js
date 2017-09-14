import React, { Component } from 'react'
import './StyleSheet.css'
import Navbar from './Navbar.js'
import {Link} from 'react-router-dom'

class Acceuil extends Component {
  constructor () {
    super()
    this.state = {
      email: ''
    }
  }

  render () {
    return (
      <div className='all'>
        <Navbar />
        <div className='body' >
          <div className='Signup'>
            Bienvenue sur mon site <br />
            Il est moche, Je sais <br />
            =D <br />
            <div>
              <Link to='/inscription'>Clique ici pour ton t'inscrire</Link>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Acceuil
