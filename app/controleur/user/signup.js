const MongoClient = require('mongodb').MongoClient
const MongoObjectID = require('mongodb').ObjectID
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
  // //////////---- HASH PASSWORD BCRYPT -----/////
  var passwd = bcrypt.hashSync(req.body.passwd, 10)
  console.log(passwd.bgGreen.white.bold.underline)

  MongoClient.connect('mongodb://localhost/matcha', (error, db) => {
    if (error) {
      return res.json({
        message: 'erreur'
      })
    }
    console.log("Connecté à la base de données 'matcha'")
    db.collection('Users').find({login: 'vacrozet71'}).toArray((error, results) => {
      if (error) {
        db.close()
        return res.json({
          err: "erreur d'injection"
        })
      }
      console.log(results.length)

      results.forEach((obj) => {
        console.log(obj.login)
        console.log(obj.passwd)
      })
      console.log(results.login)
      db.close()
      return res.json({
        message: 'Connextion OK'
      })
    })
  })
}
