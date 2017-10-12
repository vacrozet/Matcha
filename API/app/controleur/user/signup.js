const db = require('../../db.js')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const zxcvbn = require('zxcvbn')

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

function error (res, nb, success, message) {
  res.status(nb)
  return res.json({
    message: message
  })
}
function renvoi (res, nb, success, message) {
  res.status(nb)
  return res.json({
    success: success,
    message: message
  })
}
function errorform (res, success, message) {
  res.json({
    success: success,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.body.login === undefined || !req.body.login.match(/^([a-zA-Z0-9]+)$/)) {
    return errorform(res, false, 'login incorrect')
  }
  if (req.body.nom.length < 3 || req.body.nom === '') {
    return errorform(res, false, 'nom incorrect')
  }
  if (req.body.prenom === undefined || req.body.prenom.length < 3 || req.body.prenom === '') {
    return errorform(res, false, 'prenom incorrect')
  }
  if (req.body.tag === undefined || req.body.tag[0] === '#' || req.body.tag.length < 2) {
    return errorform(res, false, 'tag incorrect')
  }
  if (req.body.isSexe === undefined || !req.body.isSexe.match(/^(Homme|Femme)$/)) {
    return errorform(res, false, 'sexe incorrect')
  }
  if (req.body.toSexe === undefined || !req.body.toSexe.match(/^(Homme|Femme|All)$/)) {
    return errorform(res, false, 'interssé par: incorrect')
  }
  if (req.body.passwd === undefined || req.body.passwd === '') {
    return errorform(res, false, 'Pass Not Completed')
  }
  if (req.body.rePasswd === undefined || req.body.rePasswd === '') {
    return errorform(res, false, 'RePass Not Completed')
  }
  if (req.body.rePasswd !== req.body.passwd) {
    return errorform(res, false, 'Pass And RePass Not Same')
  }
  if (!req.body.passwd.match(/^([a-zA-Z0-9!@#$%^&*()\\/]+)$/) ||
  req.body.passwd.length < 8 || zxcvbn(req.body.passwd).score <= 2) {
    return errorform(res, false, 'Pass not very secur')
  }
  if (req.body.email === undefined || req.body.email === '' ||
  !req.body.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    return errorform(res, false, 'Email Incorrect')
  }
  if (req.body.date === undefined || !req.body.date.match(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/)) {
    return errorform(res, false, 'date incorrect')
  } else {
    let test = getAge(req.body.date)
    if (test < 18 || test > 99) {
      return errorform(res, false, 'vous navez pas 18 ans')
    }
  }
  if (req.body.bio === undefined) {
    return errorform(res, false, 'bio not defined')
  }
  let hbirthday = getAge(req.body.date)
  var hash = bcrypt.hashSync(req.body.passwd, 10)
  var resultat = false
  db.get().then((db) => {
    db.collection('Users').find({mail: req.body.email}).toArray((error1, results1) => {
      if (error1) return error(res, 500, 'Internal server error')
      if (results1.length !== 0) {
        resultat = true
      }
    })
    db.collection('Users').find({login: req.body.login}).toArray((error, results) => {
      if (error) return error(res, 500, 'Internal server error')
      let id = uuid()
      if (results.length !== 1 && resultat !== true) {
        let tab = {
          _id: id,
          actif: true,
          completed: false,
          connected: false,
          lastConnected: false,
          newNotification: false,
          newNotificationMess: false,
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
          img: [],
          tokens: [],
          tag: [req.body.tag],
          like: [],
          match: [],
          block: [],
          notification: []
        }
        db.collection('Users').insert(tab, null, (error, result) => {
          if (error) return error(res, 500, 'Internal server error')
        })
        tab = {
          _id: id,
          login: req.body.login,
          chat: [],
          conversation: []
        }
        db.collection('Message_Users').insert(tab, null, (error, results) => {
          if (error) return error(res, 500, 'Internal server error')
        })
        renvoi(res, 200, true, 'INSCRIPTION REUSSIE')
      } else {
        renvoi(res, 200, true, 'utilisateur deja present')
      }
    })
  }).catch((err) => {
    return error(res, 500, err)
  })
}
