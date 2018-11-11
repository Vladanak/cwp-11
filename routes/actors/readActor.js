let actors = require("../../actors.json");
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.readActor = function(req, res, payload, cb) {
	for (let i = 0; i < actors.length; i++)
	{
		if (actors[i].id == payload.id)
		{
			return cb(null, actors[i]);
		}
	}
	cb(ErrorObject);
};