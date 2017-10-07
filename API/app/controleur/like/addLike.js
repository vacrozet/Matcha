const db = require('../../db.js')
const uuid = require('uuid')

function ftError (nb, res, success, message) {
  res.status(nb)
  return res.json({
    success: success,
    message: message
  })
}

function erreur (res) {
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
                if (result[0].popularite <= 99) {
                  if (result[0].popularite <= 98) {
                    result[0].popularite = parseInt(result[0].popularite + 2)
                  } else {
                    result[0].popularite = 100
                  }
                }
                if (result[0].like.length > 0) {
                  let present
                  result[0].like.forEach((element) => {
                    if (element === req.user.login) {
                      present = true
                    }
                  }, this)
                  if (present === true) {
                    if (result[0].popularite <= 99) {
                      if (result[0].popularite <= 90) {
                        result[0].popularite = parseInt(result[0].popularite + 10)
                      } else {
                        result[0].popularite = 100
                      }
                    }
                    let noti = []
                    noti.push(Date.now())
                    noti.push(`Vous avez matche avec ${req.body.login}`)
                    db.collection('Users').update({_id: req.user.id},
                      {
                        $push: {
                          match: req.body.login,
                          notification: noti
                        },
                        $set: {
                          popularite: result[0].popularite,
                          newNotification: true
                        }
                      }).then((res2) => {
                        if (!res2.result.n === 1) return erreur(res2)
                        let noti1 = []
                        noti1.push(Date.now())
                        noti1.push(`Vous avez matche avec ${req.user.login}`)
                        db.collection('Users').find({login: req.body.login}).toArray((error1, result1) => {
                          if (error1) return ftError(500, res, false, 'Internal connexion server1')
                          if (result1[0].popularite <= 99) {
                            if (result1[0].popularite <= 88) {
                              result1[0].popularite = parseInt(result1[0].popularite + 12)
                            } else {
                              result1[0].popularite = 100
                            }
                          }
                          db.collection('Users').update({login: req.body.login},
                            {
                              $push: {
                                match: req.user.login,
                                notification: noti1
                              },
                              $set: {
                                popularite: result1[0].popularite,
                                newNotification: true
                              }
                            }).then((res3) => {
                              if (!res3.result.n === 1) return erreur(500, res3, false, res3)
                              let id = uuid()
                              let chat = {}
                              chat.login = req.body.login
                              chat.lastmessage = ''
                              chat.message = id
                              db.collection('Message_Users').update({login: req.user.login},
                                {
                                  $push: {
                                    chat: req.body.login,
                                    conversation: chat
                                  }
                                })
                              let chat1 = {}
                              chat1.login = req.user.login
                              chat1.lastMessage = ''
                              chat1.con = id
                              db.collection('Message_Users').update({login: req.body.login},
                                {
                                  $push: {
                                    chat: req.user.login,
                                    conversation: chat1
                                  }
                                })
                              let tab = {
                                _id: id,
                                convers: []
                              }
                              db.collection('Conversations').insert(tab, null)
                              return res.json({
                                addlike: true,
                                match: true,
                                popularite: result1[0].popularite,
                                message: 'match enregistrer dans les deux tables'
                              })
                            }).catch((err3) => {
                              console.log(err3)
                            })
                        })
                      }).catch((err2) => {
                        return res.json({
                          success: 'KO',
                          message: 'login not insert to tab match of likeur',
                          other: err2
                        })
                      })
                  } else {
                    let noti = []
                    noti.push(Date.now())
                    noti.push(`${req.user.login} a like votre profil`)
                    db.collection('Users').update({login: req.body.login},
                      {
                        $set: {
                          popularite: result[0].popularite,
                          newNotification: true
                        },
                        $push: {
                          notification: noti
                        }
                      }).then((res4) => {
                        return res.json({
                          addlike: true,
                          message: 'like inseree et pas present dans l autre user',
                          popularite: result[0].popularite
                        })
                      }).catch((err4) => {
                        return res.json({
                          addlike: false,
                          message: 'requete mal envoye'
                        })
                      })
                  }
                } else {
                  let noti = []
                  noti.push(Date.now())
                  noti.push(`${req.user.login} a like votre profil`)
                  db.collection('Users').update({login: req.body.login}, {
                    $set: {
                      popularite: result[0].popularite,
                      newNotification: true
                    },
                    $push: {
                      notification: noti
                    }
                  }).then((res4) => {
                    return res.json({
                      addlike: true,
                      message: 'like inseree et pop up',
                      popularite: result[0].popularite
                    })
                  }).catch((err4) => {
                    return res.json({
                      addlike: false,
                      message: 'requete mal envoye'
                    })
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
