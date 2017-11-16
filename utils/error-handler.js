module.exports = function (error, resolve) {
	if (!error || !resolve) return;
	resolve.status(error.code || 500);
	if (error.code === 500) {
		console.error(error);
		return resolve.send();
	}
	return resolve.json(error);
}
