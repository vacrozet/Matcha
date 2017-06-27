const express = require('express')
const router = express.Router()

router.post('/signin', require('../controleur/user/signin.js'))
router.post('/signup', require('../controleur/user/signup.js'))
router.get('/', require('../controleur/user/get_user.js'))

module.exports = router
