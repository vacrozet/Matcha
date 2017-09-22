const db = require('../../../db.js')

module.exports = (req, res) => {
  if (req.params.tag === undefined || req.params.tag !== '') {
    db.get().then((db) => {
      db.collection('Users').find({ login: req.user.login }).toArray((err, result) => {
        if (err) {
          res.status(500)
          return res.json({
            error: 'Internal server error'
          })
        }
        var capteur = false
        result[0].tag.forEach((element) => {
          if (element === req.params.tag) {
            capteur = true
          }
        })
        if (capteur === true) {
          db.collection('Users').updateOne({login: req.user.login}, {$pull: {tag: req.params.tag}})
          return res.json({
            success: 'OK',
            message: 'Tag Deleted'
          })
        } else {
          return res.json({
            success: 'KO',
            message: 'tag not deleted'
          })
        }
      })
    })
  }
}
