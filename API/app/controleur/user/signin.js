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

function getAge (datestring) {
  var today = new Date()
  var birthDate = new Date(datestring)
  var age = today.getFullYear() - birthDate.getFullYear()
  var m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
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
          let hbirthday = getAge(results[0].date)
          results[0].tokens.push(objToken)
          db.collection('Users').updateOne({login: req.body.login}, {$set:
          {
            tokens: results[0].tokens,
            age: hbirthday,
            img: [
              `http://localhost:3001/picture/${objToken.token}/0`,
              `http://localhost:3001/picture/${objToken.token}/1`,
              `http://localhost:3001/picture/${objToken.token}/2`,
              `http://localhost:3001/picture/${objToken.token}/3`,
              `http://localhost:3001/picture/${objToken.token}/4`
            ]
          }
          })
          return res.json({
            success: true,
            token: objToken.token,
            login: results[0].login,
            sexe: results[0].sexe,
            age: hbirthday,
            img: [
              `http://localhost:3001/picture/${objToken.token}/0`,
              `http://localhost:3001/picture/${objToken.token}/1`,
              `http://localhost:3001/picture/${objToken.token}/2`,
              `http://localhost:3001/picture/${objToken.token}/3`,
              `http://localhost:3001/picture/${objToken.token}/4`
            ]
          })
        } else {
          res.status(200)
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
