
exports.up = function(knex) {
    return knex.schema
    .createTable('prices', (table) => {
        table.integer('house_large');
        table.integer('house_small');
        table.integer('apartment_large');
        table.integer('apartment_small');
        table.integer('townhouse_large');
        table.integer('townhouse_small');
        table.integer('land_large');
        table.integer('land_small');
      })
    .createTable('user', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.integer('salary').notNullable();
    })
    .createTable('home_model', (table) => {
        table.increments('id').primary().notNullable();
        table.string('style').notNullable();
        table.string('land').notNullable();
        table.string('location').notNullable();
        table.integer('age').notNullable();
        table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('home_model').dropTable('user').dropTable('prices');
};
