let films = require("../../top250.json");
const valid = require("./valid");
const fs = require('fs');
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.updateFilm = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload)) {
		console.log(payload);
		if (payload.position !== undefined) {
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
			if (!flag) {
				let positions = [];

				films.forEach((film) => {
					positions.push(film.position);
				});

				let maxPosition = Math.max.apply(null, positions);
				if (payload.position - maxPosition > 1) {
					payload.position = maxPosition + 1;
				}
			}
		}
		let filmID = -1;
		for (let i = 0; i < films.length; i++)
		{
			if (payload.id === films[i].id)
			{
				filmID = i;
				if (payload.title !== undefined)
				{
					films[i].title = payload.title;
				}
				if (payload.rating !== undefined)
				{
					films[i].rating = payload.rating;
				}
				if (payload.year !== undefined)
				{
					films[i].year = payload.year;
				}
				if (payload.budget !== undefined)
				{
					films[i].budget = payload.budget;
				}
				if (payload.gross !== undefined)
				{
					films[i].gross = payload.gross;
				}
				if (payload.poster !== undefined)
				{
					films[i].poster = payload.poster;
				}
				break;
			}
		}
		if (filmID === -1)
		{
			cb(ErrorObject);
		}
		fs.writeFile("top250.json", JSON.stringify(films), "utf8", function () { });
		cb(null, films[filmID]);
	}
	else
	{
		cb(ErrorObject);
	}
};