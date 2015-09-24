var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    key: {
        type: Number,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    color: {
    	type: String
    },
    sound: {
    	type: Number,
    	required: true
    }
});


mongoose.model('Event', schema);
