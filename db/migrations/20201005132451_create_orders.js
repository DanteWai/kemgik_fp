
exports.up = function(knex) {
    return knex.schema.createTable('orders', tableBuilder => {
        tableBuilder.increments('id').notNullable()
        tableBuilder.integer('user_id').notNullable()
        tableBuilder.string('status').defaultTo('sent')
        tableBuilder.jsonb('data')
        tableBuilder.jsonb('files')
        tableBuilder.jsonb('options')
        tableBuilder.boolean('checked').defaultTo(0)

        tableBuilder.foreign('user_id').references('id').inTable('users')
        tableBuilder.timestamps(true,true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('orders')
};
