const db = require('../../../db.js')

module.exports = (req, res) => {
  if (req.body.tag === undefined || req.body.tag !== '') {
    var str = req.body.tag.split(' ')
    if (str.length === 1 && req.body.tag.length > 1 && req.body.tag[0] !== '#') {
      db.get().then((db) => {
        db.collection('Users').find({ login: req.user.login }).toArray((err, result) => {
          if (err) {
            res.status(500)
            return res.json({
              error: 'Internal server error'
            })
          }
          if (result[0].tag.length === 0) {
            db.collection('Users').updateOne({login: req.user.login}, {$push: {tag: req.body.tag}})
            return res.json({
              message: 'tag ajouter'
            })
          } else {
            var capteur = false
            result[0].tag.forEach((element) => {
              if (element === req.body.tag) {
                capteur = true
              }
            }, this)
            if (capteur === true) {
              res.json({
                message: 'tag deja present'
              })
            } else {
              db.collection('Users').updateOne({login: req.user.login}, {$push: {tag: req.body.tag}})
              return res.json({
                success: 'OK',
                message: 'tag ajouter'
              })
            }
          }
        })
      })
    } else {
      return res.json({
        success: 'KO',
        message: 'Tag pas bien formater'
      })
    }
  }
}