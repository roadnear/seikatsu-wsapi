const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const router = express.Router();
const constants = require('./constants')();
const Promise = require('bluebird');
global.Promise = Promise;
mongoose.Promise = Promise;
const promise = mongoose.connect(constants.DATABASE_NAME, {
	useMongoClient: true
});
const db = require('./data-access-layer/index')(mongoose);

promise.then(db => {
	console.log('Database ' + db.name + ' connected successfuly on port ' + db.port);
}, err => {
	console.log('Database failed to connect: ', err);
});

const models = require('./models/index')(constants, db);
require('./routes/project')(constants, router, models);
require('./routes/seed')(constants, router, models);

app.use(bodyParser.json());
app.use('/api/v1', router);
app.use((err, req, res, next) => {
	console.error('middleware == ', err);
	return res.status(500).send();
});

app.listen(3232, () => console.log('App is listening on port:', 3232));