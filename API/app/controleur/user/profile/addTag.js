const db = require('../../../db.js')

module.exports = (req, res) => {
  if (req.body.tag === undefined || req.body.tag !== '') {
    db.get().then((db) => {
      db.collection('Users').find({ login: req.user.login }).toArray((err, result) => {
        if (err) {
          res.status(500)
          return res.json({
            error: 'Internal server error'
          })
        }
        console.log('lancer')
        if (result.length === 1) {
          console.log(result[0].tag.length)
        }
      })
    })
  }
}
