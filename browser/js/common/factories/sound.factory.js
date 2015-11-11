app.factory('SoundFactory', function(){

	var noteList = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
	var notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3','B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];
	var keys = ["65", "87", "83", "69", "68", "70", "84", "71", "89", "72", "85", "74", "49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "189", "187"];

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

	function noteObj (pitch, key) {
		this.pitch = pitch;
		this.key = key;
		this.freq = getFrequency(pitch);
		this.duration = 0.4;
	}

	//array holding references to each note sequentially from a3
	var noteMap = [];
	notes.forEach(function (note, index) {
		noteMap.push(new noteObj(note, keys[index]));
	});

	//hashmap of keyCodes onto note objects
	var keyMap = [];
	keys.forEach(function(keyCode, index) {
		keyMap[keyCode] = {
			freq: getFrequency(notes[index]),
			note: notes[index],
			duration: 0.4
		};
	});

	function getNoteObj (noteName) {
		console.log("getting note", noteName);
		var noteObject = 0;
		noteMap.forEach(function (nobj) {
			if (nobj.pitch === noteName) noteObject = nobj;
		});
		if (noteObject) return noteObject;
		else throw new Error ("note not found");
	}

	function getKeyNote(keyCode) {
		console.log(keyCode);
		if (keyCode === 220) return keyMap[65];
		if (!keyMap[keyCode]) return false;
		return keyMap[keyCode];
	}

	return {
		getKeyNote: getKeyNote,
		getFrequency: getFrequency,
		getNoteObj: getNoteObj
	};

});
