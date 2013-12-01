var request = require('request'),    // gets the request module
	async = require('async'),    // gets the async module
	fs = require('fs'),    // gets the filesystem module
	mkdirp = require('mkdirp'),    // gets the mkdirp module
	colors = require('colors');    // gets the colors module

exports.files = function(data) {   // exports the files function
	var libs = Object.keys(data);    // gets the libraries in the 
	for(var i = 0; i < libs.length; i++) {    // loops through the libraries
		var libkeys = Object.keys(data[libs[i]]);    // gets the version numbers from each library
		for(var j = 0; j < libkeys.length; j++) {    // loops through the versions of each library
			if(!fs.existsSync('./libraries/' + libs[i])) {     // checks if '/libraries/{library}' exists
				mkdirp('./libraries/' + libs[i]);    // creates it if it doesn't
				console.log('info: '.cyan + 'the directory \'' + ('./libraries/' + libs[i] + '/').yellow + '\' was created');    // logs that to the console
			}
			if(!fs.existsSync('./libraries/' + libs[i] + '/' + libkeys[j] + '.js')) {    // checks if '/library/{library}/{version}.js' exists
				request(data[libs[i]][libkeys[j]]).pipe(fs.createWriteStream('./libraries/' + libs[i] + '/' + libkeys[j] + '.js'));    // creates it if it doesn't
				console.log('info: '.cyan + 'the file ' + '\'' + ('./libraries/' + libs[i] + '/' + libkeys[j] + '.js').yellow + '\' was created');    // logs that to the console
			}
		}
	}
};