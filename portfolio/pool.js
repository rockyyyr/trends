const db = require('../database/db')

const table = 'pool'
const columns = ['currency', 'amount', 'updated', 'added']

function init() {
  return db.createTableIfNotExists(table, columns)
}

module.exports = {
  init
}