module.exports = function (mongoose) {

	const project = require('./project.schema')(mongoose);

	return {
		Project: project
	}
}