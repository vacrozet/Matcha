import React, { Component } from 'react'
import './StyleSheet.css'

class Test extends Component {
  myFunction (event) {
    document.querySelector('.container').classList.toggle('change')
  }
  render () {
    return (
      // <p>Click on the Menu Icon to transform it to "X":</p>
      <div className='header' >
        <div className='container' onClick={this.myFunction} >
          <div className='bar1' />
          <div className='bar2' />
          <div className='bar3' />
        </div>
      </div>
    )
  }
}

export default Test
