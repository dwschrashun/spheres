/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var fs = require("fs");
var path = require("path");

// var Sounds = mongoose.model("Sound");
var Shape = mongoose.model("Shape");
var async = require("async");

// var folder = path.join(__dirname, "server/app/sounds/");


var seedShapes = function(){
	var shapes = [{
		name: "square",
		stars: [
			{x: 200, y: 200, note: "B4"},
			{x: 300, y: 200, note: "D3"},
			{x: 300, y: 300, note: "E3"},
			{x: 200, y: 300, note: "F#3"}
		]},
		{
		name: "rectangle",
		stars: [
			{x: 400, y: 300, note: "F#3"},
			{x: 600, y: 300, note: "G3"},
			{x: 400, y: 400, note: "A4"},
			{x: 600, y: 400, note: "D4"}
		]},
		// {
		// name: "libra",
		// stars: [
		// 	{x: 465, y: 300, note: "D3"},
		// 	{x: 400, y: 310, note: "E3"},
		// 	{x: 490, y: 490, note: "F#3"},
		// 	{x: 600, y: 330, note: "G3"},
		// 	{x: 460, y: 480, note: "A4"},
		// 	{x: 600, y: 300, note: "B4"},
		// 	{x: 700, y: 400, note: "D4"}
		// ]}
];
	return Promise.resolve(Shape.create(shapes));
};

connectToDb.then(function () {
    Shape.find({}).then(function (shapes) {
        if (shapes.length === 0) {
            console.log("SEEDING");
            return seedShapes();
        } else {
            console.log(chalk.magenta('Seems to already be shape data, exiting!'));
            process.kill(0);
        }
    }).then(function (results) {
        console.log(chalk.green('Seed successful! RESULTS: ', results));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});


// var getFilenames = function () {
//     console.log("IN SEED SOUNDS", folder);
//     return new Promise(function (resolve, reject) {
//         fs.readdir(folder, function (err, files) {
//             if (err) {
//                 console.log("ERROR", err);
//                 return reject(err);
//             }
//             var fileNames = files;
//             return resolve(fileNames);
//         });
//     });
// };
//
// var readFiles = function (filenames) {
//     console.log("in readfiles", filenames);
//     return new Promise (function (resolve, reject) {
//         async.map(filenames, getReadFiles, function (err, results) {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(results);
//         });
//     });
// };
//
// var getReadFiles = function (file, cb) {
//     var filePath = folder + file;
//     console.log("in get readfiles", filePath);
//     fs.readFile(filePath, function (err, fileBuffer) {
//         console.log("err, buffer", err, fileBuffer);
//         var sound = {sound: fileBuffer};
//         cb(err, sound);
//     });
// };
//
// var seedSounds = function () {
//     return getFilenames().then(function (filenames) {
//         return readFiles(filenames);
//     }).then(function(files) {
//         console.log("actually seeding", files[0]);
//         return Sounds.create(files);
//     });
// };

    // fs.readdir(folder, function (err, files) {
    //     if (err) return console.log("ERROR", err);
    //     console.log("filenames", files);
    //     var fileNames = files;
    //     async.map(fileNames, function (file, cb) {
    //         console.log("READING");
    //         fs.readFile(file, function (fileBuffer) {
    //             console.log("FILE");
    //             return fileBuffer;
    //         });
    //     }, function (err, results) {
    //         if (err) console.log("ERROR", err);
    //         console.log("RESULTS", results);
    //         var sounds = results.map(function (buffer) {
    //             return {sound: buffer};
    //         });
    //         Sounds.createAsynch(results);
    //     });
    // });
