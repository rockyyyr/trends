const router = require('express').Router()
const trends = require('./trends')
const request = require('../../util/request')
const db = require('../../database/db')

router.get('/top', async (req, res) => {
  const hours = req.query.hours
  const size  = req.query.size
  const result = await trends.top(hours, size)

  res.json(result)
})

router.get('/binance', async (req, res) => {
  const response = await request.get('https://api.binance.com/api/v1/ticker/allPrices')
  const sorted = response.sort((a, b) => b.price - a.price)
  const filtered = sorted.filter(item => item.symbol.endsWith('BTC'))
  filtered.forEach(item => console.log(`${item.symbol.padStart(10)} | price: ${item.price}`))
  res.json(filtered)
})

router.get('/', async (req, res) => {
  const data = await db.select('market')
  res.json(data)
})

module.exports = router
