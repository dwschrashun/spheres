app.directive("star", function($animate) {
	return {
		restrict: "A",
		templateUrl: '',
		link: function (scope, element, attributes) {
			scope.$on("playingNote", function (event, coords) {
				//console.log("attributes", attributes);
				//console.log("coords", coords);
				//console.log("playing note");
				if (coords === attributes.cx + "-" + attributes.cy) {
					element.addClass("animate");
					setTimeout(function () {
						element.removeClass("animate");
					}, 2000);
				}
			});
			scope.$on("welcomeFlicker", function(event){
				var x = Math.random()*1000;
				console.log('event fired');
				element.addClass("animate");
				setInterval(function(){
					element.removeClass("animate");
				}, 500+x);
				setInterval(function(){
					element.addClass("animate");
				}, 800+x);
			});
			// scope.$on("matchingNote", function (event) {
			// 		element.addClass("animate");
			// 		console.log("match");
			// 		setTimeout(function () {
			// 			element.removeClass("animate");
			// 		}, 2000);
			// });
		}
	};
});
