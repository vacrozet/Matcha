const db = require('../../db.js')
const rad = require('Math')
// VERIFIER CONST RAD ////////////

function error (status, res, success, message) {
  res.status(status)
  return res.json({
    success: success,
    message: message
  })
}
function distance () {
  var R = 6378137 // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat)
  var dLong = rad(p2.lng - p1.lng)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d
}

module.exports = (req, res) => {
  if (req.user.toMatch === 'Homme' || req.user.toMatch === 'Femme') {
    db.get().then((db) => {
      db.collection('Users').find({to_match: {$in: [req.user.sexe, 'All']}, sexe: req.user.toMatch}).toArray((err, result) => {
        if (err) return error(404, res, false, 'Collection not found')
        // //////////// ENLEVER LES UTILISATEURS QUI ONT BLOCKER LE PROFILE ///////////////////////
        // console.log(result)
        if (result) {
          // let blocklist
          // result.map((e) => {
          //     console.log(e.login)
          //   if (e.login === req.user.login) {
          //     blocklist = e.block
          //   }
          // })
          var tab = result.filter(result => {
            return result.login !== req.user.login
          })
          // var moi = result.filter(result => {
          //   return result.login === req.user.login
          // })
          // console.log(moi)
          // moi = moi[0].block
          // // var tabfilter = tab.filter(tab => {
          //   if (moi[0].block.indexOf(req.user.login) !== -1) {
          //     return tab
          //   }
          // })
          // console.log(tabfilter)
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
      db.collection('Users').find({to_match: req.user.sexe}).toArray((err2, result) => {
        if (err2) return error(404, res, false, 'Collection not found')
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
