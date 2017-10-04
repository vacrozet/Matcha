import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './AccueilKo.css'

class AccueilKo extends Component {
  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      this.props.history.push('/accueil')
    }
  }

  render () {
    return (
      <div className='body'>
        <div className='block_text'>
          <div className='text'>Bienvenue sur Matcha</div>
          <div className='text'><Link className='button' to='/inscription' >Inscris-Toi</Link></div>
        </div>
      </div>
    )
  }
}

export default AccueilKo
