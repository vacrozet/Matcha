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

var NotificationSystem = require('react-notification-system')

class Index extends React.Component {
  constructor (props) {
    super(props)

    this._notificationSystem = null
    this.state = {
      _notificationSystem: false
    }
  }

  componentWillMount () {
    if (!global.localStorage.getItem('token') && this.props.location.pathname !== '/') {
      this.props.history.push('/')
    }
    if (global.localStorage.getItem('token') && this.props.location.pathname === '/') {
      this.props.history.push('/accueil')
    }
  }

  componentDidMount () {
    this._notificationSystem = this.refs.notificationSystem
    this.setState({upNotifSys: true})
  }

  render () {
    return (
      <div>
        <NotificationSystem ref='notificationSystem' />
        {(this.state.upNotifSys !== false) ? (
          <Navbar history={this.props.history} notification={this._notificationSystem} />
        ) : (
          null
        )}
        <Switch>
          <Route exact path='/inscription' render={({history, match, location}) => {
            <Inscription history={history} match={match} notification={this._notificationSystem} />
          }} />
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
