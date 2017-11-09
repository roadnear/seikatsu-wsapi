const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
mongoose.Promise = require('bluebird');
const promise = mongoose.connect('mongodb://localhost/seikatsu', {
	useMongoClient: true,
	promiseLibrary: require('bluebird')
});

require('./data-access-layer/main')(mongoose);

promise.then(db => {
	console.log('Database ' + db.name + ' connected successfuly on port ' + db.port);
}, err => {
	console.log('Database failed to connect: ', err);
});

require('./controllers/project')(router);

app.use('/api/v1', router);

app.listen(3232, () => console.log('App is listening on port:', 3232));