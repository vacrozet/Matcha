const db = require('../../db.js')

module.exports = (req, res) => {
  db.get().then((db) => {
    db.collection('Users').find({login: req.user.login}).toArray((error, results) => {
      if (error) {
        res.status(500)
        return res.json({
          err: "erreur d'injection"
        })
      }
      results.array.forEach((element, index) => {
        delete results[index].passwd
        delete results[index].tokens
      }, this)
      return res.json({
        results
      })
    })
  })
}
