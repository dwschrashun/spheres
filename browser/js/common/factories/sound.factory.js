app.factory('SoundFactory', function($http){

	var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
	var keyArr = ["8","9","13","16","17","18","19","20","27","33","34","35","36","37","38","39","40","45","46","48","49","50","51","52","53","54","55","56","57","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","96","97","98","99","100","101","102","103","104","105","106","107","109","110","111","186","187","188","189","190","191","192","219","220","221","222"];
	var keyMap = [];
	var cMaj = [
		{freq: getFrequency("C4"), duration: 1},
		{freq: getFrequency("E4"), duration: 1},
		{freq: getFrequency("G4"), duration: 1}
	];

	keyArr.map(function(keyCode, index) {
		keyMap[keyCode] = {
			freq: "" + getFrequency("" + notes[index % 12] + ((keyCode % 3) + 3)),
			note: "" + notes[index % 12] + ((keyCode % 3) + 3),
			duration: 1
		};
	});

	function getNotes () {
		return cMaj;
	}

	function getKeyNote(keyCode) {
		if (!keyMap[keyCode]) return false;
		return keyMap[keyCode];
	}

	function getFrequency (note) {

	    var octave,
	        keyNumber;
	    if (note.length === 3) {
	        octave = note.charAt(2);
	    } else {
	        octave = note.charAt(1);
	    }
	    keyNumber = notes.indexOf(note.slice(0, -1));
	    if (keyNumber < 3) {
	        keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1; 
	    } else {
	        keyNumber = keyNumber + ((octave - 1) * 12) + 1; 
	    }
	    // Return frequency of note
	    return 440 * Math.pow(2, (keyNumber- 49) / 12);
	}

	return {
		getNotes: getNotes,
		getKeyNote: getKeyNote,
		getFrequency: getFrequency
	};

});
