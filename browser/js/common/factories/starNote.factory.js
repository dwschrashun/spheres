app.factory('StarNoteFactory', function($http){

	function makeShape (shape){
		return $http.get('/api/stars/' + shape)
		.then(function(response){
			return response.data;
		});
	}


	return {
		makeShape: makeShape
	};
});
