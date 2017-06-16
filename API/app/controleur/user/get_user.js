const MongoClient = require('mongodb').MongoClient

module.exports = (req, res) => {
  MongoClient.connect('mongodb://localhost/matcha', (error, db) => {
    if (error) {
      return res.json({
        message: 'erreur'
      })
    }
    console.log("Connecté à la base de données 'matcha'")
    db.collection('Users').find().toArray((error, results) => {
      if (error) {
        db.close()
        return res.json({
          err: "erreur d'injection"
        })
      }
      console.log(results.length)
      results.forEach((element, index) => {
        delete results[index]._id
        delete results[index].to_match
        delete results[index].passwd
      }, this)
      return res.json({
        results
      })
    })
  })
}
