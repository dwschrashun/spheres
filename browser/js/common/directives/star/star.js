app.directive("star", function($animate, $rootScope) {
	return {
		restrict: "A",
		templateUrl: '',
		link: function (scope, element, attributes) {
			var hasDarkenedOnce;
			scope.$on("playingNote", function (event, coords) {

				if (coords === attributes.cx + "-" + attributes.cy) {
					if (!hasDarkenedOnce){
						// $rootScope.$broadcast('starFadeOut');
						element.addClass("dark");
						hasDarkenedOnce = true;
					}
					// $rootScope.$broadcast('starFadeIn');
					// element.addClass("fadeinstar");
					// console.log("Next element: ", element.next());
					element.addClass("animate");
					// element.addClass("fadeoutstar");

					// if (int1) {
					// 	clearTimeout(int1);
					// }
					// if (int2) {
					// 	clearTimeout(int2);
					// }

					if (element.next().length === 0 || element.next() === 1 || !element.next()) {
						setTimeout(function(){
							// element.removeClass("fadeinstar");
							console.log("no next element");
							element.addClass("fadeoutstar");
						},500);
					}
					else {
						console.log(element.next());
					}
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
					console.log("IN THE LISTENER and coords are ", coords);
				if (coords === attributes.cx + "-" + attributes.cy) {
					// element.removeClass('dark');
					element.addClass("animate");

					setTimeout(function () {
						element.removeClass("animate");
						// element.addClass("dark");
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
