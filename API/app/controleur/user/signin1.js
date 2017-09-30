const bcrypt = require('bcryptjs')
const db = require('../../db.js')
const axios = require('axios')
// const axios = require('axios')

function genToken () {
  var str = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`
  var token = ''
  for (var count = 0; count < 128; count++) {
    token += str[Math.floor((Math.random() * str.length))]
  }
  return (token)
}
function getAge (datestring) {
  var today = new Date()
  var birthDate = new Date(datestring)
  var age = today.getFullYear() - birthDate.getFullYear()
  var m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
function erreur (res, text) {
  console.log('je rentre ici')
  return res.json({
    error: text
  })
}
module.exports = (req, res) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.latitude},${req.body.longitude}&key=AIzaSyBO7tyw2-nedpTDffo6qR3isxTMCuzaNs8`
  axios.get(url).then((res2) => {
    db.get().then((db) => {
      db.collection('Users').updateOne({login: req.body.login}, {$set:
      {
        long: req.body.longitude,
        lat: req.body.latitude,
        location: res2.data.results[0].formatted_address
      }
      })
    })
  }).catch((err2) => {
    console.log(err2)
  })
  if (req.body.login === undefined || !req.body.login.match(/^([a-zA-Z0-9]+)$/)) {
    res.status(400)
    return res.json({
      message: 'login incorrect'
    })
  }
  db.get().then((db) => {
    db.collection('Users').find({login: req.body.login}).toArray((error, results) => {
      if (error) {
        res.status(500)
        return res.json({
          error: 'Internal server error'
        })
      }
      console.log(results.length)
      if (results.length !== 1) return erreur(res, 'User Not Found')
      console.log('je passe')
      if (!bcrypt.compareSync(req.body.passwd, results[0].passwd)) return erreur(res, 'Wrong Passwd')
      let objToken = {}
      objToken.token = genToken()
      objToken.created_at = new Date().getTime()
      let hbirthday = getAge(results[0].date)
      results[0].tokens.push(objToken)
      db.collection('Users').updateOne({login: req.body.login}, {$set:
      {
        tokens: results[0].tokens,
        age: hbirthday,
        long: req.body.longitude,
        lat: req.body.latitude,
        img: [
          `http://localhost:3001/picture/${objToken.token}/0`,
          `http://localhost:3001/picture/${objToken.token}/1`,
          `http://localhost:3001/picture/${objToken.token}/2`,
          `http://localhost:3001/picture/${objToken.token}/3`,
          `http://localhost:3001/picture/${objToken.token}/4`
        ]
      }
      }).then((res1) => {
        return res.json({
          success: true,
          token: objToken.token,
          login: results[0].login,
          sexe: results[0].sexe,
          age: hbirthday,
          img: [
            `http://localhost:3001/picture/${objToken.token}/0`,
            `http://localhost:3001/picture/${objToken.token}/1`,
            `http://localhost:3001/picture/${objToken.token}/2`,
            `http://localhost:3001/picture/${objToken.token}/3`,
            `http://localhost:3001/picture/${objToken.token}/4`
          ]
        })
      }).catch((err1) => {
        return res.json({
          message: 'erreur'
        })
      })
    })
  })
}
