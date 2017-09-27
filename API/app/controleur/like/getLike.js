const db = require('../../db.js')

module.exports = (req, res) => {
  let capteur
  if (req.user.id !== undefined) {
    db.get().then((db) => {
      db.collection('Users').find({_id: req.user.id}).toArray((error, result) => {
        if (error) {
          res.status(500)
          return res.json({
            error: 'Internal server error'
          })
        }
        if (result[0].like.length > 0) {
          result[0].like.forEach((element) => {
            if (element === req.params.login) {
              capteur = true
            }
          }, this)
          if (capteur === true) {
            return res.json({
              like: true,
              message: 'like présent'
            })
          }
          return res.json({
            like: false,
            message: 'Like not found'
          })
        } else {
          return res.json({
            like: false,
            message: 'aucun like present dans la table'
          })
        }
      })
    })
  }
}
