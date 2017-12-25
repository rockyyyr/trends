const {record} = require('../../service')
const {time, calculate} = require('../../util')

async function top(hours, size) {
  const range = {
    start: time.now(hours),
    end: time.now()
  }
  const data = await record.retrieve(range)
  const start = data[0]
  const end = data[data.length - 1]

  const properties = Object
    .getOwnPropertyNames(start)
    .filter(timeProperty)

  return properties
    .map(item => change(item, start, end))
    .sort((a, b) => b.change - a.change)
    .slice(0, size)
}

function change(item, start, end) {
  return {
    symbol: item,
    change: calculate.change(start[item], end[item]),
  }
}

function timeProperty(item){
  return item !== 'time'
}

module.exports = {
  top
}
