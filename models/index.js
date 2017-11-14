module.exports = function (constants, db) {
	//inject all models;
	const project = require('./project')(constants, db);

	return {
		project: project
	}
}