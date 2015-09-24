app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function ($scope, $window) {
        	$scope.registerKey = function (keyEvent) {
        		console.log("KeyCode: ", keyEvent.keyCode);
        	};
        	$scope.play = function (clickEvent) {
        		console.log("Click X, Y: " + clickEvent.x + ", " + clickEvent.y);
    //     		$scope.oscillator.start();
				// $scope.oscillator.stop($scope.context.currentTime + 1);
        	};
        	$scope.setAudio = function () {
        		$window.AudioContext = $window.AudioContext||$window.webkitAudioContext;
    			$scope.context = new AudioContext();
    			$scope.oscillator = $scope.context.createOscillator();
				$scope.oscillator.type = 'square';
				$scope.oscillator.frequency.value = 3000; // value in hert
				$scope.oscillator.connect($scope.context.destination);
        	};

        	function createNote (note, length) {
        		var note = $scope.context.createOscillator();
        		note.type = "sine";
        		note.frequency.value = getFrequency(note);
        		note.frequency.value = 440;
        		note.length = length;
        		return note;
        	}

        	//turn each note in an array of notes into notes objects that the oscillator can play
        	function addNotes (arr) {
        		noteBank.push(
        			arr.map(function (current) {
        				return createNote(current.note, current.length);
        			})
        		);
        	}

        	var noteBank = [];

        	var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

			var getFrequency = function (note) {
			  
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
			};
 
        	$scope.setAudio();
        },
        resolve : {
        }
    });
});
