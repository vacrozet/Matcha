const db = require('../../db.js')

function renvoi (status, res, like, message) {
  res.status(status)
  return res.json({
    like: like,
    message: message
  })
}

module.exports = (req, res) => {
  let capteur
  if (req.user.id !== undefined) {
    db.get().then((db) => {
      db.collection('Users').find({_id: req.user.id}).toArray((error, result) => {
        if (error) return renvoi(500, res, false, 'Internal server error')
        if (result[0].like.length > 0) {
          result[0].like.forEach((element) => {
            if (element === req.params.login) {
              capteur = true
            }
          }, this)
          if (capteur === true) return renvoi(200, res, true, 'like présent')
          renvoi(202, res, false, 'Like not found')
        } else {
          renvoi(202, res, false, 'aucun like present dans la table')
        }
      })
    })
  }
}
