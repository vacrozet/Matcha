const db = require('../../db.js')
const bcrypt = require('bcryptjs')

function renvoi (res, choice, message) {
  return res.json({
    success: choice,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.body.newpasswd !== '' && req.body.newpasswd1 !== '' && req.body.hash !== '' && req.body.newpasswd === req.body.newpasswd1) {
    db.get().then((db) => {
      db.collection('Users').find({hash: req.body.hash}).toArray((err, result) => {
        if (err) {
          res.status(500)
          return res.josn({
            message: 'Internal Server connection'
          })
        }
        if (result.length !== 1) renvoi(res, false, 'contenu du tableaux de reception')
        var hash = bcrypt.hashSync(req.body.newpasswd, 10)
        db.collection('Users').update({login: result[0].login}, {
          $set: {
            passwd: hash,
            actif: true,
            hash: ''
          }
        })
        renvoi(res, true, 'Passwd changer')
      })
    })
  } else {
    renvoi(res, false, 'champs non remplie ou mot de passe pas identique')
  }
}
