app.directive("sky", function(StarDrawingFactory, StarNoteFactory) {
	return {
		restrict: "A",
		templateUrl: '',
		// scope: {
		// 	drawStars: "="
		// },
		link: function (scope, element, attributes) {
			scope.drawStars = function () {
				StarNoteFactory.makeShape("rectangle").then(function (shape){
					console.log("click", shape);
					StarDrawingFactory.drawStars(element, shape.stars);
				});
				
				
			}
		}
	};
});
