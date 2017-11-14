module.exports = function (error, resolve) {
	if (!error || !resolve) return;
	console.error(error);
	return resolve.status(500).send();
}
