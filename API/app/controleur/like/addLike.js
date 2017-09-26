const db = require('../../db.js')

module.exports = (req, res) => {
  let capteur = false
  if (req.user.id.length !== 0) {
    db.get().then((db) => {
      db.collection('Users').find({login: req.user.login}).toArray((error, result) => {
        if (error) {
          res.status(500)
          return res.json({
            error: 'Internal server error'
          })
        }
        if (result[0].like.length > 0) {
          result[0].like.forEach((element) => {
            if (element === req.body.login) {
              capteur = true
            }
          }, this)
        }
        if (capteur === true) {
          return res.json({
            success: false,
            message: 'like deja présent'
          })
        } else {
          db.collection('Users').update({_id: req.user.id},
            {$push: {like: req.body.login}}).then((res1) => {
              if (res1.result.n === 1) {
                db.collection('Users').find({login: req.body.login}).toArray((err, result) => {
                  if (err) {
                    res.status(500)
                    return res.json({
                      message: 'Internal connexion server'
                    })
                  }
                  if (result[0].like.length > 0) {
                    let present
                    result[0].like.forEach((element) => {
                      if (element === req.user.login) {
                        present = true
                      }
                    }, this)
                    if (present === true) {
                      db.collection('Users').update({_id: req.user.id},
                      {$push: {match: req.body.login}}).then((res2) => {
                        if (res2.result.n === 1) {
                          db.collection('Users').update({login: req.body.login},
                          {$push: {match: req.user.login}}).then((res3) => {
                            if (res3.result.n === 1) {
                              return res.json({
                                like: true,
                                message: 'match enregistrer dans les deux tables'
                              })
                            }
                          }).catch((err3) => {
                            console.log(err)
                          })
                        } else {
                          res.statut(500)
                          return res.json({
                            message: 'impossible insert match for first login'
                          })
                        }
                      }).catch((err2) => {
                        return res.json({
                          success: 'KO',
                          message: 'login not insert to tab match of likeur',
                          other: err
                        })
                      })
                    } else {
                      return res.json({
                        like: true,
                        message: 'like insert'
                      })
                    }
                  }
                  return res.json({
                    like: true,
                    message: 'like insert and nothing array loginOther'
                  })
                })
              } else {
                res.status(500)
                return res.json({
                  success: 'like not insert'
                })
              }
            }).catch((err1) => {
              console.log('err:')
              console.log(err1)
            })
        }
      })
    })
  }
}
