const fs = require("fs");

setInterval(() =>
{
	fs.writeFileSync('log/logger.json', fs.readFileSync('./top250.json'));
}, 60 * 1000);