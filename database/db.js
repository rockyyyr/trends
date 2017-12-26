const knex = require('./knex')
const {now} = require('../util/time')

function tableExists (table){
  console.log(`checking table '${table}'`)
  return new Promise(resolve => {
    knex.schema.hasTable(table).then(exists => resolve(exists))
  })
}

function createTableIfNotExists (table, columns) {
  console.log(`creating table '${table}'`)
  return new Promise(resolve => {
    knex.schema.createTableIfNotExists(table, column => {
      columns.forEach(name => column.decimal(name, 16, 8))
      column.string('time')
    }).then(resolve)
      .catch(error)
  })
}

function insert (table, data){
  console.log(`insert into '${table}'`)
  return new Promise(resolve => {
    knex
      .insert(attachTimestamp(data))
      .into(table)
      .then(resolve)
      .catch(error)
  })
}

function batchInsert (table, data){
  console.log(`batch insert into '${table}'`)
  return new Promise(resolve => {
    knex.batchInsert(table, data, 2000)
      .then(resolve)
      .catch(error)
  })
}

function select (table, columns){
  console.log(`select from '${table}'`)
  return new Promise(resolve => {
    knex
      .select(columns || "*")
      .from(table)
      .then(resolve)
      .catch(error)
  })
}

function selectInRange (table, { start, end },  columns){
  console.log(`select from '${table}'`)
  return new Promise(resolve => {
    knex
      .select(columns || "*")
      .from(table)
      .whereBetween('time', [start, end])
      .then(resolve)
      .catch(error)
  })
}

function selectRecent(table, columns){
  console.log(`select last from ${table} ${columns || '*'}`)
  return new Promise(resolve => {
    knex
      .select(columns || '*')
      .from(table)
      .orderBy('time', 'desc')
      .limit(1)
      .then(resolve)
      .catch(error)
  })
}

function update(table, data){
  console.log(`udpate table ${table}`)
  return new Promise(resolve => {
    knex
      .update(data)
      .then(resolve)
      .catch(error)
  })
}

function attachTimestamp (data){
  data.time = now()
  return data
}

function error(err){
  console.log(err.message)
}

module.exports = {
  tableExists,
  createTableIfNotExists,
  insert,
  batchInsert,
  select,
  selectInRange,
  selectRecent,
  update
}
