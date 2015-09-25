var mongoose = require('mongoose');


var schema = new mongoose.Schema({
	name: String,
	stars: [{
		x: Number,
		y: Number,
		note: String
	}],
	mode: String
});

mongoose.model('Shape', schema);
