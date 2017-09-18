import React, { Component } from 'react'
import './AccueilKo.css'
import {Link} from 'react-router-dom'

class AccueilKo extends Component {
  componentWillMount () {

  }

  render () {
    return (
      <div className='body'>
        <div className='block_text'>
          <div className='text'>Bienvenue sur Matcha</div>
          <div className='text'><Link className='button' to='/inscription' >Inscrit Toi</Link></div>
        </div>
      </div>
    )
  }
}

export default AccueilKo
