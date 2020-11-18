
exports.up = function(knex) {
    return knex.schema.createTable('guides', tableBuilder => {
        tableBuilder.increments('id').notNullable()

        tableBuilder.string('name')
        tableBuilder.text('text')


        tableBuilder.timestamps(true,true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('guides')
};
