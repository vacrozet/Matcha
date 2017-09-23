const express = require('express')
const router = express.Router()

router.get('/:token/:id_pict', require('../controleur/picture/getPicture.js'))
router.post('//:id_pict')
router.put('//:id_pict')

module.exports = router
