app.directive("fadeOut", function() {
	return {
		restrict: "A",
		// templateUrl: '',
		link: function (scope, element, attributes) {
			scope.$on("fadeOut", function(event){
				element.addClass("fadeout");
			});
			// setTimeout(function(){
			// 	element.removeClass("fadeout");
			// }, 500);
		}
	};
});
