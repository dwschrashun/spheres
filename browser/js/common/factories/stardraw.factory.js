app.factory('StarDrawingFactory', function(){

	function drawStar (context, star) {
		console.log("drawing star", star);
		context.beginPath();
		context.fillStyle = "blue";
		context.arc(star.x,star.y,10,0,Math.PI*2);
		context.fill();
	}

	function drawStars (element, stars) {
		console.log(element[0]);
		console.log("STARS",stars);
		var context = element[0].getContext("2d");
		stars.forEach(function (star) {
			drawStar(context, star);
		});
	}

	return {
		drawStars: drawStars
	};

});
