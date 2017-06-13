const uuid = require('uuid')
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost/matcha', (error, db) => {
  if (error) return console.log(error)

  console.log("Connecté à la base de données 'matcha'")

  let tab = {
    _id: uuid(),
    nom: 'crozet',
    prenom: 'valentin'
  }
  db.collection('Users').insert(tab, null, (error, result) => {
    if (error) throw error

    console.log(result)
  })
})
