import React, { Component } from 'react'
import axiosInst from './utils/axios.js'
import './StyleSheet.css'

function scrollbutton () {
  var element = document.getElementById('scroll')
  element.scrollTop = element.scrollHeight
}

class Notifaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notification: [],
      nb: ''
    }
  }

  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      axiosInst().get('/user/notification').then((res) => {
        if (res.data.result[0].notification.length > 0) {
          this.setState({
            notification: res.data.result[0].notification,
            nb: true
          })
          document.getElementById('Notification').setAttribute('style', 'color: white')
          scrollbutton()
        } else {
          this.setState({
            notification: res.data.result[0].notification,
            nb: false
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div>
        <div className='bodyNotification'>
          <div id='scroll' className='notification'>
            { this.state.nb ? (this.state.notification.map((oklm) => {
              return (
                <div className='allNotification' key={Math.random()}>
                  <div>{oklm[1]}</div>
                  <div>{oklm[0]}</div>
                </div>
              )
            })
            ) : (
              null
            )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Notifaction
