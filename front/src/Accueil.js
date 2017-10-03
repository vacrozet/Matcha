import React from 'react'
import './StyleSheet.css'
import axiosInst from './utils/axios.js'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'

const items = []
for (let i = 18; i < 99; i++) {
  items.push(<MenuItem value={i} key={i} primaryText={`Age-Min ${i}`} />)
}
const items1 = []
for (let i = 99; i > 18; i--) {
  items1.push(<MenuItem value={i} key={i} primaryText={`Age-Max ${i}`} />)
}
const items2 = []
for (let i = 0; i < 99; i++) {
  items2.push(<MenuItem value={i} key={i} primaryText={`Supérieur à ${i}`} />)
}
const items3 = []
for (let i = 100; i > 1; i--) {
  items3.push(<MenuItem value={i} key={i} primaryText={`Inférieur à ${i}`} />)
}

class Acceuil extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      connexion: false,
      AgeMin: 18,
      AgeMax: 99,
      popularite: 0,
      distance: 100,
      tab: []
    }
    this.handleChangeAgeMin = this.handleChangeAgeMin.bind(this)
    this.handleChangeAgeMax = this.handleChangeAgeMax.bind(this)
    this.handleChangePopularite = this.handleChangePopularite.bind(this)
    this.handleChangedistance = this.handleChangedistance.bind(this)
  }
  handleButtonPress (login) {
    this.props.history.push(`/userprofile/${login}`)
  }
  handleChangeAgeMin (event, index, value) {
    this.setState({AgeMin: value})
  }
  handleChangeAgeMax (event, index, value) {
    this.setState({AgeMax: value})
  }
  handleChangePopularite (event, index, value) {
    this.setState({popularite: value})
  }
  handleChangedistance (event, index, value) {
    this.setState({distance: value})
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
            <SelectField hintText='Age-Min' value={this.state.AgeMin} onChange={this.handleChangeAgeMin} maxHeight={200}>
              {items}
            </SelectField>
            <SelectField hintText='Age-Max' value={this.state.AgeMax} onChange={this.handleChangeAgeMax} maxHeight={200}>
              {items1}
            </SelectField>
            <SelectField hintText='Popularité' value={this.state.popularite} onChange={this.handleChangePopularite} maxHeight={200}>
              {items2}
            </SelectField>
            <SelectField hintText='Distance' value={this.state.distance} onChange={this.handleChangedistance} maxHeight={200}>
              {items3}
            </SelectField>
            <TextField hintText='#tag' value={this.state.newpasswd} type='password' underlineShow={true} onChange={this.handleChangeNp} />
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
