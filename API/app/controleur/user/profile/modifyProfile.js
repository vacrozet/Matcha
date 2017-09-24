const db = require('../../../db.js')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {
  db.get().then((db) => {
    db.collection('Users').find({ login: req.user.login }).toArray((err, result) => {
      if (err) {
        res.status(500)
        return res.json({
          error: 'Internal server error'
        })
      }
      if (typeof req.body.prenom === 'string' && req.body.prenom !== '' && req.body.prenom.length >= 3) {
        result[0].prenom = req.body.prenom
      }
      if (typeof req.body.nom === 'string' && req.body.nom !== '' && req.body.nom.length >= 3) {
        result[0].nom = req.body.nom
      }
      if (typeof req.body.mail === 'string' && req.body.mail !== '' && req.body.mail !== result[0].mail &&
      req.body.mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        result[0].mail = req.body.mail
      }
      if (typeof req.body.passwd === 'string' && bcrypt.compareSync(req.body.passwd, result[0].passwd) && req.body.passwd === req.body.rePasswd &&
      req.body.passwd !== '' && req.body.rePasswd !== '' && req.body.passwd.length >= 8 && req.body.rePasswd.length >= 8) {
        result[0].passwd = bcrypt.hashSync(req.body.passwd, 10)
      }
      if (typeof req.body.birthday === 'string' && req.body.birthday !== '' &&
      req.body.birthday.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) && result[0].date !== req.body.birthday) {
        result[0].date = req.body.birthday
      }
      if (typeof req.body.bio === 'string' && req.body.bio !== '' && req.body.bio !== result[0].bio) {
        result[0].bio = req.body.bio
      }
      if (typeof req.body.toSexe === 'string' && req.body.toSexe !== '' && req.body.toSexe !== result[0].to_match &&
      req.body.toSexe.match(/^(Homme|Femme|All)$/)) {
        result[0].to_match = req.body.toSexe
      }
      db.collection('Users').update({login: req.user.login}, {
        $set: {
          prenom: result[0].prenom,
          nom: result[0].nom,
          passwd: result[0].passwd,
          date: result[0].date,
          bio: result[0].bio,
          mail: result[0].mail,
          to_match: result[0].to_match
        }
      })
      return res.json({
        success: 'OK',
        message: 'Profil Update'
      })
    })
  })
}