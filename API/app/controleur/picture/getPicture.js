const fs = require('fs')
const validate = require('uuid-validate')
const path = require('path')
const functionUser = require('../user/FunctionUser.js')
const dir = path.dirname(require.main.filename) + '/pictures/'

function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    error: data
  })
}

module.exports = (req, res) => {
  // console.log(req.params.token)
  // console.log(req.params.id_pict)
  if (req.params.token === undefined) {
    return error(res, 'Bad token', 200)
  }
  if (req.params.token.match(/[a-zA-Z0-9]{128}/)) {
    functionUser.getIdByToken(req.params.token).then((user) => {
      // console.log(user)
      if (user.length === 0) return error(res, 'No user found', 200)
      if (!fs.existsSync(dir + user) ||
      !fs.existsSync(dir + user + '/' + req.params.id_pict + '.png')) {
        res.set('Content-Type', 'image/svg+xml')
        res.sendFile(path.dirname(require.main.filename) + '/avatar.svg')
      } else {
        res.set('Content-Type', 'image/png')
        res.sendFile(dir + user + '/' + req.params.id_pict + '.png')
      }
    }).catch((err) => {
      if (err) console.log(err)
      error(res, 'Internal server error', 500)
    })
  } else if (validate(req.params.token, 4)) {
    // console.log('ici')
    functionUser.getUserByToken(req.params.token).then((user) => {
      if (!fs.existsSync(dir + user[0].id) ||
      !fs.existsSync(dir + user[0].id + '/' + req.params.id + '.png')) {
        res.set('Content-Type', 'image/svg+xml')
        res.sendFile(path.dirname(require.main.filename) + '/avatar.svg')
      } else {
        res.set('Content-Type', 'image/png')
        res.sendFile(dir + user[0].id + '/' + req.params.id + '.png')
      }
    }).catch((err) => {
      if (err) console.log(err)
      error(res, 'Internal server error', 500)
    })
  } else {
    return error(res, 'Bad token', 200)
  }
}
