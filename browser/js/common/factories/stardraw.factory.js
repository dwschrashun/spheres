app.factory('StarDrawingFactory', function(){

	function makeStarNode (star) {
		return `<circle cx="${star.x}" cy="${star.y}" r="10" fill="blue"/>`;
	}

	function drawStar (element, star) {
		var node = makeStarNode(star);
		element.append(node);
	}

	function drawStars (element, stars) {
		console.log("THIS ISNT LOGGING: element, node", element, node);
		console.log("element", element);
		stars.forEach(function (star) {
			drawStar(angular.element(element[0]), star);
		});
	}

	return {
		drawStars: drawStars
	};

});
