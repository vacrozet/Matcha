const db = require('../../db.js')

function erreur (res, status, bool, message) {
  res.status(status)
  return res.json({
    success: bool,
    message: message
  })
}

function renvoi (res, status, bool, message, result, nb) {
  res.status(status)
  return res.json({
    success: bool,
    message: message,
    result: result,
    present: nb
  })
}

module.exports = (req, res) => {
  if (req.params.login !== '' && req.params.login !== undefined) {
    db.get().then((db) => {
      db.collection('Message_Users').find({login: req.user.login}).toArray((error, result) => {
        if (error) erreur(res, 500, false, 'connexion server')
        if (result.length === 1) {
          let capteur = false
          result[0].chat.forEach((element) => {
            if (element === req.params.login) {
              capteur = true
            }
          }, this)
          if (capteur === true) {
            let nb = false
            result[0].conversation.forEach((element) => {
              if (element.login === req.params.login) {
                capteur = element.message
              }
            }, this)
            if (capteur.length > 0) {
              nb = true
            }
            return renvoi(res, 200, true, 'user found', capteur, nb)
          } else {
            return erreur(res, 404, false, 'user not found in table chat')
          }
        } else {
          erreur(res, 404, false, 'user not found')
        }
      })
    })
  }
}
