const MongoClient = require('mongodb').MongoClient
const uuid = require('uuid')
const colors = require('colors')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {
  // MongoClient.connect('mongodb://localhost/matcha', (error, db) => {
  //   if (error) return console.log(error)

  //   console.log("Connecté à la base de données 'matcha'")

  //   db.collection('Users').insert(tab, null, (error, result) => {

  // })
  // //////////////----VERIFICATION----//////////////////////////////////////

  if (!req.body.login.match(/^([a-zA-Z0-9]+)$/)) {
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
  console.log(hash.bgGreen.white.bold.underline)

  MongoClient.connect('mongodb://localhost/matcha', (error, db) => {
    if (error) return console.log(error)

    console.log("Connecté à la base de données 'matcha'")

    db.collection('Users').find().toArray((error, results) => {
      db.close()
      if (error) {
        return res.json({
          err: "erreur d'injection"
        })
      }

      if (results.length !== 1) {
        let tab = {
          _id: uuid(),
          pseudo: req.body.login,
          sexe: req.body.sexe,
          to_match: req.body.to_match,
          date: req.body.date,
          passwd: hash
        }
        db.collection('Users').insert(tab, null, (error, result) => {
          db.close()
          if (error) {
            return res.json({
              err: "erreur d'injection"
            })
          }

          // console.log(result)
        })
      } else {
        db.close()
        return res.json({
          message: 'utilisateur deja present'
        })
      }
      db.close()
      return res.json({
        message: 'utilisateur enregistrer'
      })
    })
  })
}
