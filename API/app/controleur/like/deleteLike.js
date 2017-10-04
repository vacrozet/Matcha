const db = require('../../db.js')

function erreur (res, status, success, message) {
  res.status(res)
  return res.json({
    success: success,
    message: message
  })
}
function downMatchPop (popularite, capteur) {
  if (capteur === true) {
    if (popularite > 0) {
      if (popularite >= 12) {
        popularite = parseInt(popularite - 12)
      } else {
        popularite = 0
      }
    }
  } else {
    if (popularite > 0) {
      if (popularite >= 10) {
        popularite = parseInt(popularite - 10)
      } else {
        popularite = 0
      }
    }
  }
  return popularite
}

function downLikePop (popularite) {
  if (popularite > 0) {
    if (popularite >= 2) {
      popularite = parseInt(popularite - 2)
    } else {
      popularite = 0
    }
  }
  return popularite
}

module.exports = (req, res) => {
  if (req.params.login !== '') {
    db.get().then((db) => {
      db.collection('Users').find({login: req.params.login}).toArray((err, result) => {
        if (err) return erreur(res, 500, 'KO', 'connexion impossible')
        let capteur = false
        result[0].match.forEach((element) => {
          if (element === req.user.login) {
            result[0].popularite = downMatchPop(result[0].popularite, true)
            capteur = true
          }
        }, this)
        let populariteUser = downMatchPop(req.user.popularite, false)
        if (capteur === true) {
          db.collection('Users').update({login: req.params.login},
            {
              $pull: {
                match: {$in: [req.user.login]}
              },
              $set: {popularite: result[0].popularite}
            }).then((res3) => {
              db.collection('Users').update({login: req.user.login},
                {
                  $pull: {
                    match: {$in: [req.params.login]},
                    like: {$in: [req.params.login]}
                  },
                  $set: {popularite: populariteUser}
                }).then((res4) => {
                  return res.json({
                    unlike: true,
                    message: 'match et like supprimer',
                    popularite: result[0].popularite
                  })
                })
            }).catch((err3) => {
              erreur(res, 404, 'KO', 'echec de la request')
            })
        } else {
          db.collection('Users').update({login: req.user.login},
            {
              $pull: {
                like: {$in: [req.params.login]}
              }
            }).then((res1) => {
              result[0].popularite = downLikePop(result[0].popularite)
              db.collection('Users').update({login: req.params.login},
                {
                  $set: {popularite: result[0].popularite}
                }).then((res2) => {
                  return res.json({
                    unlike: true,
                    message: 'unlike user ok',
                    popularite: result[0].popularite
                  })
                }).catch((err2) => {
                  erreur(res, 404, 'KO', 'echec de la request')
                })
            }).catch((err1) => {
              erreur(res, 404, 'KO', 'echec de la request')
            })
        }
      })
    })
  }
}
