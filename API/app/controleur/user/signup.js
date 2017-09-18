const db = require('../../db.js')
const uuid = require('uuid')
const colors = require('colors')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {
  // //////////////----VERIFICATION----//////////////////////////////////////
  console.log(req.body)
  if (req.body.login === undefined || !req.body.login.match(/^([a-zA-Z0-9]+)$/)) {
    return res.json({
      success: false,
      message: 'login incorrect'
    })
  }
  if (req.body.isSexe === undefined || !req.body.isSexe.match(/^(Homme|Femme)$/)) {
    return res.json({
      message: 'sexe incorrect'
    })
  }
  if (req.body.toSexe === undefined || !req.body.toSexe.match(/^(Homme|Femme|All)$/)) {
    return res.json({
      message: 'to_match incorrect'
    })
  }
  // /////////----FORMAT DATE: YYYY-DD-MM -----////
  if (req.body.birthday === undefined || !req.body.birthday.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
    return res.json({
      message: 'date incorrect'
    })
  }
  console.log('je passe icic')
  // //////////---- HASH PASSWORD BCRYPT -----/////
  var hash = bcrypt.hashSync(req.body.passwd, 10)
  // console.log(hash.bgGreen.white.bold.underline)

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
      console.log('j arrive ici')
      if (results.length !== 1) {
        let tab = {
          _id: id,
          login: req.body.login,
          sexe: req.body.isSexe,
          to_match: req.body.toSexe,
          date: req.body.birthday,
          passwd: hash,
          path_img: '',
          tokens: []
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
              message: 'Internal server error',
              error: error
            })
          }
        })
        tab = {
          _id: id,
          img_0: '',
          img_1: '',
          img_2: '',
          img_3: '',
          img_4: ''
        }
        db.collection('Path_users').insert(tab, null, (error, results) => {
          if (error) {
            console.log(new Error(error))
            res.status(500)
            return res.json({
              message: 'Internal server error',
              error: error
            })
          }
        })
        res.status(200)
        return res.json({
          success: true,
          Message: 'INSCRIPTION OK -- ENJOY'
        })
      } else {
        res.status(200)
        return res.json({
          message: 'utilisateur deja present'
        })
      }
    })
  }).catch((err) => {
    console.log(err)
    res.status(500)
    return res.json({
      Message: 'Internal server error'
    })
  })
}
