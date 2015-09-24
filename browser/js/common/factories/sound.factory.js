app.factory('SoundFactory', function($http){
	function getAllSounds () {
		return $http.get("/api/sounds", {responseType: 'arraybuffer'}).then(function (response) {
			return response.data;
		});
	}

	return {
		getAllSounds: getAllSounds
	};

});
