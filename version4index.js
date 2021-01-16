const fs = require("fs");
const pkg = require("./package.json");
const b4c = require("build4code").codegen;

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
	data = data.replace(/<span\s+id="datetime"\s+style[^<]+<\/div>/g,"<span id4marker=\"datetime\">"+getDateTime()+"</span>");
	return data;
}

function replace_version(data) {
  data = replace_date_modified(data);
  data = data.replace(/<div\s+id="version">[^<]+<\/div>/g,"<div id4marker=\"version\">"+pkg.version+"</div>");
  data = data.replace(/<div\s+id4marker="version"[^<]+<\/div>/g,"<div id4marker=\"version\" style=\"display: inline-block\">"+pkg.version+"</div>");
	data = data.replace(/<span\s+id="version">[^<]+<\/span>/g,"<span id4marker=\"version\">"+pkg.version+"</span>");
  return data;
}

var outfile1 = "undefined content";
var file1 = 'docs/index.html';
fs.readFile(file1, 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
        outfile1 = b4c.replace_version(data,pkg);
      }
});
var outfile2 = "undefined content";
var file2 = 'docs/wiki2reveal_footer.html';
fs.readFile(file2, 'utf8', function readFileCallback(err, data){
		   if (err){
		       console.log(err);
		   } else {
		        outfile2 = b4c.replace_version(data,pkg);
		   }
});
var outfile3 = "undefined content";
var file3 = 'docs/wiki2reveal_link.html';
fs.readFile(file2, 'utf8', function readFileCallback(err, data){
		   if (err){
		       console.log(err);
		   } else {
		        outfile3 = b4c.replace_version(data,pkg);
		   }
});
var outfile4 = "undefined content";
var file4 = 'README.md';
fs.readFile(file2, 'utf8', function readFileCallback(err, data){
		   if (err){
		       console.log(err);
		   } else {
		        outfile4 = b4c.replace_version(data,pkg);
		   }
});

setTimeout(function () {
	b4c.save_file(file1, outfile1);
	b4c.save_file(file2, outfile2);
	b4c.save_file(file3, outfile3);
	b4c.save_file(file4, outfile4);
},1500);
