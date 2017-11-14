module.exports = function (constants, db) {

	const Project = db.Project;

	return {
		find: function (query, options) {
			return new Promise((res, rej) => {
				Project.find(query).select(options.select).skip(options.skip).limit(options.limit)
				.exec((err, projects) => {
					if (err) {
						rej(err);
					}
					res(projects);
				});
			});
		},
		create: function (project) {
			return new Promise((res, rej) => {
				const newProject = new Project({
					title: project.title,
					description: project.description,
					skills: project.skills
				});
				newProject.save((err, createdProject) => {
					if (err) {
						rej(err);
					}
					res(createdProject);
				})
			});
		},
		createMany: function(projectList) {
			return new Promise((res, rej) => {
				const newProjectList = projectList.map((item => {
					return {
						title: item.title,
						description: item.description,
						skills: item.skills
					};
				}));
				Project.create(newProjectList, (err, createdProjects) => {
					if (err) {
						rej(err);
					}
					res(createdProjects);
				})
			});
		}
	}
}