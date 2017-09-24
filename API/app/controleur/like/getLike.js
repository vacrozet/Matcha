const db = require('../../db.js')
const functionUser = require('../FonctionUser.js')

module.exports = (req, res) => {
  console.log(req.body.like)
  let _id = functionUser.getIdByToken(req.body.token)
  if (_id.length !== 0) {
    db.get().then((db) => {
      db.collection('Like_User').find({_id: _id}).toArray((error, result) => {
        if (error) {
          res.status(500)
          return res.json({
            error: 'Internal server error'
          })
        }
        if (result.length === 1) {
          result[0].forEach((element) => {
            if (element === req.body.user) {
              return res.json({
                success: true,
                message: 'like présent'
              })
            }
          }, this)
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
