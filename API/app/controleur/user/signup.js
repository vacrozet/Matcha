const db = require('../../db.js')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

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

module.exports = (req, res) => {
  if (req.body.login === undefined || !req.body.login.match(/^([a-zA-Z0-9]+)$/)) {
    return res.json({
      success: false,
      message: 'login incorrect'
    })
  }
  if (req.body.nom.length < 3 || req.body.nom === '') {
    return res.json({
      success: false,
      message: 'nom incorrect'
    })
  }
  if (req.body.prenom === undefined || req.body.prenom.length < 3 || req.body.prenom === '') {
    return res.json({
      success: false,
      message: 'prenom incorrect'
    })
  }
  if (req.body.tag === undefined || req.body.tag[0] === '#' || req.body.tag.length < 2) {
    return res.json({
      success: false,
      message: 'tag incorrect'
    })
  }
  if (req.body.isSexe === undefined || !req.body.isSexe.match(/^(Homme|Femme)$/)) {
    return res.json({
      success: false,
      message: 'sexe incorrect'
    })
  }
  if (req.body.toSexe === undefined || !req.body.toSexe.match(/^(Homme|Femme|All)$/)) {
    return res.json({
      success: false,
      message: 'interssé par: incorrect'
    })
  }
  if (req.body.passwd === undefined || req.body.passwd === '') {
    return res.json({
      success: false,
      message: 'Pass Not Completed'
    })
  }
  if (req.body.rePasswd === undefined || req.body.rePasswd === '') {
    return res.json({
      success: false,
      message: 'RePass Not Completed'
    })
  }
  if (req.body.rePasswd !== req.body.passwd) {
    return res.json({
      success: false,
      message: 'Pass And RePass Not Same'
    })
  }
  if (req.body.email === undefined || req.body.email === '' ||
  !req.body.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    return res.json({
      success: false,
      message: 'Email Incorrect'
    })
  }
  if (req.body.date === undefined || !req.body.date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
    return res.json({
      success: false,
      message: 'date incorrect'
    })
  }
  if (req.body.bio === undefined) {
    return res.json({
      success: false,
      message: 'bio not defined'
    })
  }
  let hbirthday = getAge(req.body.date)

  // //////////---- HASH PASSWORD BCRYPT -----/////
  var hash = bcrypt.hashSync(req.body.passwd, 10)

  db.get().then((db) => {
    db.collection('Users').find({login: req.body.login, mail: req.body.mail}).toArray((error, results) => {
      if (error) {
        res.status(500)
        return res.json({
          error: 'Internal server error'
        })
      }
  // ///////-----CREATION D'UN NOUVEL USER-----////////////
      let id = uuid()
      if (results.length !== 1) {
        let tab = {
          _id: id,
          actif: true,
          completed: false,
          login: req.body.login,
          nom: req.body.nom,
          prenom: req.body.prenom,
          mail: req.body.email,
          sexe: req.body.isSexe,
          to_match: req.body.toSexe,
          date: req.body.date,
          age: hbirthday,
          bio: req.body.bio,
          passwd: hash,
          hash: '',
          popularite: 50,
          long: '',
          lat: '',
          distance: '',
          location: '',
          ville: '',
          img: [],
          tokens: [],
          tag: [req.body.tag],
          like: [],
          match: [],
          block: [],
          notification: []
        }
        db.collection('Users').insert(tab, null, (error, result) => {
          if (error) {
            res.status(500)
            return res.json({
              message: 'Internal server error',
              error: error
            })
          }
        })
        tab = {
          _id: id,
          login: [req.body.login]
        }
        db.collection('Like_User').insert(tab, null, (error, results) => {
          if (error) {
            console.log(new Error(error))
            res.status(500)
            return res.json({
              success: false,
              message: 'Internal server error',
              error: error
            })
          }
        })
        res.status(200)
        return res.json({
          success: true,
          message: 'INSCRIPTION REUSSIE'
        })
      } else {
        res.status(200)
        return res.json({
          success: true,
          message: 'utilisateur deja present'
        })
      }
    })
  }).catch((err) => {
    console.log(err)
    res.status(500)
    return res.json({
      success: false,
      Message: 'Internal server error'
    })
  })
}
