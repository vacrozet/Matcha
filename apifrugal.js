// L'application requiert l'utilisation du module Express.
// La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
var express = require('express')
// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost'
var port = 3000
const bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Nous créons un objet de type Express.
// Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
// C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
var myRouter = express.Router()

myRouter.route('/user/signin').post((req, res) => {

})

myRouter.route('/user/signup').post((req, res) => {

})

// Je vous rappelle notre route (/piscines).
myRouter.route('/user/:id')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE

// GET
.get((req, res) => {
  console.log(req.params.id)
// Récuperation de l'id..





// res.json Sert a affichier .
  res.json({
    message: 'Liste toutes les piscines de Lille Métropole',
    methode: req.params.id
  })
})








// POST
.post((req, res) => {
  res.json({
    message: "resultat du formulaire d'inscription",
    nom: req.qwery.nomm,
    prenom: req.qwery.prenom,
    date: 'Ajoute une nouvelle piscine à la liste',
    methode: req.method
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

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter)

// Démarrer le serveur
app.listen(port, hostname, () => {
  console.log('Mon serveur fonctionne sur http://' + hostname + ':' + port)
})
