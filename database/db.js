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
      .catch(err => console.error(err))
  })
}

function insert (table, data){
  console.log(`insert into '${table}'`)
  return new Promise(resolve => {
    knex
      .insert(attachTimestamp(data))
      .into(table)
      .then(resolve)
      .catch(err => console.error(err))
  })
}

function batchInsert (table, data){
  console.log(`batch insert into '${table}'`)
  return new Promise(resolve => {
    knex.batchInsert(table, data, 2000)
      .then(resolve)
      .catch(err => console.log(err.message))
  })
}

function select (table, columns){
  console.log(`select from '${table}'`)
  return new Promise(resolve => {
    knex
      .select(columns || "*")
      .from(table)
      .then(result => resolve(result))
      .catch(err => console.error(err))
  })
}

function selectInRange (table, { start, end },  columns){
  console.log(`select from '${table}'`)
  return new Promise(resolve => {
    knex
      .select(columns || "*")
      .from(table)
      .whereBetween('time', [start, end])
      .then(result => resolve(result))
      .catch(err => console.error(err))
  })
}

function attachTimestamp (data){
  data.time = now()
  return data
}

module.exports = {
  tableExists,
  createTableIfNotExists,
  insert,
  batchInsert,
  select,
  selectInRange
}
