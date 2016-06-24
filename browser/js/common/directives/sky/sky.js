app.directive("sky", function(StarDrawingFactory, StarNoteFactory, $rootScope) {
	return {
		restrict: "A",
		templateUrl: '',
		link: function (scope, element, attributes) {
			scope.start = function () {
				$rootScope.startGame(element);
			};
		}
	};
});
