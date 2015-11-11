app.factory('StarDrawingFactory', function(){

	function makeStarNode (star) {
		return `<circle cx="${star.x}" cy="${star.y}" r="10" fill="blue" filter="url(#f2)"/>`;
	}

	function drawStar (element, star) {
		var node = makeStarNode(star);
		element.append(node);
	}

	function drawStars (element, stars) {
		stars.forEach(function (star) {
			drawStar(angular.element(element[0]), star);
		});
	}

	return {
		drawStars: drawStars
	};

});
