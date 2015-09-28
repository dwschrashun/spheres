app.config(function($stateProvider){
	$stateProvider.state('welcome', {
		url: '/',
		templateUrl: 'js/welcome/welcome.html',
		controller: function($scope, $rootScope, StarNoteFactory, $state, $document){
			$rootScope.startGame = function (){
				StarNoteFactory.loadAllShapes()
				.then(function(shapes){
					$state.go('home');
				});
			};
			$scope.start = function () {
				$rootScope.gameOver = false;
				// console.log('broadcasting');
				$rootScope.$broadcast("widenBorder");
				$rootScope.$broadcast("fadeOut");
				setTimeout(function(){
					$rootScope.startGame();
				}, 1000);
			};

			setTimeout(function(){
				$rootScope.$broadcast("welcomeFlicker");
			},1000);
		}
	});
});
