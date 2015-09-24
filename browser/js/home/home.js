app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function ($scope) {
        	$scope.registerKey = function (keyEvent) {
        		console.log("here", keyEvent);
        	};
        }
    });
});