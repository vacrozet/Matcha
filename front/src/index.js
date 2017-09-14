import ReactDOM from 'react-dom'
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import Acceuil from './header.js'
import registerServiceWorker from './registerServiceWorker'
import Inscription from './Inscription.js'
import Accueil from './Accueil.js'

import './index.css'

class Index extends React.Component {
  componentWillMount () {
    if (!global.localStorage.getItem('token') && this.props.location.pathname !== '/') {
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <Switch>
        <Route exact path='/inscription' component={Inscription} />
        <Route path='/' component={Accueil} />
      </Switch>
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
