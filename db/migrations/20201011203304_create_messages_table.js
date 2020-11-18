
exports.up = function(knex) {
    return knex.schema.createTable('messages', tableBuilder => {
        tableBuilder.increments('id').notNullable()
        tableBuilder.integer('user_id').notNullable()
        tableBuilder.string('theme')
        tableBuilder.text('text')

        tableBuilder.foreign('user_id').references('id').inTable('users')
        tableBuilder.timestamps(true,true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('messages')
};
