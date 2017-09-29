const express = require('express')
const router = express.Router()
// const middle = require('../middleware.js')

router.post('/passwd', require('../controleur/reset/passwd.js'))
router.post('/resetpasswd', require('../controleur/reset/resetpasswd.js'))

module.exports = router
