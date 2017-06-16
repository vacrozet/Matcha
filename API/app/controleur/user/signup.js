const MongoClient = require('mongodb').MongoClient
const uuid = require('uuid')
const colors = require('colors')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {
  // //////////////----VERIFICATION----//////////////////////////////////////
  if (!req.body.login.match(/^([a-zA-Z0-9]+)$/)) {
    console.log('je passe ici')
    return res.json({
      message: 'login incorrect'
    })
  }
  if (!req.body.sexe.match(/^(Homme|Femme)$/)) {
    return res.json({
      message: 'sexe incorrect'
    })
  }
  if (!req.body.to_match.match(/^(Homme|Femme|Between)$/)) {
    return res.json({
      message: 'to_match incorrect'
    })
  }
  // /////////----FORMAT DATE: YYYY-MM-DD -----////
  if (!req.body.date.match(/^(0?\d|[12]\d|3[01])-(0?\d|1[012])-((?:19|20)\d{2})$/)) {
    return res.json({
      message: 'date incorrect'
    })
  }
  // //////////---- HASH PASSWORD BCRYPT -----/////
  var hash = bcrypt.hashSync(req.body.passwd, 10)
  // console.log(hash.bgGreen.white.bold.underline)

  MongoClient.connect('mongodb://localhost/matcha', (error, db) => {
    if (error) return console.log(error)

    console.log("Connecté à la base de données 'matcha'")

    db.collection('Users').find({login: req.body.login}).toArray((error, results) => {
      if (error) {
        return res.json({
          err: "erreur d'injection"
        })
      }
  // ///////-----CREATION D'UN NOUVEL USER-----////////////
      const id = uuid()
      if (results.length !== 1) {
        let tab = {
          _id: id,
          login: req.body.login,
          sexe: req.body.sexe,
          to_match: req.body.to_match,
          date: req.body.date,
          passwd: hash,
          path_img: ''
        }
        db.collection('Users').insert(tab, null, (error, result) => {
          if (error) {
            db.close()
            console.log(new Error(error))
            return res.json({
              message: "erreur d'injection la",
              error: error
            })
          }
        })
        let tag = {
          _id: id
        }
        db.collection('Tag_users').insert(tag, null, (error, results) => {
          if (error) {
            db.close()
            console.log(new Error(error))
            return res.json({
              message: 'Erreur d injection a Tag',
              error: error
            })
          }
        })
        let path = {
          _id: id,
          img_0: '',
          img_1: '',
          img_2: '',
          img_3: '',
          img_4: ''
        }
        db.collection('Path_users').insert(path, null, (error, results) => {
          if (error) {
            db.close()
            console.log(new Error(error))
            return res.json({
              message: 'Erreur d injection a Path',
              error: error
            })
          }
        })
        db.close()
        return res.json({
          Message: 'INSCRIPTION OK -- ENJOY'
        })
      } else {
        db.close()
        return res.json({
          message: 'utilisateur deja present'
        })
      }
    })
  })
}
