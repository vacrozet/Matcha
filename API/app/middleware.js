const db = require('./db.js')

/**
 * Header auth : [Authorization : 'Bearer [tokens]']
 */

module.exports = (role) => {
  return (req, res, next) => {
    console.log('je passe la')
    var auth = req.get('Authorization')

    if (auth === undefined) {
      res.status(400)
      res.json({
        success: false,
        msg: 'Need Authorization in header'
      })
      return
    }
    console.log('je passe ici')
    auth = auth.split(' ')
    if (auth[0] !== 'Bearer' || auth[1].length !== 128 || auth.length !== 2) {
      res.status(400)
      res.json({
        success: false,
        msg: 'Wrong authorization header'
      })
    }
    db.get().then((db) => {
      db.collection('Users').find({
        tokens: { // tokens
          $elemMatch: { // each first array
            $elemMatch: {
              token: auth[1]
            }
          }
        }
      })
      console.log('array filter')
    })
    return next
  }
}
