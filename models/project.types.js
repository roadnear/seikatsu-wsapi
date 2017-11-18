module.exports = {
	query: function (query) {
		this.is_deleted = query.is_deleted || false;
		if (query.hasOwnProperty('title')) this.title = { $regex: new RegExp(query.title, 'i') };
		if (query.created_at_from) {
			this.created_at = {
				$gte: query.created_at_from
			};
		}
		if (query.created_at_to) {
			this.created_at = this.created_at || {};
			this.created_at.$lte = query.created_at_to;
		}
		if (query.hasOwnProperty('updated_at')) this.updated_at = query.updated_at;
		
	},
	create: function (project) {
		this.title = project.title;
		this.description = project.description;
		this.skills = project.skills;
	},
	options: function (options, userType) {
		if (typeof options !== 'object') throw new Error(`${options} invalid type`);
		const page = options.page || 1;
		this.limit = 10;
		this.skip = this.limit * (page - 1);
		this.select = {
			__v: 0,
			updated_at: 0,
			is_deleted: 0
		};

		if (typeof userType === 'string') {
			//object modification, to be added
		}
	}
}