const db = require('../database/db')
const {now} = require('../util/time')

const table = 'market'

function ready() {
  return db.tableExists(table)
}

function init(data) {
  const columns = data
    .filter(coins)
    .map(toSymbol)
  return db.createTableIfNotExists(table, columns)
}

async function trends(raw) {
  const data = raw
    .filter(coins)
    .reduce(flatten, {})

  data.time = now()

  return db.insert(table, data)
}

function retrieve(range) {
  return range ? db.selectInRange(table, range)
               : db.select(table)
}

function coins(item){
  return item.symbol.endsWith('BTC') && item.symbol !== 'BRDBTC'
}

function flatten(obj, item){
  obj[item.symbol] = parseFloat(item.price)
  return obj
}

function toSymbol(item){
  return item.symbol
}

module.exports = {
  ready,
  init,
  trends,
  retrieve
}
