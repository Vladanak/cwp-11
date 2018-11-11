let actors = require("../../actors.json");
const fs = require('fs');
const defaultValues = {
	"sortField": "liked",
	"sortOrder": "desc"
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
	actors.sort(compareCustom);
	fs.writeFile("actors.json", JSON.stringify(actors), "utf8", () => {});
	cb(null, actors);
};