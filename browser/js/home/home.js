app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function ($scope, findSounds, $window) {

        	$scope.registerKey = function (keyEvent) {
        		console.log("KeyCode: ", keyEvent.keyCode);
        	};
        	$scope.play = function (clickEvent) {
        		console.log("Click X, Y: " + clickEvent.x + ", " + clickEvent.y);
        	};
        	$scope.setAudio = function () {
        		$window.AudioContext = $window.AudioContext||$window.webkitAudioContext;
    			$scope.context = new AudioContext();
				console.log("findSounds in state: ",findSounds);
				console.log("type of findsounds in state: ", typeof findSounds);

				// $scope.context.createBufferSource();

    			$scope.context.decodeAudioData(findSounds,
					function (buffer) {
						console.log("loaded audio: ", buffer);
    					$scope.sound = buffer;
    			}, function(err){
					console.log("error: ", err);
				});
        	};
			$scope.setAudio();
        },
        resolve : {
        	findSounds: function (SoundFactory) {
        		return SoundFactory.getAllSounds().then(function (sounds) {
					console.log("sounds in resolve: ", sounds);
        			return sounds;
        		});
        	}
        }
    });
});
