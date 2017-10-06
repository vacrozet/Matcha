const db = require('../../db.js')

function erreur (res, status, bool, message) {
  res.status(status)
  return res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.login !== '') {
    db.get().then((db) => {
      db.collection('Message_Users').find({login: req.user.login}).toArray((error, result) => {
        if (error) return erreur(res, 500, false, 'connexion server')
        console.log(result)
      })
    })
  }
}
