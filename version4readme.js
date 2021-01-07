const fs = require("fs");
const pkg = require("./package.json");
const b4c = require("build4code").codegen;

var vFilename = "README.md";
// replace <div id4marker="version">2.0.2</div> with current version
console.log("Set version build.js for '" + pkg.name + "' version "+pkg.version);


function outTime(pNr) {
	var vOut = pNr;
	if (pNr == 0) {
		vOut = "00"
	}
	if (pNr<10) {
		vOut = "0"+pNr;
	};
	return vOut
}


function getDateTime() {
	var vNow = new Date();
	var vSep = "/"; // set separator for date
	var vOut = vNow.getFullYear() + vSep +outTime(vNow.getMonth()+1) + vSep + outTime(vNow.getDate());
  vOut += " "; // Separator between Date and Time
	vSep = ":"; // set separator for time
	vOut += vNow.getHours() + vSep + outTime(vNow.getMinutes()) + vSep + outTime(vNow.getSeconds());
	return vOut;
}


function replace_date_modified(data) {

	data = data.replace(/<div\s+id="datetime"\s+style[^<]+<\/div>/g,"<div id4marker=\"datetime\" style=\"display: inline-block\">"+getDateTime()+"</div>");
	data = data.replace(/<div\s+id4marker="datetime"\s+style[^<]+<\/div>/g,"<div id4marker=\"datetime\" style=\"display: inline-block\">"+getDateTime()+"</div>");
  return data;
}

function replace_version(data) {
  data = replace_date_modified(data);
  data = data.replace(/<div\s+id="version"\s+style[^<]+<\/div>/g,"___PKG_");
  data = data.replace(/<div\s+id="version">[^<]+<\/div>/g,"<div id4marker=\"version\">"+pkg.version+"</div>");
  data = data.replace(/<div\s+id4marker="version"[^<]+<\/div>/g,"<div id4marker=\"version\" style=\"display: inline-block\">"+pkg.version+"</div>");
  return data;
}

var outfile = "undefined content";
  fs.readFile(vFilename, 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
        outfile = b4c.replace_version(data);
      }
    });

setTimeout(function () { b4c.save_file(vFilename, outfile); },1500);
