app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'js/home/home.html',
        controller: function ($scope, $window, SoundFactory, StarNoteFactory, StarDrawingFactory, $rootScope, Utility, $state, $timeout, $location) {

        	//global definitions...yeah i know

        	var i = 0,
        		correct = false,
        		round = 1,
        		currentNotes = [],
        		intervalId,
        		currentShape,
        		completedStars = 0,
        		playedKeys= [];

        	//scope variable definitions

        	$scope.stars = [];
        	$scope.lines = [];
			$scope.absUrl = $location.absUrl();
			$scope.playBackground = true;
			$scope.showDirections = false;

			//function definitions

			function innerLoop(arr, interval){
		       	for (var j = 0; j < arr.length; ++j) {
	       			setDelay(arr[j], j, arr);
		        }
		    }

			function doubleLoop(arr){
				$rootScope.delayTime = 3000+(400*arr.length);
				clearInterval(intervalId);
			   	intervalId = setInterval(function () {
			    	innerLoop(arr, intervalId);
			    }, $rootScope.delayTime);
			}

			//for flickering purposes
			function checkAnyNote(keyCode){
				var anyCoords;
				var matchAny = currentNotes.some(function(shapeNote, index){
					var anyMatch = (keyCode.toString() === currentNotes[index].key);
					if (anyMatch){
						anyCoords = currentNotes[index].x + "-" + currentNotes[index].y;
					}
					return anyMatch;
				});
				return anyCoords;
			}

			//this function is for flickering a note when its played by the user
			function checkSingleNote (keyCode){
				var theCoords;
				// var prevCoords = [];
				var comparator = currentNotes[currentNotes.length-1];
				var match = (keyCode.toString() === comparator.key);
				//if the played note matches the last note in the array
				//AND we didn't play it already, then it's the right note
				if (match){
					theCoords = comparator.x + "-" + comparator.y;
					//if we already recorded those coords, loop through to
					//see if we're talking about a different note
					// if (prevCoords.indexOf(theCoords) > -1) {
					//
					// }
					// prevCoords.push(theCoords);
				}
				return theCoords;
			}

			function checkCurrentNotes (keyCode) {
        		playedKeys.push(keyCode);
        		var checkNotes = playedKeys.map(function (item) {
        			return item;
        		});
        		checkNotes.splice(0, playedKeys.length - currentNotes.length);
        		var passed = currentNotes.every(function(shapeNote, index){
					if (!checkNotes[index]) return false;
        			return shapeNote.key.toString() === checkNotes[index].toString();
        		});
        		return passed;
        	}

			//logic

        	$scope.$on("attempt", function (event, keyCode) {
				doubleLoop(currentNotes);

				//for flickering purposes
				var anyCoordsObj = checkAnyNote(keyCode);
				if (anyCoordsObj){
					console.log('BROADCASTING FOR FLICKER', anyCoordsObj);
					$rootScope.$broadcast("anyNote", anyCoordsObj);
				}

				var coordsObj = checkSingleNote(keyCode);
				if (coordsObj) {
					// coordsObj = coordsObj.x + "-" + coordsObj.y;
					// console.log('BROADCASTING', coordsObj);
					$rootScope.$broadcast("matchingNote", coordsObj);
				}

        		if (checkCurrentNotes(keyCode)) {
        			correct = true;
        			playedKeys = [];
					// console.log('correct!');
					//go to next round when you've hit all the right notes
					if (round === currentShape.stars.length) {
						$scope.beatRound = true;
						completedStars += currentShape.stars.length;
						drawLines();
						playNextLevel();
					} else { //got it right but not done with round
	        			round++;
	        			playRound(currentShape.stars, round);
					}
        		}
        	});

			//called on keyup, calls playNote with noteobject
        	$scope.playKey = function (keyEvent) {
        		if (SoundFactory.getKeyNote(keyEvent.keyCode)) {
        			$scope.$emit("attempt", keyEvent.keyCode);
        			playNote(SoundFactory.getKeyNote(keyEvent.keyCode));
        		}
        	};

			//initialize audio settings
        	$scope.setAudio = function () {
        		$window.AudioContext = $window.AudioContext||$window.webkitAudioContext;
    			$scope.context = new AudioContext();
				$scope.gainNode = $scope.context.createGain();
				$scope.convolver = $scope.context.createConvolver();
				$scope.filter = $scope.context.createBiquadFilter();
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
				//console.log("LOOK", star, star.x, star.y);
				$rootScope.$broadcast("playingNote", star.x + "-" + star.y);
    			var note = createNote(star);
				console.log("NOTE: ",star.note);
    			var now = $scope.context.currentTime;


				//first time, get the buffer. after that just play the sound
				function initializeNodes(){
					$scope.gainNode.connect($scope.convolver);
					$scope.convolver.connect($scope.filter);
					$scope.filter.connect($scope.context.destination);
					// Create and specify parameters for the low-pass filter.
					$scope.filter.type = 'lowpass'; // See BiquadFilterNode docs
					$scope.filter.frequency.value = 1440; // Set cutoff to 440 HZ

					$scope.gainNode.gain.cancelScheduledValues(now);
					$scope.gainNode.gain.setValueAtTime(0, now);
					// $scope.gainNode.gain.linearRampToValueAtTime(0, now + note.duration - 0.1);
					$scope.gainNode.gain.linearRampToValueAtTime(.6, now + note.duration - 0.35);
					// $scope.gainNode.gain.linearRampToValueAtTime(1, now + 0.3);
					$scope.gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
					note.start();
					note.stop(now + note.duration-.1);
				}

				if (!$scope.convolver.buffer) {
					var request = new XMLHttpRequest();
					//request.open("GET", "http://localhost:1337/audio/york-minister.wav", true);
					// request.open("GET", "http://schrashun.com/spheres/mp3/york-minister.wav", true);
					request.open("GET", "http://pure-hamlet-1604.herokuapp.com/audio/york-minister.wav", true);
					request.responseType = "arraybuffer";
					request.onload = function () {
						console.log("convolver get response:", request.response);
						$scope.context.decodeAudioData(request.response, function(buffer) {
							$scope.mainBuffer = buffer;
							$scope.convolver.buffer = buffer;
							initializeNodes();
						});
					};
					request.send();
				} else {
					$scope.convolver.buffer = $scope.mainBuffer;
					initializeNodes();
				}
    		}

			//turn each note in an array of notes into notes objects that the oscillator can play
			function addNotes (arr) {
				return arr.map(function (current) {
						return createNote(current);
				});
			}

		    function setDelay(star, index, stars) {
	        	setTimeout(function() {
					if($scope.stars.length - completedStars <= index) {
						// console.log("pushing star");
						$scope.stars.push(star);
						$scope.$digest();
					}
					playNote(star);

				}, index * 500);
			}





			function playNextLevel (){
				setTimeout(function(){
					$scope.beatRound = false;
				}, 1000);
				round = 1;

				var shape = StarNoteFactory.getRandomShape();
				// console.log("llop?", $scope.bgLoop);
				$scope.bgLoop = shape.loop;
				//$scope.previousShape = $scope.currentShape;
				// $scope.currentShape = shape;
				if (!shape){
					endGame();
				} else {
					// //save non-randomized star order for line drawing?
					// starsInOrder = shape.stars;
					//give each star a noteObj
					shape.stars.forEach(function(star){
						var noteObj = SoundFactory.getNoteObj(star.note);
						for (var key in noteObj) {
							star[key] = noteObj[key];
						}
					});
					currentShape = shape;
					shape.stars = Utility.shuffle(shape.stars);
					playRound(shape.stars, round);
				}
			}

			function playRound (stars, roundToPlay) {
				var tempStars = stars.map(function (star) {
					return star;
				});
				tempStars.splice(roundToPlay, stars.length - roundToPlay);
				currentNotes = tempStars;
				correct = false;
				doubleLoop(tempStars);
			}

			function drawLines () {
				currentShape.stars.forEach(function (star, index) {
					var length = Utility.getLength(star);
					var style = `stroke-dasharray: ${length}; stroke-dashoffset: ${length}; stroke: white`;
					$scope.lines.push({x1: star.x, y1: star.y, x2: star.nextX, y2: star.nextY, style: style});
				});
				console.log("LINES", $scope.lines);
				$timeout(function () {
					$scope.$digest();
				}, 0);
			}

			$scope.backToWelcome = function(){
				$rootScope.$broadcast("fadeOut");
				$rootScope.$broadcast("narrowBorder");
				setTimeout(function(){
					$state.go('welcome');
				}, 1000);
			};

			function endGame(){
				// console.log('you won!');
				clearInterval(intervalId);

				setTimeout(function(){
					$rootScope.$broadcast("welcomeFlicker");
				},1000);
				$rootScope.gameOver = true;
				// console.log('$rootScope.gameOver', $rootScope.gameOver);
			}
			$scope.setAudio();
			playNextLevel();

			$scope.toggleBackground = function () {
				$scope.playBackground = !$scope.playBackground;
			};

			$scope.toggleDirections = function () {
				$scope.showDirections = !$scope.showDirections;
				console.log("directions?", $scope.showDirections);
			};

        },


        resolve : {
        }
    });
});
