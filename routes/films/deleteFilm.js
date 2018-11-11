let films = require("../../top250.json");
const valid = require("./valid");
const fs = require('fs');
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.deleteFilm = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload))
	{
		let deletedFilmId = payload.id;
		let deletedFilmI = -1;
		let flag = false;
		for (let i = 0; i < films.length; i++)
		{
			if (films[i].id === deletedFilmId)
			{
				flag = true;
				deletedFilmI = i;
				for (let j = i; j < films.length; j++)
				{
					films[j].position -= 1;
					console.log("deleted");
				}
				break;
			}
		}
		if (flag) {
			cb(films[deletedFilmI]);
			fs.writeFile("top250.json", JSON.stringify(films), "utf8", () => {});
			films.splice(deletedFilmI, 1);
		}
		else
		{
			cb(ErrorObject);
		}
	}
	else
	{
		cb(ErrorObject);
	}
};