import React, { Component } from 'react'
import './StyleSheet.css'
import axiosInst from './utils/axios.js'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const items = []
for (let i = 18; i < 99; i++) {
  items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />)
}

class Acceuil extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      connexion: false,
      AgeMin: 18,
      AgeMax: 99,
      tab: []
    }
  }
  handleButtonPress (login) {
    console.log('je rentre ici')
    this.props.history.push(`/userprofile/${login}`)
  }
  handleChangeAge (event, index, value) {
    console.log(event)
    console.log(value)
    this.setState({
      AgeMin: value
    })
  }
  componentWillMount () {
    if (!global.localStorage.getItem('token')) {
      this.props.history.push('/')
    } else {
      axiosInst().get('/user/alluser').then((res) => {
        const tabl = res.data.tab
        if (tabl.length > 0) {
          this.setState({
            tab: res.data.tab
          })
          res.data.tab.forEach((element) => {
            console.log(element)
          }, this)
        }
      }).catch((erreur) => {
        console.log(erreur)
      })
      this.setState({
        connexion: true
      })
    }
  }
  render () {
    return (
      <div className='all'>
        <div className='body_accueil_search'>
          <div className='searchProfile'>
            <SelectField hintText='Age-Min' value={this.state.AgeMin} onChange={this.handleChangeAge} maxHeight={99}>
              {items}
            </SelectField>
          </div>
        </div>
      </div>
        )
      }
    }

export default Acceuil
      // { this.state.tab ? this.state.tab.map((nam) => {
        
      //   return (
      //     <div className='multiProfile' key={nam._id}>
      //       <div className='photoProfileMulti'>
      //         <img className='photo' src={nam.img[0]} alt='photoProfile' />
      //       </div>
      //       <div className='descriProfilMulti'>
      //         <div className='textDescri'>Login:</div>
      //         <div>{nam.login}</div>
      //         <div className='textDescri'>Age:</div>
      //         <div>{nam.age}</div>
      //         <div className='textDescri'>Sexe:</div>
      //         <div>{nam.sexe}</div>
      //         <div className='textDescri'>Tag:</div>
      //         <div>{nam.tag[0]}</div>
      //         <div className='textDescri'>Connecté:</div>
      //         <div>in progress</div>
      //         <FlatButton label="Voir" primary={true} onClick={() => {this.handleButtonPress(nam.login)}} />
      //       </div>
      //     </div>
      //   )
      // }
      // ) : (
      //   <div>coucou</div>
      // )
      // }
