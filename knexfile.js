
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      database: 'kemgik_fp',
      user: 'postgres',
      password: 'pepsicola',
      charset: 'utf8',
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    },
  },


};
