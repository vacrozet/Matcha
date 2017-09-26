const db = require('../../db.js')

module.exports = (req, res) => {
  if (req.user.toMatch === 'Homme' || req.user.toMatch === 'Femme') {
    db.get().then((db) => {
      db.collection('Users').find({to_match: {$in: [req.user.sexe, 'All']}, sexe: req.user.toMatch
      }).toArray((err, result) => {
        if (err) {
          res.status(404)
          return res.json({
            succes: false,
            message: 'Collection not found'
          })
        }
        // //////////// ENLEVER LES UTILISATEURS QUI ONT BLOCKER LE PROFILE ///////////////////////
        console.log(result)
        if (result) {
          var tab = result.filter(result => {
            return result.login !== req.user.login
          })
          result.forEach((tab) => {
            delete tab.passwd
            delete tab.tokens
            delete tab.mail
            delete tab.date
            delete tab.to_match
            delete tab.prenom
            delete tab.nom
          }, this)
          res.json({
            tab
          })
        }
      })
    })
  } else {
    db.get().then((db) => {
      db.collection('Users').find({to_match: req.user.sexe}).toArray((err, result) => {
        if (err) {
          res.status(404)
          return res.json({
            succes: false,
            message: 'Collection not found'
          })
        }
        // //////////// ENLEVER LES UTILISATEURS QUI ONT BLOCKER LE PROFILE ///////////////////////
        if (result) {
          var tab = result.filter(result => {
            return result.login !== req.user.login
          })
          result.forEach((tab) => {
            delete tab.passwd
            delete tab.tokens
            delete tab.mail
            delete tab.date
            delete tab.to_match
            delete tab.prenom
            delete tab.nom
          }, this)
          res.json({
            tab
          })
        }
      })
    })
  }
}
