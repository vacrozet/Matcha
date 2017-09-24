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
                success: false,
                message: 'like deja présent'
              })
            }
          }, this)
          db.collection('Like_User').insert(_id, {login: req.body.login}).then((res) => {
            res.status(200)
            return res.json({
              success: true,
              message: 'Like insert'
            })
          }).catch((err) => {
            res.status(404)
            return res.json({
              success: false,
              error: err,
              message: 'like not insert'
            })
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
