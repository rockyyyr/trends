const router = require('express').Router()

router.use('/trends', require('./trends'))

module.exports = router
