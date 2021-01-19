const fs = require("fs");
const pkg = require("./package.json");
const b4c = require("build4code").codegen;

console.log("Start build4docs.js for '" + pkg.name + "' version "+pkg.version);

//-----------------------------------------
b4c.create_header(pkg);
b4c.create_tail(pkg);
//-----------------------------------------
var lib_header = b4c.get_header(pkg);
var outmain = lib_header;


var vFileNameArray = ["wtf_wikipedia.js","audioplayer.js","audioslide.js","wiki2html.js","wikiconvert.js","wtf_fetch.js","wiki2reveal_generator.js","EXPORTMOD"];

function docs2src(pFileName,pi) {
  var vFileName = pFileName || (pkg.name + ".js");
  var vSourceFileName = "";
  var vSaveFileName = "";

  if (vFileName) {
    if (vFileName == "EXPORTMOD") {
      vFileName = "src/exportmod.js";
      vSourceFileName = './src/exportmod.js';
      vSaveFileName = 'src/libs/exportmod.js';
    } else {
      vSourceFileName = './docs/js/'+vFileName;
      vSaveFileName = 'src/libs/'+vFileName;
    }
    fs.readFile(vSourceFileName, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
          var outfile = lib_header;
          outfile += "\n" + data + "\n";
          b4c.save_file(vSaveFileName, outfile);
          vFileArray[pi] = "\n// Library: " + vFileName + " \n\n" + data + "\n";
        }
    });
  }
}

var vFileArray = [];
for (var i = 0; i < vFileNameArray.length; i++) {
  vFileArray.push("");
}

for (var i = 0; i < vFileNameArray.length; i++) {
  docs2src(vFileNameArray[i],i);
}

setTimeout(function () { b4c.save_file('src/main.js', vFileArray.join("\n")); },2500);
