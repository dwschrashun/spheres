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
    			$scope.context.decodeAudioData(findSounds).then(function (buffer) {
    				$scope.sound = buffer;
    			});
        	};
        },
        resolve : {
        	findSounds: function (SoundFactory) {
        		SoundFactory.getAllSounds().then(function (sounds) {
        			return sounds;
        		});
        	}
        }
    });
});
