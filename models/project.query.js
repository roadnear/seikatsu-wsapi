module.exports = function (query) {

	this.is_deleted = query.is_deleted || false;
	if (query.hasOwnProperty('title')) this.title = query.title;
	if (query.hasOwnProperty('created_at')) this.created_at = query.created_at;
	if (query.hasOwnProperty('updated_at')) this.updated_at = query.updated_at;
	
}