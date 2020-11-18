const {db} = require('./config/config');

module.exports = {

  development: {
    client: 'pg',
    connection: db,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    },
  },


};
