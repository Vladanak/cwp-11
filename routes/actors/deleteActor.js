let actors = require("../../actors.json");
const valid = require("./valid");
const fs = require('fs');
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.deleteActor = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload))
	{
		let deletedActorId = payload.id;
		let deletedActorI = -1;
		let flag = false;
		for (let i = 0; i < actors.length; i++)
		{
			if (actors[i].id === deletedActorId)
			{
				flag = true;
				deletedActorI = i;
				break;
			}
		}
		if (flag) {
			cb(actors[deletedActorI]);
			fs.writeFile("actors.json", JSON.stringify(actors), "utf8", () => {});
			actors.splice(deletedActorI, 1);
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