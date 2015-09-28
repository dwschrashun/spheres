app.directive("sky", function(StarDrawingFactory, StarNoteFactory, $rootScope) {
	return {
		restrict: "A",
		templateUrl: '',
		// scope: {
		// 	drawStars: "="
		// },
		link: function (scope, element, attributes) {
			scope.start = function () {
				// console.log("start!", element);
				$rootScope.startGame(element);
			}
		}
	};
});
