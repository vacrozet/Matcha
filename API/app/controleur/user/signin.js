const bcrypt = require('bcryptjs')
const db = require('../../db.js')

function genToken () {
  var str = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`
  var token = ''

  for (var count = 0; count < 128; count++) {
    token += str[Math.floor((Math.random() * str.length))]
  }
  return (token)
}

module.exports = (req, res) => {
  if (req.body.login === undefined || !req.body.login.match(/^([a-zA-Z0-9]+)$/)) {
    res.status(400)
    return res.json({
      message: 'login incorrect'
    })
  }

  db.get().then((db) => {
    db.collection('Users').find({login: req.body.login}).toArray((error, results) => {
      if (error) {
        res.status(500)
        return res.json({
          error: 'Internal server error'
        })
      }
      if (results.length === 1) {
        if (bcrypt.compareSync(req.body.passwd, results[0].passwd)) {
          let objToken = {}
          objToken.token = genToken()
          objToken.created_at = new Date().getTime()

          results[0].tokens.push(objToken)
          db.collection('Users').updateOne({login: req.body.login}, {$set: {tokens: results[0].tokens}})
          return res.json({
            success: true,
            token: objToken.token
          })
        } else {
          return res.json({
            error: 'Wrong password'
          })
        }
      } else {
        res.status(200)
        return res.json({
          error: 'User not found'
        })
      }
    })
  }).catch((err) => {
    console.log(err)
    res.status(500)
    return res.json({
      Message: 'Internal server error'
    })
  })
}
