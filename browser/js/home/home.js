app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'js/home/home.html',
        controller: function ($scope, $window, SoundFactory, StarNoteFactory, StarDrawingFactory, $rootScope, Utility, $state) {
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
				$scope.convolver = $scope.context.createConvolver();
				// $scope.compressor = $scope.context.createDynamicsCompressor();
				// $scope.compressor.threshold.value = -50;
				// $scope.compressor.knee.value = 40;
				// $scope.compressor.ratio.value = 12;
				// $scope.compressor.reduction.value = -20;
				// $scope.compressor.attack.value = 0;
				// $scope.compressor.release.value = 0.25;
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
				console.log("NOTE: ",note);
    			var now = $scope.context.currentTime;

				$scope.gainNode.connect($scope.convolver);
				$scope.convolver.connect($scope.context.destination);

				var request = new XMLHttpRequest();
				request.open("GET", "york-minister.wav", true);
				request.responseType = "arraybuffer";

				request.onload = function () {
					$scope.context.decodeAudioData(request.response, function(buffer) {
						$scope.convolver.buffer = buffer;
		    			$scope.gainNode.gain.cancelScheduledValues(now);
		    			$scope.gainNode.gain.setValueAtTime(0, now);
						// $scope.gainNode.gain.linearRampToValueAtTime(0, now + note.duration - 0.1);
						$scope.gainNode.gain.linearRampToValueAtTime(1, now + note.duration - 0.35);
		    			// $scope.gainNode.gain.linearRampToValueAtTime(1, now + 0.3);
		    			$scope.gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
		    			console.log("playing:", star.note);
		    			note.start();
		    			note.stop(now + note.duration-.1);
						// plotStar(star);

					});
				}
				request.send();

    		}

			//turn each note in an array of notes into notes objects that the oscillator can play
			function addNotes (arr) {
				return arr.map(function (current) {
						return createNote(current);
				});
			}

		    function setDelay(star, index) {
	        	setTimeout(function() {
	        		// if ($scope.stars[$scope.stars.length-1] && $scope.stars[$scope.stars.length-1].x === star.x && $scope.stars[$scope.stars.length-1].y === star.y) {
					// 	// $scope.$broadcast("playingNote", item.x + "-" + item.y);
					// 	// $scope.$emit("playingNote", item.x + "-" + item.y);
					// }
					// else {
					// 	// console.log("star item", star);
					// 	$scope.stars.push(star);
					// 	$scope.$digest();
					// }
					// console.log("scope stars", $scope.stars);
					// console.log('star to be placed: ', star);
					///////////////
	        		console.log(index, $scope.stars.length);
					if($scope.stars.length <= index) {
						console.log("pushing star");
						$scope.stars.push(star);
						$scope.$digest();
					}
					playNote(star);
				}, index * 800);
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
			    }, 3000+(1000*arr.length));
			}

			function playNextLevel (){
				//console.log('playing level');
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
					//console.log("stars", currentShape.stars);
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

			// function plotStar(star){
			// 	StarDrawingFactory.drawStars($scope.canvas, [star]);
			// }

			function gameOver(){
				console.log('you won!');
				clearInterval(intervalId);
				$state.go('gameover');
				//cool for now but should probably
				//do something better like flicker
				//all the stars and fade the replay
				//button onto the page
			}
			$scope.setAudio();
			playNextLevel();
        },

        resolve : {
        }
    });
});
