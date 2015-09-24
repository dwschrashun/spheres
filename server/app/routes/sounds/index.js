var router = require('express').Router();
module.exports = router;

var mongoose = require('mongoose');
var Sound = mongoose.model('Sound');
//load all audio files
router.get("/", function (req, res, next) {
	console.log("hit route");
	Sound.find().then(function(sounds){
		console.log("sounds on backend", sounds[0].sound);
		console.log("type of sounds on backend", typeof sounds[0].sound);

		// res.set('Content-Type', 'buffer');
		res.send(sounds[0].sound);
	});
});
