import ReactDOM from 'react-dom'
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import Inscription from './Inscription.js'
import Accueil from './Accueil.js'
import AccueilKo from './AccueilKo.js'
import Navbar from './Navbar.js'
import Profile from './Profile.js'
import Modify from './ModifyProfile.js'
import UserProfile from './UserProfile.js'
import Oubli from './Oubli.js'
import ResetPasswd from './ResetPasswd.js'
import './styles.min.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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
    if (!global.localStorage.getItem('token') && this.props.location.pathname.indexOf('/reset/resetpasswd/') === -1) {
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
      <div id='data'>
        <NotificationSystem ref='notificationSystem' />
        {(this.state.upNotifSys !== false) ? (
          <Navbar history={this.props.history} notification={this._notificationSystem} />
        ) : (
          null
        )}
        <Switch>
          <Route exact path='/oubli' render={({history, match, location}) =>
            <Oubli history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/inscription' render={({history, match, location}) =>
            <Inscription history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/accueil' render={({history, match, location}) =>
            <Accueil history={history} match={match} location={location} notification={this._notificationSystem} />
          } />
          <Route exact path='/profile/modify' render={({history, match, location}) =>
            <Modify history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/profile' render={({history, match, location}) =>
            <Profile history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/userprofile/:login' render={({history, match, location}) =>
            <UserProfile history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route path='/reset/resetpasswd/:hash' render={({history, match, location}) =>
            <ResetPasswd history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route path='/' component={AccueilKo} />
        </Switch>
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider>
      <Switch>
        <Route path='/' component={Index} />
      </Switch>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()
