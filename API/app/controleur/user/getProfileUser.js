const db = require('../../db.js')

module.exports = (req, res) => {
  if (req.params.login !== '' && req.params.login !== undefined) {
    // console.log(req.params.login)
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
            // console.log(result)
            return res.json({
              result
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
