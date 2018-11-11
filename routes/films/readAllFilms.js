let films = require("../../top250.json");
const fs = require('fs');
const defaultValues = {
	"sortField": "position",
	"sortOrder": "asc"
};
let compareField = defaultValues.sortField;
let compareOrder = defaultValues.sortOrder;

function compareCustom(a, b) {
	if (a[compareField] > b[compareField])
	{
		return compareOrder === "asc" ? 1 : -1;
	}
	if (a[compareField] < b[compareField])
	{
		return compareOrder === "asc" ? -1 : 1;
	}
}

module.exports.readAll = function(req, res, cb) {
	films.sort(compareCustom);
	fs.writeFile("top250.json", JSON.stringify(films), "utf8", () => {});
	cb(null, films);
};