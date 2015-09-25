app.factory('StarNoteFactory', function($http){

	function makeStars (shape){
		return $http.post('/api/stars', {shape: shape})
		.then(function(response){
			console.log("Stars in factory: ", response);
			return response.data;
		});
	}


	return {
		makeStars: makeStars
	};
});
