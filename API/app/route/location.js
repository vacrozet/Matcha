const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.post('/patchlocation', middle('USER'), require('../controleur/location/patchLocation.js'))

module.exports = router
