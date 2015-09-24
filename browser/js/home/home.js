app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function ($scope) {
        	$scope.registerKey = function (keyEvent) {
        		console.log("KeyCode: ", keyEvent.keyCode);
        		s
        	};
        	$scope.play = function (clickEvent) {
        		console.log("Click X, Y: " + clickEvent.x + ", " + clickEvent.y);
        	};
        }
    });
});