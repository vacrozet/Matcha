const db = require('../../db.js')

module.exports = (req, res) => {
  console.log('je passe ici')
  console.log(req.params.login)
  console.log(req.user.id)
  let _id = req.user.id
  if (_id !== undefined) {
    db.get().then((db) => {
      db.collection('Like_User').find({_id: _id}).toArray((error, result) => {
        if (error) {
          res.status(500)
          return res.json({
            error: 'Internal server error'
          })
        }
        console.log('je passe ici')
        if (result.length === 1) {
          result[0].forEach((element) => {
            if (element === req.params.login) {
              return res.json({
                success: true,
                message: 'like présent'
              })
            }
          }, this)
          console.log('je rentre la')
          return res.json({
            success: false,
            message: 'Like not found'
          })
        } else {
          res.status(404)
          return res.json({
            message: 'table User not found'
          })
        }
      })
    })
  }
}
