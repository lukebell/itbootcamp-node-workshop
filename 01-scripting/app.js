var fs = require('fs');
var path = require('path');
var moment = require('moment');
var parser = require('./transform/parser');

var inputFile = path.join(__dirname, './data/input.csv');
var outputFile = path.join(__dirname, './data/output.json');


console.log("[" + moment().format() + "] Processing file: '", inputFile, "'");

/**
// Read file in asynchronously (non-blocking)
fs.readFile(inputFile, 'utf8', function (err, data) {
    // Handle error
    if (err) {
        console.error("[" + moment().format() + "] Error reading file: ", err);
    } else {
        try {
            console.log("[" + moment().format() + "] Data: ", data);
        } catch (exception) {
            console.error("[" + moment().format() + "] Exception processing file: ", exception);
        }
    }
});
**/

// Read file in synchronously (blocking)
var data = fs.readFileSync(inputFile, 'utf8');

console.log("[" + moment().format() + "] Data: ", data);

var result = parser.transform(data);

/**
// Write file in asynchronously (non-blocking)
fs.writeFile(outputFile, result, function(err) {
    if(err) {
        return console.error("[" + moment().format() + "] Error writing file:", err);
    } else {
        console.log("[" + moment().format() + "] The file was saved!");
    }
});
**/

// Write file in synchronously (blocking)
fs.writeFileSync(outputFile, result);

console.log("[" + moment().format() + "] Process finished :) ");


