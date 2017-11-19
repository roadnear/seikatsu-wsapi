module.exports = function (constants, router, models) {

	const errorHandler = require('../utils/error-handler');
	const ProjectTypes = require('../models/project.types');
	const prefixUrl = '/' + constants.PROJECTS;
	const projectModel = models.project;

	router.get(prefixUrl, (req, res) => {
		console.log('GET: ' + req.originalUrl + ' -- req.query == ', req.query);

		const query = new ProjectTypes.query(req.query);
		const options = new ProjectTypes.options({});
		
		projectModel.find(query, options).then((projects) => {
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

	router.post(prefixUrl, (req, res) => {
		console.log('POST: ' + req.originalUrl + ' -- req.body == ', req.body);

		const project = new ProjectTypes.create(req.body);

		projectModel.create(project).then((createdProject) => {
			return res.status(201).json(createdProject);
		}).catch((error) => {
			errorHandler(error, res);
		});

	});

	router.put(prefixUrl, (req, res) => {
		console.log('PUT: ' + req.originalUrl + ' -- req.body == ', req.body);

		const id = req.body._id;
		const project = new ProjectTypes.update(req.body);

		projectModel.update(id, project).then(() => {
			return res.status(204).send();
		}).catch((err) => {
			errorHandler(err, res);
		});
	});

	router.delete(prefixUrl, (req, res) => {
		console.log('DELETE: ' + req.originalUrl + ' -- req.body == ', req.body);

		const id = req.body._id;

		projectModel.delete(id).then(() => {
			return res.status(204).send();
		}).catch((err) => {
			errorHandler(err, res);
		});
	});

}