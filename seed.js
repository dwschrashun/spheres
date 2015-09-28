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

        name: "Lynx",
        stars: [
            {x:150 , y:120 , nextX: 160, nextY:100 , note: "A3"},
            {x:160 , y:100 , nextX: 190, nextY: 90, note: "C#3"},
            {x:190 , y:90 , nextX: 205, nextY: 75, note: "E4"},
            {x:205 , y:75 , nextX: 220, nextY: 20, note: "B3"},
            {x:220 , y:20 , nextX: 240 , nextY: 10, note: "G#3"},
            {x:240 , y:10 , nextX: 240, nextY:10 , note: "C#4"},
        ]},

        {name: "Auriga",
        stars: [
            {x:550 , y:40 , nextX:550, nextY:85 , note: "F#4"},
            {x:550 , y:85 , nextX: 550, nextY: 120, note: "C#4"},
            {x:550 , y:120 , nextX: 585, nextY: 150, note: "E4"},
            {x:585 , y:150 , nextX: 615, nextY: 135, note: "A3"},
            {x:615, y:135 , nextX: 615 , nextY: 90, note: "G#3"},
            {x:615 , y:90 , nextX: 550, nextY:40 , note: "C#3"},
        ]},

        {name: "Perseus",
        stars: [
            {x:830 , y:40 , nextX: 725, nextY:70 , note: "F#4"},
            {x:725 , y:70 , nextX: 700, nextY: 90, note: "C#4"},
            {x:700 , y:90 , nextX: 680, nextY: 130, note: "E4"},
            {x:650 , y:80 , nextX: 700, nextY: 90, note: "A3"},
            {x:680, y:130 , nextX: 800 , nextY: 130, note: "G#3"},
            {x:700 , y:180 , nextX: 680, nextY: 130 , note: "C#3"},
            {x:800 , y:130 , nextX: 800, nextY: 90, note: "E3"},
            {x:875 , y:120 , nextX: 800, nextY: 130, note: "G#4"},
            {x:800, y:90 , nextX: 830 , nextY: 40, note: "A4"},
            {x:950 , y:80 , nextX: 800, nextY: 90 , note: "B4"},
        ]},

        {name: "Aries",
        stars: [
            {x:900 , y:200 , nextX: 975, nextY:250 , note: "A3"},
            {x:975 , y:250 , nextX: 1050, nextY: 275, note: "C#4"},
            {x:1050 , y:275 , nextX: 1050, nextY: 275, note: "E4"},
        ]},

        {name: "Orion",
        stars: [
            {x:800 , y:250 , nextX:740, nextY:275 , note: "B4"},
            {x:740 , y:275, nextX: 775, nextY: 370, note: "C#4"},
            {x:775 , y:370 , nextX: 790, nextY: 360, note: "E4"},
            {x:790 , y:360 , nextX: 810, nextY: 350, note: "A3"},
            {x:810, y:350 , nextX: 840 , nextY: 290, note: "G#3"},
            {x:840 , y:290 , nextX: 800, nextY: 250 , note: "F#3"},
            {x:750 , y:410 , nextX: 775, nextY: 370, note: "E3"},
            {x:850 , y:400 , nextX: 810, nextY: 350, note: "A4"},
            {x:900, y:330 , nextX: 840, nextY: 290, note: "B3"},
            {x:910 , y:300 , nextX: 900, nextY: 330 , note: "C#3"},
        ]},

        {name: "Antlia",
        stars: [
            {x:50 , y:500 , nextX: 100, nextY:450 , note: "F#3"},
            {x:100 , y:450 , nextX: 140, nextY: 400, note: "C#4"},
            {x:140 , y:400 , nextX: 160, nextY: 480, note: "B3"},
            {x:160 , y:480 , nextX: 100, nextY: 450, note: "A3"},
        ]},

        {name: "Caelum",
        stars: [
            {x:950 , y:450 , nextX: 1000, nextY:470 , note: "F#3"},
            {x:1000 , y:470 , nextX: 1010, nextY: 500, note: "C#3"},
            {x:1010 , y:500 , nextX: 1040, nextY: 530, note: "A4"},
            {x:1040 , y:530 , nextX: 1040, nextY: 530, note: "F#4"},
        ]},

        {name: "Canis Major",
        stars: [
            {x:340, y:465 , nextX:360, nextY:490 , note: "A4"},
            {x:360 , y:490, nextX: 350, nextY: 540, note: "C#4"},
            {x:350 , y:540 , nextX: 320, nextY: 515, note: "E4"},
            {x:320 , y:515 , nextX: 340, nextY: 465, note: "A3"},
            {x:325, y:440 , nextX: 310 , nextY: 415, note: "C#3"},
            {x:310 , y:415 , nextX: 320, nextY: 475, note: "E3"},
            {x:320 , y:475 , nextX: 340, nextY: 465, note: "G#3"},
            {x:390 , y:475 , nextX: 360, nextY: 490, note: "F#4"},
            {x:420, y:545 , nextX: 350, nextY: 540, note: "B3"},
        ]},
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
