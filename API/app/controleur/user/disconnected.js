const db = require('../../db.js')

module.exports = (req, res) => {
  if (req.body.login !== '' && req.body.token !== '') {
    let date = Date.now()
    db.get().then((db) => {
      db.collection('Users').update({login: req.body.login}, {$set: {connected: date}
      }).then((res1) => {
        return res.json({
          success: true
        })
      })
    })
  }
}
