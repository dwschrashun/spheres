app.directive("mainBorder", function() {
	return {
		restrict: "A",
		// templateUrl: '',
		link: function (scope, element, attributes) {
			console.log('directive registered');
			scope.$on("widenBorder", function(event){
				console.log("animating!");
				element.addClass("border-animate");
			});
		}
	};
});
