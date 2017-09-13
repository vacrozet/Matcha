import ReactDOM from 'react-dom'
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import Acceuil from './header.js'
import registerServiceWorker from './registerServiceWorker'
import Acceuil from './header.js'

import './index.css'

class Index extends React.Component {
  componentWillMount () {
    if (!global.localStorage.getItem('token') && this.props.location.pathname !== '/') {
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <Acceuil />
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' component={Index} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()
