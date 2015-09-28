app.factory('Utility', function(){

	function shuffle(array) {
		var currentIndex = array.length;
		var temporaryValue;
		var randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
		}
		return array;
	}

	function getLength (star) {	 
		var xs = star.nextX - star.x;
		xs = xs * xs;
		 
		var ys = star.nextY - star.y;
		ys = ys * ys;
		 
		return Math.sqrt( xs + ys );
	}

	return {
		shuffle: shuffle,
		getLength: getLength
	};
});
