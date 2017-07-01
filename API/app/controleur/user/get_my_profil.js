const db = require('../../db.js')

module.exports = (req, res) => {
  var auth = req.get('Authorization').split(' ')

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
      if (result.length === 0) {
        return res.json({
          Message: 'utilisateur not found'
        })
      } else {
        console.log(result.login)
        const profil = {
          login: result.login,
          sexe: result.sexe,
          to_match: result.to_match,
          date: result.date
        }
        console.log(profil)
        return res.json({
          login: profil.login
        })
      }
    })
  })
}
