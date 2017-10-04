const db = require('../../db.js')

function UpLikePop (popularite) {
  if (popularite < 100) {
    if (popularite <= 95) {
      popularite = parseInt(popularite + 5)
    } else {
      popularite = 100
    }
  }
  return popularite
}

module.exports = (req, res) => {
  if (req.params.login !== undefined && req.params.login !== '') {
    db.get().then((db) => {
      db.collection('Users').find({login: req.params.login}).toArray((err, result) => {
        if (err) {
          res.status(500)
          return res.json({
            message: 'Internal server connexion'
          })
        }
        if (result[0].login === req.params.login) {
          let capteur
          result[0].block.forEach((element) => {
            if (element === req.user.login) {
              capteur = true
            }
          }, this)
          if (capteur === true) {
            result[0].popularite = UpLikePop(result[0].popularite)
            db.collection('Users').update({login: req.params.login},
              {
                $pull: {
                  block: {$in: [req.user.login]}
                },
                $set: {popularite: result[0].popularite}
              }).then((res1) => {
                return res.json({
                  Unblock: true,
                  message: 'User UnBlock',
                  popularite: result[0].popularite
                })
              }).catch((err1) => {
                return res.json({
                  Unblock: false,
                  message: 'Not Unblock'
                })
              })
          } else {
            return res.json({
              Unblock: false,
              message: 'User not found in table',
              popularite: result[0].popularite
            })
          }
        } else {
          return res.json({
            Unblock: false,
            message: 'User not found',
            popularite: result[0].popularite
          })
        }
      })
    })
  }
}
