module.exports = {
	query: function (query) {
		this.is_deleted = query.is_deleted || false;
		if (query.hasOwnProperty('title')) this.title = query.title;
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
	}
}