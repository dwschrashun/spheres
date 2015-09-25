app.factory('StarDrawingFactory', function($http){

	function drawStars (element, stars) {
		console.log(element[0]);
		var context = element[0].getContext("2d");
		stars.forEach(function (star) {
			drawStar(context, star);
		});
	}

	function drawStar (context, star) {
		console.log("drawing star", context);
		context.beginPath();
		context.fillStyle = "blue";
		context.arc(star.x,star.y,10,0,Math.PI*2); 
		context.fill();
	}

	return {
		drawStars: drawStars
	};

});