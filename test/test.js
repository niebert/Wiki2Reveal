const fs = require("fs");
const pkg = require("../package.json");
const b4c = require("build4code").codegen;
const wtf = require("../src/main.js");

//---------------------------------------
//------DEFAULT VALUES-------------------
//---------------------------------------
var vTitle = "Normen, Metriken, Topologie";
var vAuthor = "Wikiversity DE";
var vLanguage = "de";
var vDomain = "wikiversity";
var vAudioSlide = "no";
//---------------------------------------
// Options for getWiki2Reveal() Call
//---------------------------------------
var vOptions = {
  "domain": "wikiversity",
  "language": "en",
  "audioslide":"no",
  "slidetype":"reveal"
};
//---------------------------------------
var vMarkup =  "== My Title ==\nMy content of Wikipage";
var htmlout = wtf.wiki2reveal(vMarkup,vTitle, vAuthor, vLanguage, vDomain, vOptions);
console.log("Output:\n" + htmlout);

/*
wtf.getPage(vTitle,vLanguage,vDomain, function(err, doc) {
  // doc contains the download
  console.log(JSON.stringify(doc.wiki));
  var markup = doc.wiki;
  var htmlout = wtf.wiki2reveal(markup,vTitle, vAuthor, vLanguage, vDomain, vOptions);
  console.log("Output:\n" + htmlout);
  //console.log(doc);
});
*/
