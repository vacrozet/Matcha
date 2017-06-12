
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
myRouter.route('/', require)
// ALL
.all((req, res) => {
  res.json({
    message: 'redirection sur un lien automatique',
    methode: req.method
    
  })
})
