const db = require('../../db.js')
const moment = require('moment')

function lastConnection (time) {
  time = Math.round(time / 1000)
  time = moment.unix(time).startOf().fromNow()
  return time
}

module.exports = (req, res) => {
  var auth = req.get('Authorization').split(' ')
  db.get().then((db) => {
    db.collection('Users').find({
      tokens: { // tokens
        $elemMatch: { // each first array
          token: auth[1]
        }
      }
    }).toArray((err, result) => {
      if (err) {
        res.status(500)
        return res.json({
          Message: 'Internal server error'
        })
      }
      if (result.length === 0) {
        return res.json({
          Message: 'user not found'
        })
      }
      db.collection('Users').update({login: req.user.login},
        {
          $set: {
            newNotification: false
          }
        }).then((res2) => {
          delete result[0].passwd
          delete result[0].tokens
          result[0].notification.forEach((element) => {
            element[0] = lastConnection(element[0])
          }, this)
          return res.json({
            result
          })
        }).catch((err2) => {
          console.log(err2)
        })
    })
  })
}
