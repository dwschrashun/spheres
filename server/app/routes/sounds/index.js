var router = require('express').Router();
module.exports = router;

router.post("/", function (req, res, next) {
	console.log("hit route");
	res.send("eventually this will send the audio files");
});
