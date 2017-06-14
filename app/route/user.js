const MongoClient = require('mongodb').MongoClient
const uuid = require('uuid')
const express = require('express')
const router = express.Router()

router.post('/signin', (req, res) => {
  if (typeof req.body.nom === 'undefined') {
    res.status(400)
    return res.json({
      message: 'Undefined variable'
    })
  }
  if (req.body.nom === '') {
    res.status(400)
    return res.json({
      message: 'Empty variable'
    })
  }


  MongoClient.connect('mongodb://localhost/matcha', (error, db) => {
    if (error) return console.log(error)

    console.log("Connecté à la base de données 'matcha'")

    let tab = {
      _id: uuid(),
      nom: res.qwery.nom,
      prenom: res.qwery.prenom
    }
    db.collection('Users').insert(tab, null, (error, result) => {
      if (error) throw error

      console.log(result)
    })
  })
})

router.post('/signup', (req, res) => {
  if (typeof req.body.nom === 'undefined') {
    res.status(400)
    return res.json({
      message: 'Undefined variable'
    })
  }
  if (req.body.nom === '') {
    res.status(400)
    return res.json({
      message: 'Empty variable'
    })
  }


  MongoClient.connect('mongodb://localhost/matcha', (error, db) => {
    if (error) return console.log(error)

    console.log("Connecté à la base de données 'matcha'")

    let tab = {
      _id: uuid(),
      nom: res.qwery.nom,
      prenom: res.qwery.prenom
    }
    db.collection('Users').insert(tab, null, (error, result) => {
      if (error) throw error

      console.log(result)
    })
  })
})

module.exports = router
