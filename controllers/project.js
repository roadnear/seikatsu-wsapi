module.exports = function (router) {

	router.get('/projects', (req, res) => {
		console.log('GET: ' + req.originalUrl);
		return res.status(200).json();
	});
}