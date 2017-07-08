import React from 'react'
import ReactDOM from 'react-dom'
import Acceuil from './header.js'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

ReactDOM.render(

  <Acceuil />,
  document.getElementById('root')
)
registerServiceWorker()
