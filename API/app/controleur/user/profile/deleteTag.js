const db = require('../../../db.js')

module.exports = (req, res) => {
  console.log(req)
  if (req.params.tag === undefined || req.params.tag !== '') {
    console.log(req.params.tag)
    db.get().then((db) => {
      db.collection('Users').find({ login: req.user.login }).toArray((err, result) => {
        if (err) {
          res.status(500)
          return res.json({
            error: 'Internal server error'
          })
        }
        console.log(req.params.tag)
        result[0].tag.forEach((element) => {
          if (req.params.tag === element) {
            db.collection('Users').updateOne({login: req.user.login}, {$pull: {tag: req.params.tag}})
            console.log('tag supprime')
            return res.json({
              message: 'Tag Deleted'
            })
          }
        })
        // if (result[0].tag.length === 0) {
        //   db.collection('Users').updateOne({login: req.user.login}, {$push: {tag: req.params.tag}})
        //   return res.json({
        //     message: 'tag ajouter'
        //   })
        // } else {
        //   var capteur = false
        //   result[0].tag.forEach((element) => {
        //     if (element === req.params.tag) {
        //       capteur = true
        //     }
        //   }, this)
        //   if (capteur === true) {
        //     res.json({
        //       message: 'tag deja present'
        //     })
        //   } else {
        //     db.collection('Users').updateOne({login: req.user.login}, {$push: {tag: req.params.tag}})
        //     return res.json({
        //       message: 'tag ajouter'
        //     })
        //   }
        // }
      })
    })
  }
}
