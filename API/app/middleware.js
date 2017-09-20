const db = require('./db.js')

/**
 * Header auth : [Authorization : 'Bearer [tokens]']
 */

module.exports = (role) => {
  return (req, res, next) => {
    var auth = req.get('Authorization')
    if (auth === undefined) {
      res.status(400)
      return res.json({
        success: false,
        msg: 'Need Authorization in header'
      })
    }
    auth = auth.split(' ')
    if (auth[0] !== 'Bearer' || auth[1].length !== 128 || auth.length !== 2) {
      res.status(400)
      return res.json({
        success: false,
        msg: 'Wrong authorization header'
      })
    }
    db.get().then((db) => {
      db.collection('Users').find({
        tokens: { // tokens
          $elemMatch: { // each first array
            token: auth[1]
          }
        }
      }).toArray((err, result) => {
        if (err) {
          res.status(500)
          return res.json({
            error: 'Internal server error'
          })
        }
        if (result.length !== 1) {
          res.status(404)
          return res.json({
            message: 'User not connected'
          })
        } else {
          // console.log(result)
          req.user = {
            login: result[0].login,
            path_img: result[0].login,
            passwd: result[0].login
          }
          console.log('je passe la')
          next()
        }
      })
    })
  }
}
