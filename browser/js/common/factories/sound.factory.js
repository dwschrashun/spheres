app.factory('SoundFactory', function($http){
	function getAllSounds () {
		console.log("getting sounds");
		return $http.get("/api/sounds").then(function (response) {

			console.log("response data in factory: ", response.data);
			console.log("type of response data in factory :", typeof response.data)

			var str = response.data;

			var buf = new ArrayBuffer(str.length); // 2 bytes for each char
 			var bufView = new Uint8Array(buf);
			console.log(str.length);
			for (var i=0; i < str.length; i++) {
				bufView[i] = str.charCodeAt(i);
			}
			console.log("type of buf in factory", buf);
			console.log("type of bufView in factory", bufView);

			return buf;



			return response.data;
		});
		//
		// var XMLHttpRequestPromise = require('xhr-promise');
		// var xhrPromise = new XMLHttpRequestPromise();
		// console.log (xhrPromise);
		//
		// return xhrPromise.send({
		// 	method: 'GET',
		// 	url: 'http://localhost:1337/api/sounds'
		// })
		// .then(function (response) {
		// 	console.log(response.data);
		// 	return response.data;
		// }).catch(function(e){
		// 	console.log(e);
		// });
		//
		// var request = new XMLHttpRequest();
		// request.open('GET', 'http://localhost:1337/api/sounds', true);
		// request.responseType = "arraybuffer";
		// var sounds;
		// request.onload = function(){
		// 	var data = request.response;
		// 	console.log("response in factory: ", data);
		// 	sounds = data;
		// 	return data;
		// };
		// request.send().then(function(something){
		// 	return sounds;
		// });

	}

	return {
		getAllSounds: getAllSounds
	};

});
