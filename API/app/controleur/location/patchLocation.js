const db = require('../../db.js')
const axios = require('axios')

module.exports = (req, res) => {
  if (req.body.latitude !== 0 && req.body.longitude !== 0) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.latitude},${req.body.longitude}&key=AIzaSyBO7tyw2-nedpTDffo6qR3isxTMCuzaNs8`
    axios.get(url).then((res2) => {
      db.get().then((db) => {
        db.collection('Users').updateOne({login: req.user.login}, {$set:
        {
          long: req.body.longitude,
          lat: req.body.latitude,
          location: res2.data.results[0].formatted_address
        }}).then((res3) => {
          res.status(200)
          return res.json({success: 'OK', message: 'location insert to db'})
        }).catch((err3) => {
          return res.json({message: 'location not insert to db'})
        })
      })
    }).catch((err2) => { console.log(err2) })
  } else {
    axios.get(`https://freegeoip.net/json/`).then((res3) => {
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${res3.data.latitude},${res3.data.longitude}&key=AIzaSyBO7tyw2-nedpTDffo6qR3isxTMCuzaNs8`
      axios.get(url).then((res4) => {
        db.get().then((db) => {
          db.collection('Users').updateOne({login: req.user.login}, {$set:
          {
            long: res3.data.longitude,
            lat: res3.data.latitude,
            location: res4.data.results[0].formatted_address
          }}).then((res3) => {
            res.status(200)
            return res.json({success: 'OK', message: 'location insert to db'})
          }).catch((err3) => {
            return res.json({message: 'location not insert to db'})
          })
        })
      }).catch((err4) => {
        console.log(err4)
      })
    }).catch((err3) => {
      console.log(err3)
    })
  }
}
