app.factory('SoundFactory', function(){

	var noteList = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
	var notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3','B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];
	var keys = ["65", "87", "83", "69", "68", "70", "84", "71", "89", "72", "85", "74", "49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "189", "187"];

	function noteObj (pitch, key) {
		this.pitch = pitch;
		this.key = key;
		this.freq = getFrequency(pitch);
		this.duration = .4;
	}

	//hashmap of keyCodes onto note objects
	var keyMap = [];
	keys.forEach(function(keyCode, index) {
		keyMap[keyCode] = {
			freq: getFrequency(notes[index]),
			note: notes[index],
			duration: .4
		};
	});

	//array holding references to each note sequentially from a3
	var noteMap = [];
	notes.forEach(function (note, index) {
		noteMap.push(new noteObj(note, keys[index]));
	});

	function getNoteObj (noteName) {
		var noteObj = 0;
		noteMap.forEach(function (nobj) {
			if (nobj.pitch === noteName) noteObj = nobj;
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
		if (keyNumber < 3) {
		    keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1;
		} else {
		    keyNumber = keyNumber + ((octave - 1) * 12) + 1;
		}
		// Return frequency of note
		return 440 * Math.pow(2, (keyNumber- 49) / 12);
	}

	//var keyArr = ["8","9","13","16","17","18","19","20","27","33","34","35","36","37","38","39","40","45","46","48","49","50","51","52","53","54","55","56","57","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","96","97","98","99","100","101","102","103","104","105","106","107","109","110","111","186","187","188","189","190","191","192","219","220","221","222"];
	// var cMaj = [
	// 	{freq: getFrequency("C4"), duration: 1},
	// 	{freq: getFrequency("E4"), duration: 1},
	// 	{freq: getFrequency("G4"), duration: 1}
	// ];



	return {
		getKeyNote: getKeyNote,
		getFrequency: getFrequency,
		getNoteObj: getNoteObj
	};

});
