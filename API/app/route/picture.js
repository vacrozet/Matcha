const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.get('/:token/:id_pict', require('../controleur/picture/getPicture.js'))
router.post('/:id_pict', middle('USER'), require('../controleur/picture/putPicture.js'))

module.exports = router
