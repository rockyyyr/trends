const request = require('../util/request')

const url = 'https://api.binance.com/api/v1/ticker/allPrices'

function trends(){
  return request.get(url)
}

module.exports = {
  trends
}
