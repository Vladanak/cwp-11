let films = require("../../top250.json");
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.readFilm = function(req, res, payload, cb) {
	for (let i = 0; i < films.length; i++)
	{
		if (films[i].id == payload.id)
		{
			return cb(null, films[i]);
		}
	}
	cb(ErrorObject);
};