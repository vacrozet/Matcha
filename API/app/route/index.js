const express = require('express')
const router = express.Router()

router.use('/user', require('./user.js'))
router.use('/home', require('./home.js'))
module.exports = router
