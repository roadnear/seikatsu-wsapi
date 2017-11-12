module.exports = function (constants, db) {

	const Project = db.Project;

	return {
		find: function (query, options) {
			return new Promise((resolve, reject) => {
				reject(new Error('mock reject'))
				Project.find(query).select(options.select).skip(options.skip).limit(options.limit)
				.exec((err, projects) => {
					if (err) {
						reject(err);
					}
					resolve(projects);
				});
			});
		}
	}
}