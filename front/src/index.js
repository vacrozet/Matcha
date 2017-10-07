import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import Notification from './Notification.js'
import Inscription from './Inscription.js'
import UserProfile from './UserProfile.js'
import Message from './Message.js'
import ResetPasswd from './ResetPasswd.js'
import Modify from './ModifyProfile.js'
import AccueilKo from './AccueilKo.js'
import Messenger from './Messenger.js'
import Accueil from './Accueil.js'
import Profile from './Profile.js'
import ReactDOM from 'react-dom'
// import io from 'socket.io-client'
import Navbar from './Navbar.js'
import Oubli from './Oubli.js'
import React from 'react'
import './styles.min.css'

var NotificationSystem = require('react-notification-system')

// const socket = io(`http://localhost:3005`)
// socket.on('connection', () => {
//   console.log('connecter')
// })

class Index extends React.Component {
  constructor (props) {
    super(props)
    this._notificationSystem = null
    this.state = {
      _notificationSystem: false,
      count: 90
    }
    this.handleData = this.handleData.bind(this)
  }

  handleData (data) {
    let result = JSON.parse(data)
    this.setState({count: this.state.count + result.movement})
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
          <Route exact path='/messenger' render={({history, match, location}) =>
            <Messenger history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/message/:login' render={({history, match, location}) =>
            <Message history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/oubli' render={({history, match, location}) =>
            <Oubli history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/inscription' render={({history, match, location}) =>
            <Inscription history={history} match={match} notification={this._notificationSystem} />
          } />
          <Route exact path='/accueil' render={({history, match, location}) =>
            <Accueil history={history} match={match} location={location} notification={this._notificationSystem} />
          } />
          <Route exact path='/notification' render={({history, match, location}) =>
            <Notification history={history} match={match} location={location} notification={this._notificationSystem} />
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
