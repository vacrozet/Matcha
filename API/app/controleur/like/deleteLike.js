const db = require('../../db.js')

module.exports = (req, res) => {
  if (req.params.login !== '') {
    db.get().then((db) => {
      db.collection('Users').find({_id: req.user.id}).toArray((err, result) => {
        if (err) {
          res.status(500)
          return res.json({
            success: 'KO',
            message: 'connexion impossible'
          })
        }
        if (result[0].like.length > 0) {
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
            db.collection('Users').update({_id: req.user.id}, {$pull: {like: {$in: [req.params.login]}}}).then((res1) => {
              if (res1.result.n === 1) {
                if (capteur1 === true) {
                  db.collection('Users').update({_id: req.user.id}, {$pull: {match: {$in: [req.params.login]}}}).then((res2) => {
                    if (res2.result.n === 1) {
                      db.collection('Users').update({login: req.params.login}, {$pull: {match: {$in: [req.user.login]}}}).then((res3) => {
                        if (res3.result.n === 1) {
                          return res.json({
                            unlike: true,
                            message: 'like and match supprimer'
                          })
                        } else {
                          return res.json({
                            success: 'KO',
                            message: 'derniere requete abord'
                          })
                        }
                      }).catch((err3) => {
                        return res.json({
                          success: false,
                          message: 'erreur connexion'
                        })
                      })
                    } else {
                      res.status(500)
                      return res.json({
                        success: false,
                        message: 'match non supprimer'
                      })
                    }
                  }).catch((err2) => {
                    return res.json({
                      success: false,
                      message: 'erreur connexion'
                    })
                  })
                } else {
                  return res.json({
                    unlike: true,
                    message: 'like supprimer'
                  })
                }
              } else {
                return res.json({
                  success: false,
                  message: 'like non supprimer'
                })
              }
            }).catch((err1) => {
              return res.json({
                success: false,
                message: 'crach'
              })
            })
          } else {
            return res.json({
              success: 'KO',
              message: 'aucun like du otherUser trouver dans la table'
            })
          }
        } else {
          return res.json({
            success: 'KO',
            message: 'Aucun like dans la table'
          })
        }
      })
    })
  }
}
