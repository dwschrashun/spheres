app.directive("starFade", function() {
	return {
		restrict: "A",
		// templateUrl: '',
		link: function (scope, element, attributes) {
			// scope.$on("starFadeIn", function(event){
			// 	console.log('FADING');
			// 	// element.addClass("starfade-in");
			// 	element.addClass('fadein');
			// 	setTimeout(function(){
			// 		// element.removeClass("starfade-in");
			// 		element.removeClass("fadeout");
			//
			// 	}, 800);
			// });
			// scope.$on("starFadeOut", function(event){
			// 	console.log('FADING OUT');
			// 	// element.addClass("starfade-out");
			// 	element.addClass("fadeout");
			// 	setTimeout(function(){
			// 		// element.removeClass("starfade-out");
			// 		element.removeClass("fadeout");
			//
			// 		element
			// 	}, 800);
			// });
		}
	};
});
