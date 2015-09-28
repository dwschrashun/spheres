app.directive("star", function($animate, $rootScope) {
	return {
		restrict: "A",
		templateUrl: '',
		link: function (scope, element, attributes) {
			var hasDarkenedOnce;
			var played = [];
			scope.$on("playingNote", function (event, coords) {

				if (coords === attributes.cx + "-" + attributes.cy) {
					if (!hasDarkenedOnce){
						element.addClass("dark");
						hasDarkenedOnce = true;
					}
					if (played.indexOf(coords) < 0){
						element.addClass("fadeoutstar");
					}

					element.addClass("animate");

					setTimeout(function () {
						element.removeClass("animate");
						element.removeClass("fadeoutstar");
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
				played.push(coords);
					console.log("IN THE LISTENER and coords are ", coords);
				if (coords === attributes.cx + "-" + attributes.cy) {
					element.removeClass('dark');
					element.addClass("animate");
					element.removeClass("fadeoutstar");

					setTimeout(function () {
						element.removeClass("animate");
					}, 1000);
				}
			});
			scope.$on('anyNote', function(event, coords){
				if (coords === attributes.cx + "-" + attributes.cy) {
					element.addClass("animate");
					setTimeout(function () {
						element.removeClass("animate");
					}, 1000);
				}
			});
		}
	};
});
