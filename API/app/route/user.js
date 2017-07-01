const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.post('/signin', require('../controleur/user/signin.js'))
router.post('/signup', require('../controleur/user/signup.js'))
router.get('/profil', middle('USER'), require('../controleur/user/get_my_profil.js'))
router.get('/', middle('USER'), require('../controleur/user/get_user.js'))

module.exports = router
