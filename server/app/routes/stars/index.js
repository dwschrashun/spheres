var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Star = mongoose.model('Star');
var Shape = mongoose.model('Shape');

router.post("/", function (req, res, next) {
	console.log("hit star route", req.body);
	// Star.create({
	// 	x: 200,
	// 	y: 200
	Shape.findOne({name: req.body.shape})
	.then(function(shape){
		console.log('found the shape!', shape);
		res.send(shape);
	});
});
