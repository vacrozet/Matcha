const db = require('db.js')

module.exports = (role) => {
  return (req, res, next) => {
    var auth = req.get('Authorization')

    if (auth === undefined) {
      res.status(400)
      res.json({
        success: false,
        msg: 'Need Authorization in header'
      })
      return
    }
    auth = auth.split(' ')
    if (auth[0] !== 'Bearer' || auth[1].length !== 128 || auth.length !== 2) {
      res.status(400)
      res.json({
        success: false,
        msg: 'Wrong authorization header'
      })
    }
  }
/**
 * chercher le TOKEN
 */

}
