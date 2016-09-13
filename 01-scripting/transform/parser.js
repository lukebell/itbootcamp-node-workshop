
/**
 * CSV data parser
 * @param data
 * @returns {string}
 */
function transform(data) {

    var lines = [];
    var res = '';
    var header = [];
    var index = 0;

    if(data) {
        lines = data.toString().split("\n");
    }

    lines.forEach(function(line){
        if (index === 0) {
            header = line.split(',');
        } else {
            var parsedData = {};
            var params = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            for(var i = 0; params.length > i; i++) {
                parsedData[header[i]] = params[i];
            }
            res += JSON.stringify(parsedData) + "\n";
        }
        index++;
    });
    return res;
}

/**
 * public interface
 * @type {{parser: parser}}
 */
module.exports = {
    transform: transform
};
