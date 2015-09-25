var router = require('express').Router();
module.exports = router;

router.post("/", function (req, res, next) {
	res.send("eventually this will send the audio files");
});
