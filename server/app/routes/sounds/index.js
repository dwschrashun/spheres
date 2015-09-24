var router = require('express').Router();
module.exports = router;

var mongoose = require('mongoose');
var Sound = mongoose.model('Sound');
//load all audio files
router.get("/", function (req, res, next) {
	console.log("hit route");
	Sound.find().then(function(sounds){
		// console.log(sounds);
		res.send(sounds);
	});
	// res.send("eventually this will send the audio files");
});
