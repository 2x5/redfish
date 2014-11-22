var fs  = require("fs");
var Transform = require('stream').Transform

var parser = new Transform();
 
parser._transform = function(chunk, encoding, done) {
    this.push(chunk);
    done();
}
 
process.stdin
       .pipe(parser)
       .pipe(process.stdout);

/*
csv
 .fromStream(ins, options)
 .on("data", function(data){
    id++;
     console.log(id+") --"+ data.name);
     var names = data.name.split(',');

     for(var i = 0; i < names.length; i++) {
        console.log("---"+ names[i]);
        var metaphones = dm(names[i])

        indexWord(id, metaphones[0]);

        if(metaphones[0] === metaphones[1]) {
            console.log("-----"+metaphones[0]);
        } else {
            console.log("-----"+metaphones);
        }
     }
 })
 .on("end", function(){
     outs.close();
     console.log("done");
 });
*/

function indexWord(id, word) {
    outs.write(id + ',' + word + '\n');
}


