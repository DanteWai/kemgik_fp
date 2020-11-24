const {db} = require('./../config/config');

const client = require('knex')({
    client: 'pg',
    connection:db,
})

module.exports = client

/*
*
* knex migrate:make migration_name
* knex migrate:latest
* knex migrate:rollback
* knex migrate:rollback --all
* */