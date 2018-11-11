module.exports.valid = function(url, payload) {
	let res = false;
	switch (url) {
		case '/api/actors/read':
			if (payload.id !== undefined)
				res = true;
			break;
		case '/api/actors/delete':
			if (payload.id !== undefined)
				res = true;
			break;
		case '/api/actors/create':
			if (payload.name !== undefined && payload.birth !== undefined
				&& payload.films !== undefined && payload.liked !== undefined
				&& payload.photo !== undefined)
			{
				if ((payload.liked > 0 || payload.liked === null)
					&& (payload.films > 0 || payload.films === null))
				{
					res = true;
				}
			}
			break;
		case '/api/actors/update':
			if (payload.id !== undefined
				&& (payload.liked > 0 || payload.liked === null || payload.liked === undefined)
				&& (payload.films > 0 || payload.films === null || payload.films === undefined))
			{
				res = true;
			}
			break;
	}
	return res;
};