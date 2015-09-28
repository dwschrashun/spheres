app.directive("star", function($animate) {
	return {
		restrict: "A",
		templateUrl: '',
		link: function (scope, element, attributes) {
			scope.$on("playingNote", function (event, coords) {

				if (coords === attributes.cx + "-" + attributes.cy) {
					element.addClass("dark");
					element.addClass("animate");
					setTimeout(function () {
						element.removeClass("animate");
					}, 2000);

				}
			});
			scope.$on("welcomeFlicker", function(event){
				var x = Math.random()*1000;
				element.addClass("animate");
				setInterval(function(){
					element.removeClass("animate");
				}, 500+x);
				setInterval(function(){
					element.addClass("animate");
				}, 800+x);
			});
			scope.$on("matchingNote", function (event, coords) {
					console.log("IN THE LISTENER and coords are ", coords);
				if (coords === attributes.cx + "-" + attributes.cy) {
					element.addClass("animate");
					element.removeClass('dark');
					setTimeout(function () {
						element.removeClass("animate");
						// element.addClass("dark");
					}, 1000);
				}
			});
		}
	};
});
