app.factory('StarNoteFactory', function($http){

	var allShapes = [];

	function makeShape () {
		if (allShapes.length) {
			return Promise.resolve(getRandomShape());
		}
		else {
			return $http.get('/api/stars/')
			.then(function(response){
				allShapes = response.data;
				return getRandomShape();
			});
		}
	}

	function getRandomShape() {
		var index = Math.floor(Math.random() * allShapes.length);
		var randomShape = allShapes[index];
		allShapes.splice(index, 1);
		return randomShape;
	}

	return {
		makeShape: makeShape
	};
});
