const db = require('../../db.js')

module.exports = (req, res) => {
  var auth = req.get('Authorization').split(' ')
  // let nb
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
          Message: 'Internal server error'
        })
      }
      if (result.length === 0) {
        return res.json({
          Message: 'user not found'
        })
      }
      delete result[0].passwd
      delete result[0].tokens
      return res.json({
        result
      })
    })
  })
}
