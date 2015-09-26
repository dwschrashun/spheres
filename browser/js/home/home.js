app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function ($scope, $window, SoundFactory, StarNoteFactory, StarDrawingFactory, $rootScope, Utility) {
        	var i = 0,
        		correct = false,
        		round = 1,
        		currentNotes = [],
        		intervalId,
        		currentShape,
        		playedKeys= [];

        	$scope.stars = [];

        	$scope.$on("attempt", function (event, keyCode) {
				doubleLoop(currentNotes);
        		if (checkCurrentNotes(keyCode)) {
        			correct = true;
        			playedKeys = [];

					//go to next round when you've hit all the right notes
					if (round === currentShape.stars.length) {
						playNextLevel();
					} else {
	        			round++;
	        			playRound(currentShape.stars, round);
					}
        		}
        	});

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

			//called on keyup, calls playNote with noteobject
        	$scope.playKey = function (keyEvent) {
        		if (SoundFactory.getKeyNote(keyEvent.keyCode)) {
        			$scope.$emit("attempt", keyEvent.keyCode);
        			playNote(SoundFactory.getKeyNote(keyEvent.keyCode));
        		}
        	};

        	//plays computer notes
        	$scope.playAuto = function (clickEvent) {
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
    			$scope.gainNode.gain.linearRampToValueAtTime(1, now + 0.2);
    			$scope.gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
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
				StarNoteFactory.loadAllShapes()
				.then(function(shapes){
					playNextLevel();
				});
			};

		    function setDelay(item, index) {
	        	setTimeout(function(){
	        		console.log("item, last item", item, $scope.stars[$scope.stars.length-1]);
	        		if ($scope.stars[$scope.stars.length-1] && $scope.stars[$scope.stars.length-1].x === item.x && $scope.stars[$scope.stars.length-1].y === item.y) {
						//animate
						console.log("animate");
					}
					else {
						$scope.stars.push(item);
						$scope.$digest();
					}
					console.log("scope stars", $scope.stars);
					playNote(item);
				}, index * 500);
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
			    }, 4000);
			}

			function playNextLevel (){
				round = 1;
				var shape = StarNoteFactory.getRandomShape();

				if (!shape){
					gameOver();
				} else {
					//give each star a noteObj
					shape.stars.forEach(function(star){
						var noteObj = SoundFactory.getNoteObj(star.note);
						for (var key in noteObj) {
							star[key] = noteObj[key];
						}
					});
					currentShape = shape;
					console.log("stars", currentShape.stars);
					// StarDrawingFactory.drawStars(el, shape.stars);
					shape.stars = Utility.shuffle(shape.stars);
					playRound(shape.stars, round);
				}
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

			function gameOver(){
				console.log('you won!');
				clearInterval(intervalId);
			}
			$scope.setAudio();

        },

        resolve : {
        }
    });
});
