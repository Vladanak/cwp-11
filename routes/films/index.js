const express = require('express');
const router = express.Router();
const logger = require('../../log/log.js');

const readAllFilms = require("./readAllFilms").readAll;
const readFilm = require("./readFilm").readFilm;
const createFilm = require("./createFilm").createFilm;
const updateFilm = require("./updateFilm").updateFilm;
const deleteFilm = require("./deleteFilm").deleteFilm;


router.get('/readall', (req, res) =>
{
	console.log("readall");
	logger.log(`${req.url.toString()}\n`);
	readAllFilms(req, res, (err, result) =>
	{
		res.send(JSON.stringify(result));
	});
});

router.get('read/:id', (req, res) =>
{
	console.log("read: " + req.params.id);
	logger.log(`${req.url.toString() + " " + req.params.id}\n`);
	readFilm(req, res, req.params, (err, result) =>
	{
		if (err)
		{
			res.send(JSON.stringify(err));
		}
		else
		{
			res.send(JSON.stringify(result));
		}
	});
});

router.post('/create', (req, res) => {
	console.log("create");
	logger.log(`${req.url.toString() + " " + req.body}\n`);
	req = req.body;
	createFilm(req, res, req, (err, result) =>
	{
		if (err)
		{
			res.send(JSON.stringify(err));
		}
		else
		{
			res.send(JSON.stringify(result));
		}
	});
});

router.post('/update', (req, res) => {
	console.log("update");
	logger.log(`${req.url.toString() + " " + req.body}\n`);
	req = req.body;
	updateFilm(req, res, req, (err, result) =>
	{
		if (err)
		{
			res.send(JSON.stringify(err));
		}
		else
		{
			res.send(JSON.stringify(result));
		}
	});
});

router.post('/delete', (req, res) => {
	console.log("delete");
	logger.log(`${req.url.toString() + " " + req.body}\n`);
	req = req.body;
	deleteFilm(req, res, req, (err, result) =>
	{
		if (err)
		{
			res.send(JSON.stringify(err));
		}
		else
		{
			res.send(JSON.stringify(result));
		}
	});
});

module.exports = router;