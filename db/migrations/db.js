exports.up = function(knex) {
	return Promise.all([
		knex.schema.createTable('products', (table) => {
		table.increments('id').primary();
		table.string('name');
		table.string('ingredients');
		table.string('imageLink');
		table.boolean('containsMicroplastics');
    table.string('isbn');
    table.string('link');
		table.timestamps(true, true);
		})
	]);
}

exports.down = function(knex) {
	return Promise.all([
		knex.schema.dropTable('products')
	]);
}
