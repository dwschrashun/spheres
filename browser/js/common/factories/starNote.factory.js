app.factory('StarNoteFactory', function($http){

	var allShapes = [];

	function loadAllShapes() {
		return $http.get('/api/stars/')
		.then (function(response){
			allShapes = response.data.map(function (item) {
				return item;
			});
			return response.data;
		});
	}


	// function makeShape () {
	// 	if (!allShapes){
	// 		return undefined;
	// 	}
	// 	else if (allShapes.length) {
	// 		return Promise.resolve(getRandomShape());
	// 	}
	// 	else {
	// 		return $http.get('/api/stars/')
	// 		.then(function(response) {
	// 			return getRandomShape();
	// 		});
	// 	}
	// }

	//simplified for testing
	function getRandomShape() {
		var index = Math.floor(Math.random() * allShapes.length);
		var randomShape = allShapes[index];
		if (!allShapes.length){
			return undefined;
		}
		allShapes.splice(index, 1);
		return randomShape;
	}

	return {
		loadAllShapes: loadAllShapes,
		getRandomShape: getRandomShape
	};
});
