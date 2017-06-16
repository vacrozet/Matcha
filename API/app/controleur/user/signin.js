const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {
  // //////////////----VERIFICATION----//////////////////////////////////////

  if (!req.body.login.match(/^([a-zA-Z0-9]+)$/)) {
    return res.json({
      message: 'login incorrect'
    })
  }

  MongoClient.connect('mongodb://localhost/matcha', (error, db) => {
    if (error) {
      return res.json({
        message: 'erreur'
      })
    }
    console.log("Connecté à la base de données 'matcha'")
    db.collection('Users').find({login: req.body.login}).toArray((error, results) => {
      if (error) {
        db.close()
        return res.json({
          err: "erreur d'injection"
        })
      }
      if (results.length === 1) {
        results.forEach((obj) => {
          if (req.body.login === obj.login && (bcrypt.compareSync(req.body.passwd, obj.passwd) === true)) { // true)
            db.close()
            return res.json({
              message: 'login et passwd ok --- ENJOY !!'
            })
          }
        })
      } else {
        db.close()
        return res.json({
          message: 'User or Passwd incorrect'
        })
      }
    })
  })
}
