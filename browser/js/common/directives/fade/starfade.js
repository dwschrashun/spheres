app.directive("starFade", function() {
	return {
		restrict: "A",
		// templateUrl: '',
		link: function (scope, element, attributes) {
			scope.$on("starFade", function(event){
				console.log('fading');
				element.addClass("starfade");
			});
		}
	};
});
