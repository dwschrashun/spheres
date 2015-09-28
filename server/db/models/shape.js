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
	mode: String
});

// schema.virtual("stars.lineLength").get(function (){	 
// 	var xs = this.nextX - this.x;
// 	xs = xs * xs;
	 
// 	var ys = this.nextY - this.y;
// 	ys = ys * ys;
	 
// 	return Math.sqrt( xs + ys );
// });

mongoose.model('Shape', schema);
