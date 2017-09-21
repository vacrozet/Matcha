const db = require('../../../db.js')
const bcrypt = require('bcryptjs')

module.exports = (req, res) => {
  console.log(req.body.prenom)
  console.log(req.body.nom)
  console.log(req.body.mail)
  console.log(req.body.passwd)
  console.log(req.body.rePasswd)
  console.log(req.body.birthday)
  console.log(req.body.bio)
  db.get().then((db) => {
    db.collection('Users').find({ login: req.user.login }).toArray((err, result) => {
      if (err) {
        res.status(500)
        return res.json({
          error: 'Internal server error'
        })
      }
      var prenom = result[0].prenom
      var nom = result[0].nom
      var mail = result[0].mail
      var passwd = result[0].passwd
      var date = result[0].date
      var bio = result[0].bio
      var toMatch = result[0].toMatch
      if (req.body.prenom !== '' && req.body.prenom > 4 && prenom !== req.body.prenom) {
        prenom = req.body.prenom
      }
      if (req.body.nom !== '' && req.body.nom > 4 && nom !== req.body.nom) {
        nom = req.body.nom
      }
      // /////////---- VERIFE  MAIL  ----/////
      if (req.body.mail !== '' && mail !== req.body.mail) {
        mail = req.body.mail
      }
      if (bcrypt.compareSync(req.body.passwd, passwd) && req.body.passwd === req.body.rePasswd &&
      req.body.passwd !== '' && req.body.rePasswd !== '') {
        passwd = bcrypt.hashSync(req.body.passwd, 10)
      }
      if (req.body.birthday !== '' && req.body.birthday.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) && date !== req.body.birthday) {
        date = req.body.birthday
      }
      if (req.body.bio !== '' && req.body.bio !== bio) {
        bio = req.body.bio
      }
      if (req.body.toMatch !== toMatch && req.body.toMatch.match(/^(Homme|Femme|All)$/)) {
        toMatch = req.body.toMatch
      }
      db.collection('Users').update({login: req.user.login}, {
        $set: {
          prenom: prenom,
          nom: nom,
          passwd: passwd,
          date: date,
          bio: bio,
          mail: mail,
          to_match: toMatch
        }
      })
      return res.json({
        success: 'OK',
        message: 'tag ajouter'
      })
    })

      // if (prenom !== req.body.prenom) {
      //   prenom = req.body.prenom
      // }
      // if (nom !== req.body.nom) {
      //   nom = req.body.nom
      // }
      // if (mail !== req.body.mail) {
      //   mail = req.body.mail
      // }
      // if (mail !== req.body.mail) {
      //   mail = req.body.mail
      // }

//         var capteur = false
//         result[0].tag.forEach((element) => {
//           if (element === req.params.tag) {
//             capteur = true
//           }
//         })
//         if (capteur === true) {
//           db.collection('Users').updateOne({login: req.user.login}, {$pull: {tag: req.params.tag}})
//           console.log('tag supprime')
//           return res.json({
//             success: 'OK',
//             message: 'Tag Deleted'
//           })
//         } else {
//           return res.json({
//             success: 'KO',
//             message: 'tag not deleted'
//           })
//         }
//       })
  })
}
