module.exports = function (constants, router, models) {

	const errorHandler = require('../utils/error-handler');
	const ProjectQuery = require('../models/project.query');
	const prefixUri = '/' + constants.PROJECTS;
	const projectModel = models.project;

	router.get(prefixUri, (req, res) => {
		console.log('GET: ' + req.originalUrl + ' -- req.query == ', req.query);

		const query = new ProjectQuery(req.query);
		console.log('query == ', query)

		projectModel.find(query, { select: null}).then((projects) => {
			if (!projects.length) {
				return res.status(404).send();
			}
			return res.status(200).json({
				projects: projects
			});
		}).catch((error) => {
			errorHandler(error, res);
		});

	});
	
}