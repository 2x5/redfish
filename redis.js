var Transform  = require('stream').Transform;

var util = require('util');

var parser = new Transform();

parser._transform = function(chunk, encoding, done) {
    var lines = chunk.toString().split('\n');
    for (var i = 0; i < lines.length; i++) {
      console.log('inspect: '+util.inspect(lines[i]));
      var json = JSON.parse(lines[i]);
    }
    done();
}
 
// Pipe the streams
process.stdin
       .pipe(parser)
       .pipe(process.stdout);

