var mongoose = require('mongoose');


var schema = new mongoose.Schema({
	name: String,
	stars: [{
		x: Number,
		y: Number,
		nextX: Number,
		nextY: Number,
		note: String,
	}],
	mode: String,
	loop: String
});


mongoose.model('Shape', schema);
