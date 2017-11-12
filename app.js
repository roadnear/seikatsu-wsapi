const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const constants = require('./constants')();
const Promise = require('bluebird');
mongoose.Promise = Promise;
const promise = mongoose.connect(constants.DATABASE_NAME, {
	useMongoClient: true
});
const db = require('./data-access-layer/main')(mongoose);

console.log(global.Promise === require('bluebird'))
promise.then(db => {
	console.log('Database ' + db.name + ' connected successfuly on port ' + db.port);
}, err => {
	console.log('Database failed to connect: ', err);
});

const services = require('./services/main')(constants, db);
require('./controllers/project')(constants, router, services);

app.use('/api/v1', router);
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send();
});

app.listen(3232, () => console.log('App is listening on port:', 3232));