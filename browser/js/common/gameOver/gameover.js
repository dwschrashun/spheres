app.config(function($stateProvider){
	$stateProvider.state('gameOver', {
		url: '/gameover',
		templateUrl: 'js/gameOver/gameover.html',
		controller: function($scope, $rootScope, StarNoteFactory, $state, $document){
			$scope.restart = function () {
				$rootScope.startGame();
			};
		}
	});
});
