const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.get('/getlike/:login', middle('USER'), require('../controleur/like/getLike.js'))
router.delete('/deletelike', middle('USER'), require('../controleur/like/deleteLike.js'))
router.post('/addlike', middle('USER'), require('../controleur/like/addLike.js'))

module.exports = router
