const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
	res.send("Hello World! \n CWP-11");
	console.log("index");
});

module.exports = router;