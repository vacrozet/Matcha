const db = require('../../db.js')

module.exports = (req, res) => {
  if (req.body.login !== '' && req.body.login !== '') {
    db.get().then((db) => {
      db.collection('Users').update({login: req.body.login}, {$set: {connected: true}
      }).then((res1) => {
        return res.json({
          success: true
        })
      })
    })
  }
}
