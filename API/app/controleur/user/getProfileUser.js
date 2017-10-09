const db = require('../../db.js')
const moment = require('moment')

function lastConnection (time) {
  time = Math.round(time / 1000)
  time = moment.unix(time).startOf().fromNow()
  return time
}

module.exports = (req, res) => {
  if (req.params.login !== '' && req.params.login !== undefined) {
    db.get().then((db) => {
      db.collection('Users').find({login: req.params.login}).toArray((err, result) => {
        if (err) {
          res.status(500)
          return res.json({
            message: 'db not consulting'
          })
        }
        if (result) {
          if (result[0].login === req.params.login) {
            delete result[0].passwd
            delete result[0].mail
            delete result[0].tokens
            delete result[0]._id
            if (result[0].connected !== true) {
              result[0].connected = lastConnection(result[0].connected)
            }
            let noti = []
            noti.push(Date.now())
            noti.push(`${req.user.login} a visité votre profil`)
            db.collection('Users').update({login: req.params.login},
              {
                $push: {
                  notification: noti
                },
                $set: {
                  newNotification: true
                }
              }).then((res1) => {
                return res.json({
                  result,
                  user: req.user.login,
                  userView: req.user.login
                })
              })
          } else {
            return res.json({
              success: false,
              message: 'User Mot Found'
            })
          }
        }
      })
    })
  }
}
