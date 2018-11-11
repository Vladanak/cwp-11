const fs = require('fs');
const express = require('express');
const router = express.Router();
const logger = require('../../log/log.js');

router.get('*', (req, res, next) => {
	logger.log(`${req.url.toString()}\n`);
	let file = req.url.split('/')[1];
	let name = 'no-image.png';
	fs.access(`./routes/images/${file}`, fs.constants.R_OK, (err) => {
		if (!err) name = req.url;
		res.sendFile(name, { root: './routes/images/'}, (err) => {
			if (err) next(err);
		});
	});
});

module.exports = router;