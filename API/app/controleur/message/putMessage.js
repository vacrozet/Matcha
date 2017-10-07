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
  console.log(req.user.login)
  console.log(req.body.message)
  if (req.body.message !== '') {
    db.get().then((db) => {
      console.log('arrive ici')
      let object = {}
      object.login = req.user.login
      object.message = req.body.message
      let object1 = {}
      object1.login = req.user.login
      object1.message = req.body.message
      console.log('object --->')
      console.log(object.login)
      console.log(object.message)
      db.collection('Message_Users').update({login: req.body.login},
        {
          conversation: [
            {login: req.user.login},
            {
              message: {object}
            }}
          ]
        })
      db.collection('Message_Users').update({login: req.body.login},
        {
          $push: {
            conversation: {
              login: req.user.login,
              message: {object1}
            }
          }
        }).then((res1) => {
          db.collection('Message_Users').find({login: req.user.login}).toArray((err, result) => {
            if (err) return erreur(res, 500, false, 'connexion serveur')
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
                    console.log(element.message)
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
        }).catch((err1) => {
          console.log(err1)
        })
    })
  } else {

  }
}
