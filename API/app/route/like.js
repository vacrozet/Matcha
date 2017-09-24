const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.post('/getlike', middle('USER'), require('../controleur/like/getLike.js'))
router.delete('/deletelike', middle('USER'), require('../controleur/picture/deleteLike.js'))

module.exports = router
