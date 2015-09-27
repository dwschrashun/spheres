app.config(function($stateProvider){
	$stateProvider.state('gameover', {
		url: '/gameover',
		templateUrl: 'js/gameOver/gameover.html',
		controller: function($scope, $rootScope, $state){
			$scope.restart = function () {
				$state.go('welcome');
			};
		}
	});
});
