app.config(function($stateProvider){
	$stateProvider.state('welcome', {
		url: '/',
		templateUrl: 'js/welcome/welcome.html',
		controller: function($scope, $rootScope, StarNoteFactory, $state, $document){
			// $rootScope.startGame = function (){
			// 	StarNoteFactory.loadAllShapes()
			// 	.then(function(shapes){
			// 		console.log('starting game from welcome controller', shapes);
			// 		$state.go('home');
			// 	});
			// };
			// $scope.start = function () {
			// 	$rootScope.canvas = document.getElementById('sky');
			// 	console.log("start! rootscope canvas: ", $rootScope.canvas);
			// 	$rootScope.startGame();
			// };
		}
	});
});
