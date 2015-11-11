var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Shape = mongoose.model('Shape');

router.get("/", function(req,res){
	Shape.find({})
	.then(function(shapes){
		res.send(shapes);
	});
});
