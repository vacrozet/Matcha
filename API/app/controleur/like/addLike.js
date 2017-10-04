const db = require('../../db.js')

function ftError (nb, res, success, message) {
  res.status(nb)
  return res.json({
    success: success,
    message: message
  })
}

function erreur (res) {
  console.log('je passe ici')
  return res.json({
    success: 'KO',
    message: 'test'
  })
}
module.exports = (req, res) => {
  let capteur = false
  if (req.user.id !== '') {
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
        if (capteur === true || result[0].completed === false) {
          if (capteur === true) return ftError(202, res, false, 'like deja present')
          if (result[0].completed === false) return ftError(202, res, false, 'Profile not completed')
        } else {
          db.collection('Users').update({_id: req.user.id},
            {$push: {like: req.body.login}}).then((res1) => {
              if (!res1.result.n === 1) return ftError(res1, false, 'Aucun changement effectuer sur la premiere table')
              db.collection('Users').find({login: req.body.login}).toArray((err, result) => {
                if (err) return ftError(500, res, false, 'Internal connexion server')
                if (result[0].popularite <= 98) {
                  result[0].popularite = parseInt(result[0].popularite + 2)
                  console.log(result[0].popularite)
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
                      if (!res2.result.n === 1) return erreur(res2)
                      db.collection('Users').update({login: req.body.login},
                        {$push: {match: req.user.login}}).then((res3) => {
                          if (!res3.result.n === 1) return erreur(500, res3, false, res3)
                          return res.json({
                            addlike: true,
                            match: true,
                            message: 'match enregistrer dans les deux tables'
                          })
                        }).catch((err3) => {
                          console.log(err3)
                        })
                    }).catch((err2) => {
                      return res.json({
                        success: 'KO',
                        message: 'login not insert to tab match of likeur',
                        other: err2
                      })
                    })
                  } else {
                    db.collection('Users').updateOne({login: req.body.login},
                      {
                        $set: {popularite: result[0].popularite}
                      }).then((res4) => {
                        return res.json({
                          addlike: true,
                          message: 'like inseree et pas present dans l autre user'
                        })
                      }).catch((err4) => {
                        return res.json({
                          addlike: false,
                          message: 'requete mal envoye'
                        })
                      })
                  }
                } else {
                  return res.json({
                    addlike: true,
                    message: 'like insert'
                  })
                }
              })
            }).catch((err1) => {
              console.log('err:')
              console.log(err1)
            })
        }
      })
    })
  }
}
