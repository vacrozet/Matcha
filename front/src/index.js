import ReactDOM from 'react-dom'
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import Acceuil from './header.js'
import registerServiceWorker from './registerServiceWorker'
import Inscription from './Inscription.js'
import Accueil from './Accueil.js'
import AccueilKo from './AccueilKo.js'
import Navbar from './Navbar.js'
import Profile from './Profile.js'

import './index.css'

class Index extends React.Component {
  componentWillMount () {
    if (!global.localStorage.getItem('token') && this.props.location.pathname !== '/') {
      this.props.history.push('/')
    }
    if (global.localStorage.getItem('token') && this.props.location.pathname === '/') {
      this.props.history.push('/accueil')
    }
  }

  render () {
    return (
      <div>
        <Navbar history={this.props.history} />
        <Switch>
          <Route exact path='/inscription' component={Inscription} />
          <Route exact path='/accueil' component={Accueil} />
          <Route exact path='/profile' component={Profile} />
          <Route path='/' component={AccueilKo} />
        </Switch>
      </div>
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
