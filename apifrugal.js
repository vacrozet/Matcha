var express = require('express')
var bodyParser = require('body-parser')

//  Parametre de serveur
var hostname = 'localhost'
var port = 8080

var app = express()
app.use(bodyParser.json())


app.use('/', require('./route/index.js'))

app.use((req, res) => {
  res.status(404)
  res.json({
    message: 'Page non trouver'
  })
})

//  demarrer le serveur
app.listen(port, hostname, () => {
  console.log('mon serveur fonctionne correctement su http://' + hostname + ':' + port + '\n')
})
