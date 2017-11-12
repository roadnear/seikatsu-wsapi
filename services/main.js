module.exports = function (constants, db) {
	//inject all services;
	const project = require('./project')(constants, db);

	return {
		project: project
	}
}