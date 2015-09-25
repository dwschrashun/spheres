app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function ($scope, $window, SoundFactory, StarNoteFactory, StarDrawingFactory, $rootScope) {
        	var i = 0;
			$scope.shapes = []; //array of constellations

			var shapeOptions = [
				"square",
				"rectangle"
			];

			//called on keyup, calls playNote with noteobject

        	$scope.playKey = function (keyEvent) {
        		console.log("Keynote", SoundFactory.getKeyNote(keyEvent.keyCode));
        		if (SoundFactory.getKeyNote(keyEvent.keyCode)) {
        			playNote(SoundFactory.getKeyNote(keyEvent.keyCode));
        		}
        	};

        	//plays computer notes
        	$scope.playAuto = function (clickEvent) {
        		console.log("Click X, Y: " + clickEvent.x + ", " + clickEvent.y);
        		playNotes();
        		i = 0;
			};

			//initialize audio settings
        	$scope.setAudio = function () {
        		$window.AudioContext = $window.AudioContext||$window.webkitAudioContext;
    			$scope.context = new AudioContext();
				$scope.gainNode = $scope.context.createGain();
        	};

        	//called to play computer notes
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

        	//each note is a new oscillator object
			function createNote (noteObj) {
		    	console.log("CreateNote:", noteObj);
				var note = $scope.context.createOscillator();
				note.type = "sine";
				note.frequency.value = noteObj.freq;
				note.duration = noteObj.duration;
				note.connect($scope.gainNode);
				return note;
			}

			//connects and plays each note/oscillator,
			function playNote (noteObj) {
    			var note = createNote(noteObj);
    			var now = $scope.context.currentTime
    			$scope.gainNode.connect($scope.context.destination);
    			$scope.gainNode.gain.cancelScheduledValues(now);
    			$scope.gainNode.gain.setValueAtTime(0, now);
    			$scope.gainNode.gain.linearRampToValueAtTime(.5, now + 0.4);
    			$scope.gainNode.gain.linearRampToValueAtTime(0, now + 0.8);
    			note.start();
    			note.stop(now + note.duration);
    		}

			//turn each note in an array of notes into notes objects that the oscillator can play
			function addNotes (arr) {
				return arr.map(function (current) {
						return createNote(current);
				});
			}

			$scope.setAudio();
			$scope.nextNotes = addNotes(SoundFactory.getNotes());


			$rootScope.startGame = function (el){
				//this function gets all the stars and their
				//X-Y coords for a given constellation
				var randomShape = shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
				StarNoteFactory.makeShape(randomShape)
				.then(function(shape){
					//give each star a noteObj
					shape.stars.forEach(function(star){
						star.noteObj = SoundFactory.getNoteObj(star.note);
						// star.noteObj = SoundFactory.getFrequency(star.note);
					});
					console.log("shape with stars populated with note objs: ", shape);
					$scope.shapes.push(shape);
					//Draw the shape
					StarDrawingFactory.drawStars(el, shape.stars);

				});
			}
        },
        resolve : {
        }
    });
});
