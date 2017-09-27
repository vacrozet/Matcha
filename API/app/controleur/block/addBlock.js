const db = require('../../db.js')

function erreur (res) {
  return res.json({
    success: 'KO',
    message: 'test'
  })
}

module.exports = (req, res) => {
  if (req.user.login !== '') {
    db.get().then((db) => {
      db.collection('Users').find({login: req.body.login}).toArray((err, result) => {
        if (err) {
          res.status(500)
          return res.json({
            message: 'Internal Server Erreur'
          })
        }
        if (result.length === 1 && result[0].login !== req.user.login) {
          let capteur = false
          result[0].block.forEach((element) => {
            if (element === req.user.login) {
              capteur = true
            }
          }, this)
          if (capteur === false) {
            db.collection('Users').update({login: req.body.login},
              {$push: {block: req.user.login}}).then((res1) => {
                if (!res1.result.n === 1) return erreur(res1)
                return res.json({
                  block: true,
                  message: 'User blocker'
                })
              }).catch((err1) => {
                console.log(err1)
                return res.json({
                  success: false,
                  message: 'err writing database'
                })
              })
          } else {
            return res.json({
              success: false,
              message: 'User already block'
            })
          }
        } else {
          return res.json({
            success: false,
            message: 'User not found'
          })
        }
      })
    })
  }
}
