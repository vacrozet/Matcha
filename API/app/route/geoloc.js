const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.patch('/patchgeoloc', middle('USER'), require('../controleur/geoloc/patchGeoloc.js'))

module.exports = router
