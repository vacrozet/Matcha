const db = require('../../db.js')

module.exports = {
  getUserByToken: (token) => {
    return new Promise((resolve, reject) => {
      db.get().then((db) => {
        db.collection('Users').find({tokens: {$elemMatch: {token: token}}}).toArray((error, result) => {
          if (error) {
            return reject(error)
          }
          return resolve(result[0].login)
        })
      })
    })
  }
}
