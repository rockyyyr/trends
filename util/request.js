const axios = require('axios')

function get (url){
  return new Promise(resolve => {
    axios.get(url)
      .then(response => resolve(response.data))
      .catch(err => console.error(err.message))
  })
}

module.exports = {
  get
}
