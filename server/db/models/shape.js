var mongoose = require('mongoose');


var schema = new mongoose.Schema({
	name: String,
	stars: [{
		x: Number,
		y: Number
	}]
    // stars: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "Star"}]
});

mongoose.model('Shape', schema);
