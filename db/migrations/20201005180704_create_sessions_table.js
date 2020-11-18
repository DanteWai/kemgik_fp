exports.up = function(knex) {
    return knex.schema.createTable('sessions', tableBuilder => {
        tableBuilder.increments('id').primary()
        tableBuilder.integer('user_id')
        tableBuilder.uuid('refreshToken').notNullable()
        tableBuilder.string('user-agent', 200).notNullable()
        tableBuilder.string('fingerprint', 200).notNullable()
        tableBuilder.bigInteger('expiresIn').notNullable()
        tableBuilder.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
        tableBuilder.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())

        tableBuilder.foreign('user_id').references('id')
            .inTable('users').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('sessions')
};