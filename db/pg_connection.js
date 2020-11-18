const client = require('knex')({
    client: 'pg',
    connection:{
        host: '127.0.0.1',
        port: 5432,
        database: 'kemgik_fp',
        user: 'postgres',
        password: 'pepsicola',
    },
})

module.exports = client

/*
*
* knex migrate:make migration_name
* knex migrate:latest
* knex migrate:rollback
* knex migrate:rollback --all
* */