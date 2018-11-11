const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/index');
const films = require('./routes/films/index');
const actors = require('./routes/actors/index');
const images = require('./routes/images/getImages');
const logs = require('./log/log');

app.use('/', routes);
app.use('/api/films', films);
app.use('/api/actors', actors);
app.use('/images/actors', images);
app.use('/api', logs.router);

const childProcess = require('child_process');

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
	childProcess.spawn("node", ["log/logger.js"]);
});