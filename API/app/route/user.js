const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.post('/signin', require('../controleur/user/signin.js'))
router.post('/signup', require('../controleur/user/signup.js'))
router.get('/profile', middle('USER'), require('../controleur/user/get_my_profile.js'))
router.patch('/modifyprofile', middle('USER'), require('../controleur/user/profile/modifyprofile.js'))
router.post('/addTag', middle('USER'), require('../controleur/user/profile/addTag.js'))
router.delete('/deletetag/:tag', middle('USER'), require('../controleur/user/profile/deleteTag.js'))
// router.get('/', middle('USER'), require('../controleur/user/get_user.js'))

module.exports = router
