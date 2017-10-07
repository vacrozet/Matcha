const db = require('../../db.js')

function erreur (res) {
  return res.json({
    success: 'KO',
    message: 'test'
  })
}
function error (res, status, success, message) {
  res.status(res)
  return res.json({
    success: success,
    message: message
  })
}

function downLikePop (popularite) {
  if (popularite > 0) {
    if (popularite >= 5) {
      popularite = parseInt(popularite - 5)
    } else {
      popularite = 0
    }
  }
  return popularite
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
          let matchPresent = false
          result[0].match.forEach((element) => {
            console.log(element)
            if (element === req.user.login) {
              matchPresent = true
            }
          }, this)
          if (matchPresent === true) {
            console.log('je rentre la')
            let pop = parseInt(result[0].popularite - 12)
            let popu = parseInt(req.user.popularite - 12)
            db.collection('Users').update({login: req.body.login},
              {
                $pull: {
                  match: {$in: [req.user.login]},
                  like: {$in: [req.user.login]}
                },
                $set: {popularite: pop},
                $push: {block: req.user.login}
              })
            db.collection('Users').update({login: req.user.login},
              {
                $pull: {
                  match: {$in: [req.body.login]},
                  like: {$in: [req.body.login]}
                },
                $set: {popularite: popu}
              })
            db.collection('Message_Users').find({login: req.body.login}).toArray((err1, results) => {
              if (err1) return error(res, 500, 'KO', 'connexion impossible')
              if (results) {
                let id = results[0]._id
                db.collection('Message_Users').update({login: req.user.login},
                  {
                    $pull: {
                      chat: {$in: [req.body.login]},
                      conversation: {login: req.body.login}
                    }
                  })
                db.collection('Message_Users').update({login: req.body.login},
                  {
                    $pull: {
                      chat: {$in: [req.user.login]},
                      conversation: {login: req.user.login}
                    }
                  })
                db.collection('Conversations').deleteMany({_id: id})
                return res.json({
                  success: true,
                  block: true,
                  message: 'User blocker',
                  popularite: pop
                })
              }
            })
          } else {
            let capteur = false
            result[0].block.forEach((element) => {
              if (element === req.user.login) {
                capteur = true
              }
            }, this)
            if (capteur === false) {
              result[0].popularite = downLikePop(result[0].popularite)
              db.collection('Users').update({login: req.body.login},
                {
                  $push: {block: req.user.login},
                  $set: {popularite: result[0].popularite}
                }).then((res1) => {
                  if (!res1.result.n === 1) return erreur(res1)
                  return res.json({
                    block: true,
                    message: 'User blocker',
                    popularite: result[0].popularite
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
                message: 'User already block',
                popularite: result[0].popularite
              })
            }
          }
        } else {
          console.log('user not found')
          return res.json({
            success: false,
            message: 'User not found'
          })
        }
      })
    })
  }
}
