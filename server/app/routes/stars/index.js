var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
// var Star = mongoose.model('Star');
var Shape = mongoose.model('Shape');

router.get("/", function(req,res,next){
	Shape.find({})
	.then(function(shapes){
		res.send(shapes);
	});
});
