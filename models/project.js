module.exports = function (constants, db) {

	const Project = db.Project;
	const transcribeValidation = require('../utils/transcribe-validation');

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
						transcribeValidation(err).then(errMessage => {
							rej(errMessage);
						});
					} else {
						res(createdProject);
					}
				})
			});
		},
		createMany: function (projectList) {
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
						transcribeValidation(err).then(errMessage => {
							rej(errMessage);
						});
					} else {
						res(createdProjects);
					}
				})
			});
		},
		update: function (id, project) {
			return new Promise((res, rej) => {
				Project.findOneAndUpdate({ _id: id }, project, (err, updatedProject) => {
					if (err) {
						transcribeValidation(err).then(errMessage => {
							rej(errMessage);
						});
					}
					if (!updatedProject && !err) {
						rej({
							code: 404,
							message: 'Update failed. Project not found.'
						});
					}
					if (updatedProject) {
						res(updatedProject);
					}
				});
			});
		},
		delete: function (id) {
			return new Promise((res, rej) => {
				Project.findOneAndRemove({ _id: id}, (err, removedProject) => {
					if (err) {
						rej(err);
					}
					if (!err && !removedProject) {
						rej({
							code: 404,
							message: 'Delete failed. Project not found.'
						});
					}
					if (removedProject) {
						res(removedProject);
					}
				});
			});
		}
	}
}