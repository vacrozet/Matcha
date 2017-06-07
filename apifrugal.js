var express = require('express')
var bodyParser = require('body-parser')

//  Parametre de serveur
var hostname = 'localhost'
var port = 8080

var app = express()
app.use(bodyParser.json())

var myRouter = express.Router()

app.use(myRouter)
myRouter.route('/user')

// Methode GET
.get((req, res) => {
  res.json({
    message: 'Login avec lequelle tu te connect',
    login: req.query.login
  })
})
//  POST
.post((req, res) => {
    // prenom: req.body.nom,
    // adresse: req.body.adresse,
    // cp: req.body.cp,
    // ville: req.body.ville,
    // sexe: req.body.sexe,
    // to_sexe: req.body.to_sexe





  res.json({
    message: 'Utilisateur enregistrer',
  })
})
// PUT
.put((req, res) => {
  res.json({
    message: "Mise à jour des informations d'une piscine dans la liste",
    methode: req.method
  })
})
// DELETE
.delete((req, res) => {
  res.json({
    message: "Suppression d'une piscine dans la liste",
    methode: req.method
  })
})




myRouter.route('/')
// ALL
.all((req, res) => {
  res.json({
    message: 'redirection sur un lien automatique',
    methode: req.method
    
  })
})




app.use('*', (req, res) => {
  res.status(404)
  res.json({
    message: 'Page non trouver'
  })
})

//  demarrer le serveur
app.listen(port, hostname, () => {
  console.log('mon serveur fonctionne correctement su http://' + hostname + ':' + port + '\n')
})
