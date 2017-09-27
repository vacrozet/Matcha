const db = require('../../db.js')

module.exports = (req, res) => {
  if (req.params.login !== undefined && req.params.login !== '') {
    db.get().then((db) => {
      db.collection('Users').find({login: req.params.login}).toArray((err, result) => {
        if (err) {
          res.status(500)
          return res.json({
            message: 'Internal server connexion'
          })
        }
        if (result[0].login === req.params.login) {
          let capteur
          result[0].block.forEach((element) => {
            if (element === req.user.login) {
              capteur = true
            }
          }, this)
          if (capteur === true) {
            db.collection('Users').update({login: req.params.login}, {$pull: {block: {$in: [req.user.login]}}}).then((res1) => {
              return res.json({
                Unblock: true,
                message: 'User UnBlock'
              })
            }).catch((err1) => {
              res.json({
                Unblock: false,
                message: 'Not Unblock'
              })
            })
          } else {
            return res.json({
              Unblock: false,
              message: 'User not found in table'
            })
          }
        } else {
          return res.json({
            Unblock: false,
            message: 'User not found'
          })
        }
      })
    })
  }
}
