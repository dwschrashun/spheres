app.directive("star", function($animate) {
	return {
		restrict: "A",
		templateUrl: '',
		link: function (scope, element, attributes) {
			scope.$on("levelPass", function (event, coords) {
				//console.log("attributes", attributes);
				if (coords === attributes.cx + "-" + attributes.cy) {
					element.addClass("animate");
					setTimeout(function () {
						element.removeClass("animate");
					}, 2000);
				}
			});
		}
	};
});
