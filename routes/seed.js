module.exports = function (constants, router, models) {

	const projectModel = models.project;
	const errorHandler = require('../utils/error-handler');

	//Mock objects
	const projects = [
		{
			title: 'Web Application',
			description: 'Lorem ipsum wagamama bombay chapatti',
			skills: [
				{
					name: 'HTML'
				},
				{
					name: 'Javascript'
				},
				{
					name: 'CSS'
				}
			]
		},
		{
			title: 'Web Services API',
			description: 'Web API for the cats and company.',
			skills: [
				{
					name: 'API'
				},
				{
					name: 'NodeJS'
				},
				{
					name: 'ExpressJS'
				},
				{
					name: 'MongoDB'
				}
			]
		},
		{
			title: 'Seikatsu',
			description: 'Web application and web services portfolio',
			skills: [
				{
					name: 'Angular 4.0'
				},
				{
					name: 'Single Page Application'
				},
				{
					name: 'Web API'
				}
			]
		}
	];

	router.post('/seed', (req, res) => {
		console.log('POST: ' + req.originalUrl + ' -- req.query == ', req.query);

		projectModel.createMany(projects).then((createdProjects) => {
			console.log('Number of created mock projects: ', createdProjects.length);
			return res.status(201).send('Database seeded');
		}).catch((err) => {
			errorHandler(err, res);
		});
	});

}