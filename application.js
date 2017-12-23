const { market, record } = require('./service')
const request = require('./util/request')

start()

async function start (){
  const ready = await record.ready()
  await prepare(ready)

  run()
}

function prepare(ready){
  return new Promise(async resolve => {
    if (!ready) {
      const trends = await market.trends()
      await record.init(trends)
      resolve()
    } else {
      resolve()
    }
  })
}

async function run (minutes){
  setInterval(async () => {
    const trends = await market.trends()
    await record.trends(trends)

  }, 2000)
}