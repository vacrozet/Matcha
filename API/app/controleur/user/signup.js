const db = require('../../db.js')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {
  // //////////////----VERIFICATION----//////////////////////////////////////
  console.log(req.body.login)
  console.log(req.body.nom)
  console.log(req.body.prenom)
  console.log(req.body.tag)
  console.log(req.body.date)
  console.log(req.body.isSexe)
  console.log(req.body.toSexe)
  if (req.body.login === undefined || !req.body.login.match(/^([a-zA-Z0-9]+)$/)) {
    return res.json({
      success: false,
      message: 'login incorrect'
    })
  }
  if (req.body.nom.length < 4 || req.body.nom === '') {
    return res.json({
      success: false,
      message: 'nom incorrect'
    })
  }
  if (req.body.prenom === undefined || req.body.prenom.length < 4 || req.body.prenom === '') {
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
  // ///////------ VERIFICATION MAIL ------- Regex a ajouter ----///////////
  if (req.body.email === undefined || req.body.email === '') {
    return res.json({
      success: false,
      message: 'Email Incorrect'
    })
  }
  // /////////----FORMAT DATE: YYYY-DD-MM -----////
  if (req.body.date === undefined || !req.body.date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
    return res.json({
      success: false,
      message: 'date incorrect'
    })
  }
  // //////////---- HASH PASSWORD BCRYPT -----/////
  var hash = bcrypt.hashSync(req.body.passwd, 10)

  db.get().then((db) => {
    db.collection('Users').find({login: req.body.login}).toArray((error, results) => {
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
          login: req.body.login,
          nom: req.body.nom,
          prenom: req.body.prenom,
          mail: req.body.email,
          sexe: req.body.isSexe,
          to_match: req.body.toSexe,
          date: req.body.date,
          age: '',
          passwd: hash,
          img: [],
          tokens: [],
          tag: [req.body.tag]
        }
        db.collection('Users').insert(tab, null, (error, result) => {
          if (error) {
            console.log(new Error(error))
            res.status(500)
            return res.json({
              message: 'Internal server error',
              error: error
            })
          }
        })
        tab = {
          _id: id
        }
        db.collection('Tag_users').insert(tab, null, (error, results) => {
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
