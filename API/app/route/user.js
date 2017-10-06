const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.post('/signin', require('../controleur/user/signin1.js'))
router.post('/signup', require('../controleur/user/signup.js'))
router.get('/profile', middle('USER'), require('../controleur/user/get_my_profile.js'))
router.patch('/modifyprofile', middle('USER'), require('../controleur/user/profile/modifyprofile.js'))
router.post('/addTag', middle('USER'), require('../controleur/user/profile/addTag.js'))
router.delete('/deletetag/:tag', middle('USER'), require('../controleur/user/profile/deleteTag.js'))
router.get('/alluser', middle('USER'), require('../controleur/user/allUser.js'))
router.get('/userprofile/:login', middle('USER'), require('../controleur/user/getProfileUser.js'))
router.post('/connected', require('../controleur/user/connected.js'))
router.post('/disconnected', require('../controleur/user/disconnected.js'))
router.get('/notification', middle('USER'), require('../controleur/user/notification.js'))
router.get('/getchat', middle('USER'), require('../controleur/user/getChat.js'))

module.exports = router
