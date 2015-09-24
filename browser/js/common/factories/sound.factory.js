app.factory('SoundFactory', function($http){
	function getAllSounds () {
		console.log("getting sounds");
		return $http.get("/api/sounds", {responseType: 'arraybuffer'}).then(function (response) {
			console.log("response", response.data);
			return response.data;
		});
	}

	return {
		getAllSounds: getAllSounds
	};

});
