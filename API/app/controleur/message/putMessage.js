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
  if (req.body.message !== '' && req.body.idConv !== '') {
    db.get().then((db) => {
      let object = {}
      object.login = req.user.login
      object.message = req.body.message
      db.collection('Conversations').update({_id: req.body.idConv},
        {
          $push: {
            convers: object
          }
        }).then((res1) => {
          db.collection('Conversations').find({_id: req.body.idConv}).toArray((error, result) => {
            if (error) return erreur(res, 500, false, 'erreur requet db found')
            if (result.length === 1) {
              let Message = result[0].convers
              console.log(Message)
              return renvoi(res, 200, true, 'Result found', Message, true)
            } else { return erreur(res, 404, false, 'Result not found') }
          })
        }).catch((err1) => { return erreur(res, 404, false, 'Connexion Server') })
    })
  } else { return erreur(res, 404, false, 'Message Not Receved') }
}
