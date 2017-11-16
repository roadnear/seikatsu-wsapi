module.exports = function (constants, router, models) {

	const errorHandler = require('../utils/error-handler');
	const ProjectTypes = require('../models/project.types');
	const prefixUri = '/' + constants.PROJECTS;
	const projectModel = models.project;

	router.get(prefixUri, (req, res) => {
		console.log('GET: ' + req.originalUrl + ' -- req.query == ', req.query);

		const query = new ProjectTypes.query(req.query);
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

	router.post(prefixUri, (req, res) => {
		console.log('POST: ' + req.originalUrl + ' -- req.body == ', req.body);

		const project = new ProjectTypes.create(req.body);

		projectModel.create(project).then((createdProject) => {
			return res.status(201).json(createdProject);
		}).catch((error) => {
			errorHandler(error, res);
		});

	});

}