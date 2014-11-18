var fs  = require("fs");
var csv = require("fast-csv");
var dm  = require('double-metaphone');

var options = {
    delimiter : "\t", 
    headers   : ["name", "bizname", "address", "city", "state", "zip", "county", "commno", "commexp"]
}

var ins = fs.createReadStream("/media/removable/UNTITLED/Notary/CA/sample.csv");
var outs = fs.createWriteStream("./sample.redis");
outs.on('finish', function () {
  console.log('file has been written');
});

var id = 0;

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

function indexWord(id, word) {
    outs.write(id + ',' + word + '\n');
}


