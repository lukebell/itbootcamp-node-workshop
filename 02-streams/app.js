var fs = require('fs');
var JSONStream = require('JSONStream');
var csv = require('csv-streamify');
var moment = require('moment');
var path = require('path');
var parser = require('./transform/parser');

var inputFile = path.join(__dirname, './data/input.csv');
var outputFile = path.join(__dirname,'./data/output.json');

// creamos el read stream
var inputStramFile = fs.createReadStream(inputFile, {encoding: 'utf8', highWaterMark: 32 * 1024});
// creamos el write stream
var outputStreamFile = fs.createWriteStream(outputFile);

console.log("[" + moment().format() + "] Processing file: '", inputFile, "'");

inputStramFile
    .pipe(csv({objectMode: true}))      // convierte csv stream en un array
    .pipe(parser)                       // realiza transformación
    .pipe(JSONStream.stringify(false))  // convierte objeto JSON a stream de escritura
    .pipe(outputStreamFile)             // escribe la salida
    .on('finish', function () {     
        console.log('Transform done. :)');
    });
