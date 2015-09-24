var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    sound: {
    	type: Buffer,
    }
});

mongoose.model('Sound', schema);