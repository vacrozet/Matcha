const db = require('../../db.js')

module.exports = (req, res) => {
  console.log(req.user.login)
  console.log(req.body.message)
}
