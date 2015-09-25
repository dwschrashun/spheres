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

        	$scope.playKey = function (keyEvent) {
        		console.log("Keynote", SoundFactory.getKeyNote(keyEvent.keyCode));
        		playNote(SoundFactory.getKeyNote(keyEvent.keyCode));
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
