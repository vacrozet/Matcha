const db = require('../../db.js')
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
      console.log({to_match: {
        $in: [
          req.user.sexe,
          'All'
        ]
      },
        sexe: req.user.toMatch,
        popularite: {
          $gte: parseInt(req.query.populariteMin),
          $lte: parseInt(req.query.populariteMax)
        },
        age: {
          $gte: parseInt(req.query.AgeMin),
          $lte: parseInt(req.query.AgeMax)
        },
        $nin: {
          login: 'vacrozet'
        }
      })
      db.collection('Users').find({to_match: {
        $in: [
          req.user.sexe,
          'All'
        ]
      },
        sexe: req.user.toMatch,
        popularite: {
          $gte: parseInt(req.query.populariteMin),
          $lte: parseInt(req.query.populariteMax)
        },
        age: {
          $gte: parseInt(req.query.AgeMin),
          $lte: parseInt(req.query.AgeMax)
        },
        login: {
          $nin: req.user.block
        }
      }).toArray((err, result) => {
        if (err) return error(404, res, false, 'Collection not found')
        if (req.query.tag !== '' && typeof req.query.tag === 'string') {
          var newTab = []
          let tagsearch = req.query.tag.substring(1)
          for (var index = 0; index < result.length; index++) {
            var element = result[index]
            for (var i = 0; i < element.tag.length; i++) {
              if (element.tag[i] === tagsearch) {
                newTab.push(result[index])
              }
            }
          }
          result = newTab
        }
        if (result) {
          console.log(result)
          var tab = result.filter(result => {
            return result.login !== req.user.login
          })

          // //////////////////////// INCLURE LA DISTANCE /////////////////////////

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
