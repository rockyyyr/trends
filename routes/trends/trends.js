const {record, market} = require('../../service')

async function top(limit, range) {
  const trends = await market.trends()
  return trends
    .map(record => { return { name: record.name, change: record.percent_change_1h }})
    .sort((a, b) => b.change - a.change)
}

module.exports = {
  top
}
