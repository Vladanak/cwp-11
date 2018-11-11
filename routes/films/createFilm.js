let films = require("../../top250.json");
const valid = require("./valid.js");
const fs = require('fs');
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.createFilm = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload)) {
		console.log(payload);
		let flag = false;
		for (let i = 0; i < films.length; i++) {
			if (films[i].position === payload.position) {
				flag = true;
				for (let j = films.indexOf(films[i]); j < films.length; j++) {
					films[j].position += 1;
				}
				break;
			}
		}
		if (!flag)
		{
			let positions = [];
			films.forEach((film) => {
				positions.push(film.position);
			});
			let maxPosition = Math.max.apply(null, positions);
			if (payload.position - maxPosition > 1) {
				payload.position = maxPosition + 1;
			}
		}
		payload.id = films[films.length - 1].id + 1;

		films.push(payload);
		fs.writeFile("top250.json", JSON.stringify(films), "utf8", function () {});
		cb(null, films[films.length - 1]);
	}
	else
	{
		cb(ErrorObject);
	}
};