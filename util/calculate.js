function change(a, b){
  return (((b - a) / b) * 100).toFixed(3)
}

module.exports = {
  change
}
