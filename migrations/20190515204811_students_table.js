
exports.up = function(knex, Promise) {
    return knex.schema.createTable("students", tbl => {
	tbl.increments();
	tbl.string("name").notNullable(); // Student must have a name
	tbl.integer("cohort_id")
	  .unsigned()
	  .references("id")
	  .inTable("cohorts")
	  .onDelete("CASCADE")
	  .onUpdate("CASCADE");

	tbl.timestamps(true, true);
    }); 
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("students");
};
