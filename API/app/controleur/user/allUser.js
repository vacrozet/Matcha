const db = require('../../db.js')
const moment = require('moment')

function error (status, res, success, message) {
  res.status(status)
  return res.json({
    success: success,
    message: message
  })
}
let rad = (x) => {
  return x * Math.PI / 180
}
function distance (p1Lat, p1Lng, p2Lat, p2Lng) {
  var R = 6378137
  var dLat = rad(p2Lat - p1Lat)
  var dLong = rad(p2Lng - p1Lng)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1Lat)) * Math.cos(rad(p2Lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d / 1000
}
function lastConnection (time) {
  time = Math.round(time / 1000)
  time = moment.unix(time).startOf().fromNow()
  return time
}

module.exports = (req, res) => {
  if (req.user.toMatch === 'Homme' || req.user.toMatch === 'Femme') {
    db.get().then((db) => {
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
          var tab = result.filter(result => {
            return result.login !== req.user.login
          })
          // A TEST //////////////////
          tab.sort((a, b) => {
            if (a.popularite < b.popularite) {
              return -1
            }
            if (a.popularite === b.popularite) {
              return 0
            }
            if (a.popularite > b.popularite) {
              return 1
            }
          })
          // ///////////////////
          result.forEach((tab) => {
            delete tab.passwd
            delete tab.tokens
            delete tab.mail
            delete tab.date
            delete tab.to_match
            delete tab.prenom
            delete tab.nom
            delete tab.notification
            delete tab.match
            if (tab.completed === true) {
              tab.distance = distance(req.user.lat, req.user.long, tab.lat, tab.long).toFixed(1)
            } else {
              tab.distance = 'Indisponible'
            }
            if (tab.connected !== true) {
              tab.connected = lastConnection(tab.connected)
            }
          }, this)
          res.json({
            tab
          })
        }
      })
    })
  } else {
    db.get().then((db) => {
      db.collection('Users').find({to_match: {
        $in: [req.user.sexe,
          'All']
      },
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
      }).toArray((err2, result) => {
        if (err2) return error(404, res, false, 'Collection not found')
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
            delete tab.notification
            delete tab.match
            if (tab.completed === true) {
              tab.distance = distance(req.user.lat, req.user.long, tab.lat, tab.long).toFixed(1)
            } else {
              tab.distance = 'Indisponible'
            }
            if (tab.connected !== true) {
              tab.connected = lastConnection(tab.connected)
            }
          }, this)
          res.json({
            tab
          })
        }
      })
    })
  }
}
