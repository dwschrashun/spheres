app.directive("mainBorder", function() {
	return {
		restrict: "A",
		// templateUrl: '',
		link: function (scope, element, attributes) {
			scope.$on("widenBorder", function(event){
				element.addClass("border-grow");
			});
			scope.$on("narrowBorder", function(event){
				element.addClass("border-shrink");
			});
		}
	};
});
