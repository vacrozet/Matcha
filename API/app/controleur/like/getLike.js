const db = require('../../db.js')

module.exports = (req, res) => {
  // console.log('je passe ici')
  // console.log(`req.params.login: ${req.params.login}`)
  // console.log(`req.user.id: ${req.user.id}`)
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
        // console.log(`result[0].like.length: ${result[0].like.length}`)
        // console.log(result)
        if (result[0].like.length > 0) {
          result[0].like.forEach((element) => {
            if (element === req.params.login) {
              capteur = true
            }
          }, this)
          // console.log(capteur)
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
