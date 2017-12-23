const express = require('express')
const cors = require('cors')

const server = express()
const port = process.env.PORT || 3000

server.use(cors())
server.use('/', require('./routes'))
server.get('/', (req, res) => res.end('watching market trends...'))

server.listen(port, console.log(`listening on port ${port}`))

module.exports = server
