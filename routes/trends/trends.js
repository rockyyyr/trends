const {record} = require('../../service')
const {time, calculate} = require('../../util')

async function top(hours, size) {
  const data = await record.retrieve(time.range(hours))
  const start = data[0]
  const end = data[data.length - 1]

  const properties = Object
    .getOwnPropertyNames(start)
    .filter(time.property)

  return properties
    .map(item => change(item, start, end))
    .sort(changes)
    .slice(0, size)
}

function price(currency){
  return record.getPrice(currency)
}

function change(item, start, end) {
  return {
    symbol: item,
    change: calculate.change(start[item], end[item]),
  }
}

function changes(a, b) {
  return b.change - a.change
}

module.exports = {
  top,
  price
}
