const db = require('../../db.js')

module.exports = (req, res) => {
  // console.log('je passe ici')
  // console.log(req.params.login)
  // console.log(req.user.id)
  let capteur
  if (req.user.id !== undefined) {
    db.get().then((db) => {
      db.collection('Like_User').find({_id: req.user.id}).toArray((error, result) => {
        if (error) {
          res.status(500)
          return res.json({
            error: 'Internal server error'
          })
        }
        console.log('ici')
        console.log(result[0].login)
        if (result[0].login.length >= 1) {
          result[0].login.forEach((element) => {
            if (element === req.params.login) {
              capteur = true
            }
          }, this)
          if (capteur === true) {
            return res.json({
              success: true,
              message: 'like présent'
            })
          }
          return res.json({
            success: false,
            message: 'Like not found'
          })
        } else {
          res.status(404)
          return res.json({
            message: 'table User not found'
          })
        }
      })
    })
  }
}
