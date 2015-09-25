app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function ($scope, $window, SoundFactory, StarNoteFactory, StarDrawingFactory) {
        	var i = 0;
			$scope.shapes = []; //array of constellations

			//called on keyup, calls playNote with noteobject
        	$scope.playKey = function (keyEvent) {
        		console.log("Keynote", SoundFactory.getKeyNote(keyEvent.keyCode));
        		if (SoundFactory.getKeyNote(keyEvent.keyCode)) {
        			playNote(SoundFactory.getKeyNote(keyEvent.keyCode));
        		}
        	};
        	$scope.playAuto = function (clickEvent) {
        		console.log("Click X, Y: " + clickEvent.x + ", " + clickEvent.y);
        		playNotes();
        		i = 0;
			};

			function playNotes () {
				setTimeout(function () {
	    			$scope.nextNotes[i].connect($scope.context.destination);
	    			$scope.nextNotes[i].start();
	    			$scope.nextNotes[i].stop($scope.context.currentTime + $scope.nextNotes[i].duration);
    				i++;
    				if (i <$scope.nextNotes.length) {
    					playNotes();
    				}
    			}, $scope.nextNotes[i].duration * 1000);
    		}

    		function playNote (noteObj) {
    			var note = createNote(noteObj);
    			note.connect($scope.context.destination);
    			note.start();
    			note.stop($scope.context.currentTime + note.duration);
    		}

        	$scope.setAudio = function () {
        		$window.AudioContext = $window.AudioContext||$window.webkitAudioContext;
    			$scope.context = new AudioContext();
    			$scope.oscillator = $scope.context.createOscillator();
				$scope.oscillator.type = 'square';
        	};

		    function createNote (noteObj) {
		    	console.log("CreateNote:", noteObj);
				var note = $scope.context.createOscillator();
				note.type = "sine";
				note.frequency.value = noteObj.freq;
				note.duration = noteObj.duration;
				return note;
			}

			//turn each note in an array of notes into notes objects that the oscillator can play
			function addNotes (arr) {
				return arr.map(function (current) {
						return createNote(current);
				});
			}

			function getShape (shape){
				return StarNoteFactory.makeShape(shape);
			}

			$scope.setAudio();
			$scope.nextNotes = addNotes(SoundFactory.getNotes());

			//this function gets all the stars and their
			//X-Y coords for a given constellation
			getShape('rectangle').then(function(shape){
				//here is probably where we will associate notes with shapes
				$scope.shapes.push(shape);
				console.log("just made this cool shape: ", shape);
			});
        },
        resolve : {
        }
    });
});
