module.exports = require('knex')({
  client: 'mysql2',
  connection: process.env.DATABASE_URL || require('./database.json'),
  pool: {
    min: 0,
    max: 7
  }
})
