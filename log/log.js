const express = require('express');
const router = express.Router();
const fs = require('fs');

let LogPath = 'log/logs.txt';
let File;

fs.open(LogPath, 'w', (err, fd) => {
	File = fd;
});

router.get('*', (req, res) => {
	let data = fs.readFileSync(LogPath);
	console.log("logs");
	res.end(data);
});

function log(text) {
	fs.appendFile(File, `${(new Date()).toLocaleString()}: \r\n${text}\r\n`, (e) => {
		if (e)
		{
			console.log(`Error append: ${e}`)
		}
	});
}

module.exports = { router, log };