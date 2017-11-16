module.exports = function (error) {

	return new Promise((res, rej) => {
		if (error.name === 'MongoError') {
			res({
				code: 500,
				message: 'Internal server error'
			});
		}
		const errors = Object.keys(error.errors).map(prop => {
			return {
				kind: error.errors[prop].kind,
				path: error.errors[prop].path,
				value: error.errors[prop].value || ''
			};
		});
		res({
			code: 422,
			message: 'Validation failed',
			errors: errors
		});
	});
	
}