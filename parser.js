var arrayUnique = function(a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
};

var buildKeys = function(words) {
    var metaphones = [];
    for (var i = 0; i < words.length; i++) {
      if (words[i].length > 1) {
        metaphones = metaphones.concat(
          doubleMetaphone(words[i])
        );
      }
    }
    return arrayUnique(metaphones);
}

var Transform  = require('stream').Transform;
var csvStream = require('csv-streamify');
 
var doubleMetaphone  = require('double-metaphone');

var options = {
        delimiter: '\t', 
        newline  : '\r\n',
        columns  : true
};
 
var csv = csvStream(options);
var id = 0;

var parser = new Transform();

parser._transform = function(chunk, encoding, done) {
    var json = JSON.parse(chunk);
    var indexes = json.name.split(/[ ,.]+/);
    indexes.push(json.city);
    var metaphones = buildKeys(indexes);
    var out = {id: ++id, name: json.name, city: json.city};
    out.keys = metaphones;
    this.push(JSON.stringify(out) + '\n');
    done();
}
 
// Pipe the streams
process.stdin
       .pipe(csv)
       .pipe(parser)
       .pipe(process.stdout);

