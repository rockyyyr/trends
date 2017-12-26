const db = require('../database/db')

const table = 'pool'
const columns = ['symbol', 'amount', 'date_updated', 'current_position', 'change']

init()

function init() {
  return db.createTableIfNotExists(table, columns)
}

function get() {
  return db.select(table)
}

function update(data) {
  return db.update(table, data)
}

async function analyze() {
  const top  = await request.get('https://dynamic-trends.herokuapp.com/trends/top?hours=12&size=5')
  const pool = await get()
}


module.exports = {
  init,
  analyze
}