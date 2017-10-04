const db = require('../../db.js')

function erreur (res, status, success, message) {
  res.status(res)
  return res.json({
    success: success,
    message: message
  })
}
function downLikePop (popularite) {
  if (popularite > 0) {
    if (popularite >= 2) {
      popularite = parseInt(popularite - 2)
    } else {
      popularite = 0
    }
  }
  console.log(popularite)
  return popularite
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
  console.log(popularite)
  return popularite
}

module.exports = (req, res) => {
  if (req.params.login !== '') {
    db.get().then((db) => {
      db.collection('Users').find({_id: req.user.id}).toArray((err, result) => {
        if (err) return erreur(res, 500, 'KO', 'connexion impossible')
        if (result[0].like.length > 0) {
          result[0].popularite = downLikePop(result[0].popularite)
          let capteur
          let capteur1
          result[0].like.forEach((element) => {
            if (element === req.params.login) {
              capteur = true
            }
          }, this)
          result[0].match.forEach((elem) => {
            if (elem === req.params.login) {
              capteur1 = true
            }
          }, this)
          if (capteur === true) {
            db.collection('Users').update({_id: req.user.id},
              {
                $pull: {
                  like: {$in: [req.params.login]}
                },
                $set: {popularite: result[0].popularite}
              }
            ).then((res1) => {
              if (res1.result.n === 1) {
                if (capteur1 === true) {
                  result[0].popularite = downMatchPop(result[0].popularite, false)
                  db.collection('Users').update({_id: req.user.id},
                    {
                      $pull: {
                        match: {$in: [req.params.login]}
                      },
                      $set: {popularite: result[0].popularite}
                    }
                  ).then((res2) => {
                    if (res2.result.n === 1) {
                      console.log('je passe jusque ici')
                      db.collection('Users').find({login: req.params.login}).toArray((error1, result1) => {
                        result1[0].popularite = downMatchPop(result1[0].popularite, true)
                        db.collection('Users').update({login: req.params.login},
                          {
                            $pull: {
                              match: {$in: [req.user.login]}
                            },
                            $set: {popularite: result1[0].popularite}
                          }
                        ).then((res3) => {
                          if (res3.result.n === 1) {
                            return res.json({
                              unlike: true,
                              message: 'like and match supprimer',
                              popularite: result1[0].popularite
                            })
                          } else {
                            return erreur(res, 404, 'KO', 'derniere requete abord')
                          }
                        }).catch((err3) => {
                          return erreur(res, 500, false, 'erreur connexion')
                        })
                      })
                    } else {
                      return erreur(res, 500, false, 'match non supprimer')
                    }
                  }).catch((err2) => {
                    return erreur(res, 500, false, 'erreur connexion')
                  })
                } else {
                  return res.json({
                    unlike: true,
                    message: 'like supprimer',
                    popularite: result[0].popularite
                  })
                }
              } else {
                return erreur(res, 202, false, 'like non supprimer')
              }
            }).catch((err1) => {
              return erreur(res, 500, false, 'crach')
            })
          } else {
            return erreur(res, 202, 'KO', 'aucun like du otherUser trouver dans la table')
          }
        } else {
          return erreur(res, 202, 'KO', 'Aucun like dans la table')
        }
      })
    })
  }
}
