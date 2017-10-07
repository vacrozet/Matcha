const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.post('/sendmessage', middle('USER'), require('../controleur/message/putMessage.js'))

module.exports = router