module.exports = function (error, resolve) {
	if (!error || !resolve) return;
	error.code = isValidHttpCode(error.code) ? error.code : 500;
	resolve.status(error.code);
	if (error.code === 500) {
		console.error(error);
		return resolve.send();
	}
	return resolve.json(error);
}

function isValidHttpCode(code) {
	const codeRegEx = /^[1-5][0-9][0-9]$/
	return codeRegEx.test(code);
}