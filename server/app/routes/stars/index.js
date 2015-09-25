var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Star = mongoose.model('Star');
var Shape = mongoose.model('Shape');

router.get("/:shape", function(req,res,next){
	Shape.findOne({name: req.params.shape})
	.then(function(shape){
		res.send(shape);
	});
});
