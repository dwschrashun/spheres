app.factory('SoundFactory', function($http){

	var noteList = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
	var notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'B4'];
	var keys = ["65", "87", "83", "69", "68", "70", "84", "71", "89", "72", "74", "49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "189"];

	function noteObj (note, key) {
		this.note = note;
		this.key = key;
		this.freq = getFrequency(note);
		this.duration = 1;
	}

	//hashmap of keyCodes onto note objects
	var keyMap = [];
	keys.forEach(function(keyCode, index) {
		console.log("NOTE", index, notes[index]);
		keyMap[keyCode] = {
			freq: getFrequency(notes[index]),
			note: notes[index],
			duration: 1
		};
	});


	//array holding references to each note sequentially from a3
	var noteMap = [];
	notes.forEach(function (note, index) {
		noteMap.push(new noteObj(note, keys[index]));
	});

	// keyMap.forEach(function (key){
	// 	if (key) {
	// 		key.freq = getFrequency(key.note);
	// 		//console.log("note, freq", key.note, key.freq);
	// 	}
	// })

	function getNotes () {
		return cMaj;
	}

	function getNoteObj (noteName) {
		var noteObj = 0;
		noteMap.forEach(function (nobj) {
			if (nobj.note === noteName) noteObj = nobj;
		});
		if (noteObj) return noteObj;
		else throw new Error ("note not found");
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
	    keyNumber = noteList.indexOf(note.slice(0, -1));
	    console.log(note, keyNumber);
	    if (keyNumber < 3) {
	        keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1;
	    } else {
	        keyNumber = keyNumber + ((octave - 1) * 12) + 1;
	    }
	    //console.log("Freq, note", 440 * Math.pow(2, (keyNumber- 49) / 12), note);
	    // Return frequency of note
	    return 440 * Math.pow(2, (keyNumber- 49) / 12);
	}

	//var keyArr = ["8","9","13","16","17","18","19","20","27","33","34","35","36","37","38","39","40","45","46","48","49","50","51","52","53","54","55","56","57","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","96","97","98","99","100","101","102","103","104","105","106","107","109","110","111","186","187","188","189","190","191","192","219","220","221","222"];
	var cMaj = [
		{freq: getFrequency("C4"), duration: 1},
		{freq: getFrequency("E4"), duration: 1},
		{freq: getFrequency("G4"), duration: 1}
	];

	return {
		getNotes: getNotes,
		getKeyNote: getKeyNote,
		getFrequency: getFrequency
	};

});
