app.directive("sky", function(StarDrawingFactory) {
	return {
		restrict: "A",
		templateUrl: '',
		// scope: {
		// 	drawStars: "="
		// },
		link: function (scope, element, attributes) {
			scope.drawStars = function () {
				console.log("click");
				StarDrawingFactory.drawStars(element, [{x:200, y:200}]);
			}
		}
	};
});
