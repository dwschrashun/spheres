var router = require('express').Router();
module.exports = router;

router.get("/", function (req, res, next) {
	console.log("hit route");
	res.send("eventually this will send the audio files");
});

