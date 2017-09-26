const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.post('/addblock', middle('USER'), require('../controleur/block/addBlock.js'))
// router.delete('/deleteblock/:login', middle('USER'), require('../controleur/block/deleteBlock.js'))

module.exports = router
