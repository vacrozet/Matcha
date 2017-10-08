const db = require('../../db.js')

function erreur (res, status, bool, message) {
  res.status(status)
  return res.json({
    success: bool,
    message: message
  })
}

function renvoi (res, status, bool, message, result, nb, idConv) {
  res.status(status)
  return res.json({
    success: bool,
    message: message,
    result: result,
    present: nb,
    idConv: idConv
  })
}

module.exports = (req, res) => {
  if (req.params.login !== '' && req.params.login !== undefined) {
    db.get().then((db) => {
      db.collection('Message_Users').find({login: req.user.login}).toArray((error, result) => {
        if (error) return erreur(res, 500, false, 'connexion server')
        if (result.length === 1) {
          let capteur = false
          result[0].conversation.forEach((element) => {
            if (element.login === req.params.login) {
              capteur = true
            }
          }, this)
          console.log(capteur)
          if (capteur === true) {
            let nb = false
            result[0].conversation.forEach((element) => {
              console.log(element)
              if (element.login === req.params.login) {
                capteur = element.message
              }
            }, this)
            console.log(capteur)
            db.collection('Conversations').find({_id: capteur}).toArray((err, results) => {
              if (err) return erreur(res, 500, false, 'connexion server')
              if (results.length === 1) {
                var tabAllConvers = false
                if (results[0].convers.length > 0) {
                  tabAllConvers = results[0].convers
                  nb = true
                  return renvoi(res, 200, true, 'user found', tabAllConvers, nb, capteur)
                }
                return renvoi(res, 200, true, 'Conversation any', tabAllConvers, nb, capteur)
              } else {
                return erreur(res, 404, false, 'tab not found')
              }
            })
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
