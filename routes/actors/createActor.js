let actors = require("../../actors.json");
const valid = require("./valid");
const fs = require('fs');
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.createActor = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload)) {
		console.log(payload);
		let manyId = [];
		actors.forEach((actor) =>
		{
			manyId.push(actor.id);
		});
		payload.id = Math.max.apply(null, manyId) + 1;

		actors.push(payload);
		fs.writeFile("actors.json", JSON.stringify(actors), "utf8", function () {});
		cb(null, payload);
	}
	else
	{
		cb(ErrorObject);
	}
};