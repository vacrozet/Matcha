const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.get('/', middle('USER'), require('../controleur/home/home.js'))

module.exports = router
