const db = require('../../db.js')

module.exports = (req, res) => {
  console.log(req.body.login)
  console.log(req.user.id)
  let capteur
  if (req.user.id.length !== 0) {
    db.get().then((db) => {
      db.collection('Like_User').find({_id: req.user.id}).toArray((error, result) => {
        if (error) {
          res.status(500)
          return res.json({
            error: 'Internal server error'
          })
        }
        if (result.length === 1) {
          result[0].login.forEach((element) => {
            console.log(element)
            if (element === req.body.login) {
              capteur = true
            }
          }, this)
          console.log(capteur)
          if (capteur === true) {
            return res.json({
              success: false,
              message: 'like deja présent'
            })
          } else {
            console.log('jarrive ici')
            db.collection('Like_User').updateOne({_id: req.user.id}, {$push:
            {
              login: req.body.login
            }
            }).then((res) => {
              return res.json({
                success: true,
                message: 'like inseré'
              })
            }).catch((err) => {
              console.log(err)
            })
          }
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
