app.directive("star", function() {
	return {
		restrict: "A",
		templateUrl: '',
		link: function (scope, element, attributes) {
			scope.$on("levelPass", function (event, coords) {
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
