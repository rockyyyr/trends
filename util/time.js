const moment = require('moment')

function now (hours){
  return hours ? moment().subtract(hours, 'hours').format()
               : moment().format()
}

function fromUnix(unix){
  return moment.unix(unix).format()
}

function convertTimestamps (data){
  return new Promise(resolve => {
    let count = 0

    data.forEach(item => {
      item.last_updated = fromUnix(item.last_updated)

      if (++count === data.length){
        resolve(data)
      }
    })
  })
}

function range(hours){
  return {
    start: now(hours),
    end: now()
  }
}

function property(item){
  return item !== 'time'
}

module.exports = {
  now,
  range,
  fromUnix,
  convertTimestamps,
  property
}
