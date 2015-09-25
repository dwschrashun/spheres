var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    note: {type: String}, //eg. "C#4"
	frequency: {type: Number},
	x: {type: Number},
	y: {type: Number}
});

mongoose.model('Star', schema);
