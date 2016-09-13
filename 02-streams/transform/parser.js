var Transform = require('stream').Transform;
var moment = require('moment');

var parser = new Transform({objectMode: true});

parser.index = 0;

parser.header = [];

parser._transform = function(data, encoding, done) {
    console.log("[" + moment().format() + "] Processing row: ", data);
    if(this.index === 0) {
        this.header = data;
    } else {
        var parsedData = {};
        for(var i = 0; data.length > i; i++) {
            parsedData[this.header[i]] = data[i];
        }
        this.push(parsedData);
    }
    this.index++;
    done();
};

module.exports = parser;

