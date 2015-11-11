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
