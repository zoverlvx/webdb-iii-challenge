
exports.up = function(knex, Promise) {
    return knex.schema.createTable("cohorts", tbl => {
	tbl.increments();
	tbl.string("name").notNullable().unique(); // Cohort must have a name and it must be unique
	tbl.timestamps(true, true); // gives us a created_at and an updated_at
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("cohorts");
};
