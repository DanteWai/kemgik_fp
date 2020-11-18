
exports.up = function(knex) {
    return knex.schema.createTable('users', tableBuilder => {
        tableBuilder.increments('id').notNullable()
        tableBuilder.string('AuthID',20).notNullable()
        tableBuilder.jsonb('sso_data')
        tableBuilder.jsonb('contacts')
        tableBuilder.string('role',20).notNullable()
        tableBuilder.timestamps(true,true);

        tableBuilder.unique(['AuthID'])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
