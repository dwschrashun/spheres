app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function ($scope, $window, SoundFactory, StarNoteFactory, StarDrawingFactory, $rootScope, Utility) {
        	var i = 0,
        		correct = false,
        		round = 1,
        		currentShape,
        		currentNotes = [],
        		intervalId,
        		playedKeys= [];

        	$scope.$on("attempt", function (event, keyCode) {
        		if (checkCurrentNotes(keyCode)) {
        			correct = true;
        			round++;
        			playedKeys = [];
        			console.log("currentShape", currentShape);
        			playRound(currentShape.stars, round);
        		}
        	});

        	function checkCurrentNotes (keyCode) {
        		playedKeys.push(keyCode);
        		var checkNotes = playedKeys.map(function (item) {
        			return item;
        		});
        		console.log("currentNotes.length: ",currentNotes.length);
        		checkNotes.splice(0, playedKeys.length - currentNotes.length);
        		console.log("playedKeys, checkNotes", playedKeys, checkNotes);
        		var passed = currentNotes.every(function(shapeNote, index){
        			console.log("shapeNote, playedNote", shapeNote.key, checkNotes[index]);
        			return shapeNote.key.toString() === checkNotes[index].toString();
        		});
        		// console.log("passed?", passed);
        		return passed;
        	}

			//called on keyup, calls playNote with noteobject
        	$scope.playKey = function (keyEvent) {
        		console.log("keyCode, Keynote", keyEvent.keyCode, SoundFactory.getKeyNote(keyEvent.keyCode));
        		if (SoundFactory.getKeyNote(keyEvent.keyCode)) {
        			$scope.$emit("attempt", keyEvent.keyCode);
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


        	//each note is created as a new oscillator object
			function createNote (star) {
				var note = $scope.context.createOscillator();
				note.type = "sine";
				note.frequency.value = star.freq;
				note.duration = star.duration;
				note.connect($scope.gainNode);
				return note;
			}

			//connects and plays each note/oscillator,
			function playNote (star) {
    			var note = createNote(star);
    			var now = $scope.context.currentTime
    			$scope.gainNode.connect($scope.context.destination);
    			$scope.gainNode.gain.cancelScheduledValues(now);
    			$scope.gainNode.gain.setValueAtTime(0, now);
    			$scope.gainNode.gain.linearRampToValueAtTime(1, now + 0.4);
    			$scope.gainNode.gain.linearRampToValueAtTime(0, now + 0.8);
    			console.log("playing:", star.note);
    			note.start();
    			note.stop(now + note.duration);
    		}

			//turn each note in an array of notes into notes objects that the oscillator can play
			function addNotes (arr) {
				return arr.map(function (current) {
						return createNote(current);
				});
			}

			//this function gets all the stars and their
			//X-Y coords for a given constellation
			$rootScope.startGame = function (el){
				$scope.canvas = el;
				StarNoteFactory.makeShape()
				.then(function(shape){
					//give each star a noteObj
					shape.stars.forEach(function(star){
						var noteObj = SoundFactory.getNoteObj(star.note);
						for (var key in noteObj) {
							star[key] = noteObj[key];
						}
					});
					currentShape = shape;
					playLevel(currentShape);
					// StarDrawingFactory.drawStars(el, shape.stars);
				});
			};

		    function setDelay(item, index) {
	          setTimeout(function(){
				plotStar(item);
				playNote(item);
	          }, index * 1000);
	        }

		    function innerLoop(arr, interval){
		       	for (var i = 0; i < arr.length; ++i) {
	       			setDelay(arr[i], i);
		        }
		    }

			function doubleLoop(arr){
				clearInterval(intervalId);
			   	intervalId = setInterval(function () {
			    	innerLoop(arr, intervalId);
			    }, 7000);
			}

			function playLevel (shape){
				shape.stars = Utility.shuffle(shape.stars);
				playRound(shape.stars, round);
			}

			function playRound (stars, round) {
				var tempStars = stars.map(function (star) {
					return star;
				});
				tempStars.splice(round, stars.length - round);
				currentNotes = tempStars;
				correct = false;
				doubleLoop(tempStars);
			}

			function plotStar(star){
				StarDrawingFactory.drawStars($scope.canvas, [star]);
			}

			$scope.setAudio();

        	//called to play computer notes
			// function playNotes () {
			// 	setTimeout(function () {
	  //   			$scope.nextNotes[i].connect($scope.context.destination);
	  //   			$scope.nextNotes[i].start();
	  //   			$scope.nextNotes[i].stop($scope.context.currentTime + $scope.nextNotes[i].duration);
   //  				i++;
   //  				if (i <$scope.nextNotes.length) {
   //  					playNotes();
   //  				}
   //  			}, $scope.nextNotes[i].duration * 1000);
   //  		}

			// $scope.nextNotes = addNotes(SoundFactory.getNotes());

				// setTimeout(function(){
				// 	shape.stars.forEach(function(star, index){
				// 		for (var i=0; i < index; i++) {
				// 			setTimeout(function(){
				// 				plotStar(shape.stars[i]);
				// 			}, 1000);
				// 		}
				// 	}, 5000);
				// })


			// function playNotes () {
			// 	setTimeout(function () {
			// 		$scope.nextNotes[i].connect($scope.context.destination);
			// 		$scope.nextNotes[i].start();
			// 		$scope.nextNotes[i].stop($scope.context.currentTime + $scope.nextNotes[i].duration);
			// 		i++;
			// 		if (i <$scope.nextNotes.length) {
			// 			playNotes();
			// 		}
			// 	}, $scope.nextNotes[i].duration * 1000);
			// }

			//draw star, play note,
        },

        resolve : {
        }
    });
});
