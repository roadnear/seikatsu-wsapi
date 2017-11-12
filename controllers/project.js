module.exports = function (constants, router, services) {

	const prefixUri = '/' + constants.PROJECTS;
	const projectService = services.project;

	router.get(prefixUri, (req, res) => {
		console.log('GET: ' + req.originalUrl);
		
		projectService.find(null, { select: null}).then((projects) => {
			if (!projects.length) {
				return res.status(404).send();
			}
			return res.status(200).json({
				projects: projects
			});
		}).catch((error) => {
			console.error(error);
		});

	});
	
}