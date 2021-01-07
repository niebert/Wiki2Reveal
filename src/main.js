
// Library: js/audioplayer.js 


function toggle_audio(pAudioID) {
  var vNode = document.getElementById(pAudioID);
  if (vNode) {
    var vPlayerStatus = vNode.getAttribute("playerstatus");
    if (vPlayerStatus) {
      if (vNode.playerstatus == 'pause') {
        vNode.setAttribute("playerstatus","play");
        vNode.play();
        console.log("PLAY Player with Audio ID: '" + pAudioID + "'");
      } else {
        console.log("PAUSE Player with Audio ID: '" + pAudioID + "'");
        vNode.playerstatus = 'pause';
        vNode.pause();
      }
    } else {
      console.warn("WARNING: toggle_audio('"+pAudioID+"') 'playerstatus' Attribute undefined!");
    }
  } else {
    console.warn("WARNING: toggle_audio('"+pAudioID+"') Audio Node [" + pAudioID + "] not defined");
  }
}

var vCurrentAudio = "";

function play_audio(pAudioID){
    console.log("Play audio with ID='"+pAudioID+"'");
    if (pAudioID != ""){
        if(vCurrentAudio != "" ) {
            document.getElementById(vCurrentAudio).pause();
        }
        var pAudioIDEl = document.getElementById(pAudioID);
        pAudioIDEl.currentTime = 0;
        pAudioIDEl.play();
        vCurrentAudio = pAudioID;
    }
    return false;
}

function pause_audio(pAudioID){
    console.log("Pause audio with ID='"+pAudioID+"'");
    if (pAudioID != ""){
        if(vCurrentAudio != "" ) {
            document.getElementById(vCurrentAudio).pause();
        }
        var pAudioIDEl = document.getElementById(pAudioID);
        pAudioIDEl.currentTime = 0;
        pAudioIDEl.pause();
        vCurrentAudio = pAudioID;
    };
    return false;
}

function stop_audio(pAudioID){
    console.log("Stop audio with ID='"+pAudioID+"'");
    if (pAudioID != ""){
        if(vCurrentAudio != "" ) {
            document.getElementById(vCurrentAudio).pause();
        }
        var pAudioIDEl = document.getElementById(pAudioID);
        pAudioIDEl.currentTime = 0;
        pAudioIDEl.pause();
        vCurrentAudio = pAudioID;
    }
    return false;
}



// Library: js/audioslide.js 



function createImageSlide(pOutFile,pCount,pTemplate) {
  console.log("Create "+pCount+" AudioSlides for "+pOutFile);
  //alert("Create "+pCount+" AudioSlides for "+pOutFile);
  var i = 0;
  var vSep = getPathSeparator();
  //var vPathPrefix = "." + vSep + "images" + vSep + "img";
  var vOutSlides = "";
  var vPresentation = getFileContent (pTemplate);
  //var vSlideTPL     = getFileContent ('tpl/audioslides/defslide.html');
  var vDefSlide = 'defslide.html';
  if (isChecked("checkAudioPlayer")) {
    vDefSlide = "defslideplayer.html";
  };
  var vSlideTPL     = getFileContent (getMainDir()+vSep+'tpl'+vSep+'audioslides'+vSep+vDefSlide);
  //alert("after TPL and LOOP with getFileContent()");
  write2value("inputEDITOR",vPresentation);
  write2value("inputLOOP",vSlideTPL);
  //alert("write2value finished");
  var vCount = parseInt(pCount);
  while ((i<vCount) && (i < 200)) {
    vSlide = vSlideTPL;
    vSlide = replaceString(vSlide,"___NR___",i);
    //vSlide = replaceBG_COLOR(vSlide);
    //alert("vSlide="+vSlide);
    vOutSlides +=vSlide;
    i++;
  };
  //write2value("inputLOOP",vOutSlides);
  //Replace in vPresentation ___DZ_SLIDES___ with the vOutSlides);
  vPresentation = replaceSlides(vPresentation,vOutSlides);
  // Replace ___BG_COLOR___ and ___BG_COLOR_SLIDE___ tag in templates
  vPresentation = replaceBG_COLOR(vPresentation);
  write2value("outputEDITOR",vPresentation);
  saveFile(getInnerHTML("outputFILE"),vPresentation);
  alert("Convert "+pCount+" AudioSlides - Done:\nCopy your audio comments as MP3-File into folder '/audio' of your PanDoc Project!\n(e.g. audio0.mp3 for title slide, audio1.mp3 for slide 1,..." );
};

function replaceBG_COLOR(pContent) {
  var vColorBG = getValueDOM("colorBG");
  pContent = replaceString(pContent,"___BG_COLOR___",vColorBG);
  pContent = replaceString(pContent,"___BG_COLOR_SLIDE___",vColorBG);
  return pContent;
}

function insertAudioTags(pHash) {
  var vFilename = pHash["inputFILE"];
  if (pHash["inputFORMAT"] == "html") {
    console.log("Insert Audio-Tag - inputFORMAT='html'");
    //copyFile2Editor ("inputEDITOR",pHash["inputFILE"]);
    //copyFile2Editor ("outputEDITOR",pHash["inputFILE"]);
    fs.readFile(vFilename, 'utf-8', function (err, data) {
      write2value("inputEDITOR", data);
      data = replaceBG_COLOR(data);
      data = replaceAudioTag(data);
      console.log('Audio Tags in \''+vFilename+'\' inserted!');
      write2value("outputEDITOR", data);
      saveFile(pHash["outputFILE"],data);
    });
  } else {
    alert("ERROR: Insert Audio-Tags not possible for ["+vInFORMAT+"]");
  };
};

function replaceAudioTag(pContent) {
  if (fileTypeIsReveal(pContent)) {
    var vUseRecorder = confirm("Do you want to use the Audio Recorder in RevealJS?");
    pContent = convertReveal2AudioSlide(pContent,vUseRecorder);
    console.log("AUDIO='Reveal' Audioplayer to RevealJS");
  } else {
    pContent = convertDZ2AudioSlide(pContent);
    console.log("AUDIO='DZSlides' Audioplayer to non-Reveal presentation");
  };
  //write2value("outputEDITOR",pContent);
  return pContent;
};

function convertReveal2AudioSlide(pContent,pUseRecorder) {
  pContent = replaceString(pContent,"//__AUDIOPLAYER__//","");
  if (pUseRecorder) {
    pContent = replaceString(pContent,"//__AUDIORECORDER__//","");
  };
  var vStartPage=0;
  pContent = addAudioReveal(pContent,vStartPage);
  return pContent;
};

function addAudioReveal(pData,pStartPage) {
    var vSearch = /(<section[^>]+)>/gi;
    var vResult;
    var vCount = 0;
    var vTagInsert = "";
    while (vResult = vSearch.exec(pData)) {
          vTagInsert = " data-audio-src=\"audio/audio"+vCount+".mp3\" ";
          if (vCount >= pStartPage) {
            pData = replaceString(pData,vResult[1],vResult[1]+vTagInsert);
            console.log("Audio Tag "+vCount+" inserted: '"+vResult[1]+"'");
          };
          vCount++;
    };
    return pData;
};

function fileTypeIsReveal(pContent) {
  var vIsReveal = false;
  var vResult = pContent.match(/\/\/__AUDIOPLAYER__\/\//g);
  //var vMatches = 0;
  if(vResult) {
    //for(i=0;i<vResult .length;++i)
    //  console.log("fileTypeIsReveal() "+i+": "+vResult[i]);
    //  vMatches++;
    //};
    vIsReveal = true;
  };
  vResult = pContent.match(/\/\/__AUDIORECORDER__\/\//g);
  if(vResult) {
    vIsReveal = true;
  };
  vResult = pContent.match(/\/reveal\/css\/theme\//g);
  if(vResult) {
    vIsReveal = true;
  };
  return vIsReveal;
};

function convertDZ2AudioSlide(pData) {
  var vSearch = /(<section[^>]+>)/gi;
  var vResult;
  var vCount = 0;
  var vSep = getPathSeparator();
  var vAudioTag  = getFileContent (getMainDir()+vSep+'tpl'+vSep+'audioslides'+vSep+"defaudiotag.html");
  //alert(vPresentation.substr(0,300));
  var vDefSlide = "defslide.html";
  var vTagInsert = "";
  while (vResult = vSearch.exec(pData)) {
        vTagInsert = replaceString(vAudioTag,"___NR___",vCount);
        pData = replaceString(pData,vResult[1],vResult[1]+vTagInsert);
        console.log("Audio Tag "+vCount+" inserted: '"+vResult[1]+"'");
        vCount++;
  };
  return pData;
};

function copyDemoAudio(pHash) {
  console.log("Copy Demo Audio Files");
  var vSep = getPathSeparator();
  var vAudioDemo = getMainDir()+vSep+'tpl'+vSep+'audioslides'+vSep+"audiodefault.mp3";
  var vProjectDir = getPathFromFilename(pHash["inputFILE"]);
  var vAudioDir = vProjectDir + vSep +"audio" + vSep;
  if (!checkFileExists(vAudioDir+"audio0.mp3")) {
    copyFile(vAudioDemo,vAudioDir+"audio0.mp3");
    console.log("Copy audio0.mp3 to '"+vAudioDir+"'");
  } else {
    console.log("copyDemoAudio() - Audio File audio0.mp3 exists");
  };
};

function replaceSlides(pPresentation,pOutSlides) {
  var vOutSlides = pOutSlides || "Undefined Slides for DZ-Slides";
  var vPresentation =  pPresentation || "Undefined Main Template ___DZ_SLIDES___";
  var revealDIR = getRevealRelativeDIR();
  console.log("Reveal-Dir for  DZSlides for "+revealDIR);
  var mathjaxDIR = getMathJaxRelativeDIR();
  console.log("MathJax-Dir for  DZSlides for "+mathjaxDIR);
  vPresentation =  replaceString(vPresentation,"___DZ_SLIDES___",vOutSlides);
  vPresentation =  replaceString(vPresentation,"___REVEAL___",revealDIR);
  vPresentation =  replaceString(vPresentation,"___MATHJAX___",mathjaxDIR);
  vPresentation =  replaceString(vPresentation,"___THEME___",getValueDOM("themeREVEAL"));
  return vPresentation;
}

function createDZSlides(pOutFile,pTemplate) {
  console.log("Create DZSlides for "+pOutFile);
  //alert("pOutFile='"+pOutFile+"'");
  alert("Create DZSlides with Audio Comments for "+pOutFile);
  var i = 0;
  var vSep = getPathSeparator();
  var vPresentation = getFileContent (pTemplate);
  //alert(vPresentation.substr(0,300));
  var vDefSlide = "defslide.html";
  if (isChecked("checkAudioPlayer")) {
    vDefSlide = "defslideplayer.html";
    console.log("Use Template '"+vDefSlide+"' with Audio Player in Slides");
  } else {
    console.log("Audio Player is not visible");
  };
  var vSlideTPL     = getFileContent (getMainDir()+vSep+'tpl'+vSep+'dzslides'+vSep+vDefSlide);
  var vOutSlides    = getFileContent (pOutFile);
  //alert("vOutSlides:\n"+vOutSlides.substr(0,400));
  //alert("vSlideTPL:\n"+vSlideTPL);
  var vSlideArray = vOutSlides.split("</section>");
  //alert("after TPL and LOOP with getFileContent()");
  //write2value("inputEDITOR",vPresentation);
  write2value("inputLOOP",vSlideTPL);
  //alert("write2value finished");
  vOutSlides = vSlideArray[0];
  i = 1;
  while ((i<vSlideArray.length) && (i < 200)) {
    vSlide = vSlideTPL;
    vSlide = replaceString(vSlide,"___NR___",i);
    //alert("vSlide="+vSlide);
    vOutSlides +=vSlide + vSlideArray[i];
    i++;
  };
  //write2value("inputLOOP",vOutSlides);
  //write2value("inputLOOP",vOutSlides);
  vPresentation = replaceSlides(vPresentation,vOutSlides);
  write2value("outputEDITOR",vPresentation);
  saveFile(pOutFile,vPresentation);
  //saveFile("pOutFile.html",vPresentation);
  //saveTestFile();
  alert("Convert Finished:\nCopy your audio comments as MP3-File into folder '/audio' of your PanDoc Project!\n(e.g. audio0.mp3 for title slide, audio1.mp3 for slide 1,... (Software: e.g. Audacity)" );
};


function convertPDF2PNG(pInputPDF,pCount,pShellHash) {
  var vExt = getExtensionOfFilename(pInputPDF);
  vExt = vExt.toUpperCase();
  if (vExt != "PDF") {
    alert("WARNING: Input file is not an PDF document!");
  } else {
    var vPath = getPathFromFilename(pInputPDF);
    var vSep = getPathSeparator();
    vPath += vSep + "images" + vSep + "img";
    deleteAllImages(vPath,pCount);
    var vPathPlayer = vPath + "player";
    var i = 0;
    var vOutPNG = vPath +i+".png";
    var vOutPlayerPNG = vPathPlayer +i+".png";
    var vCount = parseInt(pCount);
    var vShowPlayer = false;
    if (isChecked("checkAudioPlayer")) {
      vShowPlayer = true;
      console.log("convertPDF2PNG() - Create Margins of PNG Slides for Audio Player");
    } else {
      console.log("convertPDF2PNG() - AudioPlayer hidden no margins necessary");
    };
    var vPDFstartpage = parseInt(getValueDOM("PDFstartpage")) || 0;
    alert("Remark: Converting PDF slide for file '"+getNameExt4Filename(pInputPDF)+"' from page " +vPDFstartpage + " to page "+(vPDFstartpage+vCount-1)+" could take up to "+pCount+" minutes!");
    console.log("convertPDF2PNG(pInputPDF,"+pCount+") with PDF startpage "+vPDFstartpage);
    var vIM_CMD = getCMD("imagemagickCMD");
    var vCMD = "";
    while ((i<vCount) && (i < 200)) {
      vOutPNG = vPath +i+".png";
      vOutPlayerPNG = vPathPlayer +i+".png";
      vPDFpage = i + vPDFstartpage;
      //vNode.value += ">";
      //setTimeout("document.getElementById('pandocprogress').value += 'o'",100);
      //alert("Create Image "+i+" from PDF");
      // convert -density 300 -depth 8 -quality 85 ${FilePDF}[${COUNTER}] outtmp.png
      //  "convert -size 3750x2812 xc:white input.png -gravity north -composite output.png".
      //deleteFile(vOutPNG);
      vCMD = vIM_CMD+" -density 300 -depth 8 -quality 85 "+pInputPDF+"["+vPDFpage+"] " + vOutPNG;
      pShellHash["executeable"] = vIM_CMD;
      pShellHash["paramarray"] = ["-density","300", "-depth","8", "-quality","85", pInputPDF+"["+i+"]", vOutPNG];
      //alert(vCMD);
      runShellCommand(vCMD,pShellHash);
      i++;
    };
    alert("Generating "+pCount+" PNG Files from PDF done!");
  }
}



// Library: js/wiki2html.js 

//#################################################################
//# Javascript Class: Wiki2HTML()
//#       SuperClass:
//#   Class Filename: wiki2html.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               21.1.2018
//# last modifications    2018/01/21 17:17:18
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

  	/*
  	This Library was created with JavascriptClassCreator
  	https://niebert.github.io/JavascriptClassCreator
  	The library is based on  wiki2HTML library of Elia Contini
  	publised under GPL.
  	Parses wiki markup and generates HTML 5 showing a preview.
      Copyright (C) 2010-2013 Elia Contini

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program. If not, see http://www.gnu.org/licenses/.
   */

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/wiki2html.js"
//---------------------------------------------------------------------
//---Constructor of Class Wiki2HTML()
// Call the constructor for creating an instance of class Wiki2HTML
// by the following command in HTML-file that imports this class
// var vMyInstance = new Wiki2HTML();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of Wiki2HTML, use
// the attribute name with a leading "this." in the definition of method of Wiki2HTML, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'Wiki2HTML'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'Wiki2HTML' will be set by
// use the method's name and extend it with 'Wiki2HTML'.
//    Wiki2HTML.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

	// no superclass defined


function Wiki2HTML () {
	// no superclass defined

  //---------------------------------------------------------------------
  //---Attributes of Class "Wiki2HTML()"
  //---------------------------------------------------------------------
	//---PUBLIC: aProjectDir (String): the attribute 'aProjectDir' stores in 'String' the relative path in the PanDoc root directory
	this.aWikiTitle = "Swarm intelligence";
	//---PUBLIC: aProjectDir (String): the attribute 'aProjectDir' stores in 'String' the relative path in the PanDoc root directory
	this.aProjectDir = "demo/my_article";
	//---PUBLIC: aRemoteMedia (Boolean): the attribute 'aRemoteMedia' stores in 'Boolean' variable if the MediaLinks are stored in the local file system of referenced to remote Media Server
	this.aRemoteMedia = false;
	//---PUBLIC: aLanguage ID (String): defines the Language of the MediaWiki
	this.aLanguage = "en";
	//---PUBLIC: aDomain(String): defines the MediaWiki product of Wiki Foundation "wikiversity", "wikipedia", ..
	this.aDomain = "wikiversity";
	//---PUBLIC: aTOC stored the TOC Table of Contents parsed from the section structure of the Wiki/HMTL file
	this.aTOC = [];
	this.aInsertTOC = true; // will be inserted in sections
	//---PUBLIC: aServer is set with the init(pLanguage,pDomain) together with aLanguage and aDomain
	this.aServer = "https://en.wikiversity.org/wiki/";
	//---PUBLIC: aMediaPath is used for downloading the embedded image resp. the referencing the images in the HTML
	this.aMediaPath = "https://en.wikiversity.org/wiki/Special:Redirect/file/";
	//---PUBLIC: aDocJSON is a Hash that collects the data while parsing the vWikiCode generated by wtf_wikipedia.js set by init()-call
	this.aDocJSON = {};
	// depricated replaced by aDocJSON
	this.aParseJSON = {};
	//---PUBLIC: aDefaultImageWidth is used if width of the image in not defined
	this.aDefaultImageWidth = 300;

	this.aMap = {};
	this.aMap["w"] = "wikipedia";
	this.aMap["wikipedia"] = "wikipedia";
	this.aMap["Wikipedia"] = "wikipedia";
	this.aMap["v"] = "wikiversity";
	this.aMap["wikiversity"] = "wikiversity";
	this.aMap["Wikiversity"] = "wikiversity";
	this.aMap["b"] = "wikibooks";
	this.aMap["wikibooks"] = "wikibooks";
	this.aMap["Wikibooks"] = "wikibooks";

	this.aFilePrefix = {};
	this.aFilePrefix["File"] = "File";
	this.aFilePrefix["file"] = "File";
	this.aFilePrefix["Datei"] = "File";
	this.aFilePrefix["Image"] = "File";

	this.aMediaArray = [];
	this.aTplEngine = new TemplateEngine();


  //---------------------------------------------------------------------
  //---Methods of Class "Wiki2HTML()"
  //---------------------------------------------------------------------
	//----PUBLIC Method: Wiki2HTML.parse(pWikiCode:String):String-----
	// parse(pWikiCode)  Return: String
	//	parses the MediaWiki code in argument and returns a HTML string
	//----PUBLIC Method: Wiki2HTML.clean_source(pWikiCode:String):String-----
	// clean_source(pWikiCode)  Return: String
	//	clean_source(pWikiCode) normalizes line breaks in order to have a common base string for all browsers.
	//	clean_source() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
	//	after removing all CRs.
	//----PUBLIC Method: Wiki2HTML.sections(pWikiCode:String):String-----
	// sections(pWikiCode)  Return: String
	//	Convert all sections in Wiki source code
	//----PUBLIC Method: Wiki2HTML.horizontalRule(pWikiCode:String):String-----
	// horizontalRule(pWikiCode)  Return: String
	//	Convert the  horizontal rules in Wiki source code
	//----PUBLIC Method: Wiki2HTML.inlineElement(pWikiCode:String):String-----
	// inlineElement(pWikiCode)  Return: String
	//	Convert for inline elements of the Wiki source code
	//----PUBLIC Method: Wiki2HTML.replaceImages(pWikiCode:String):String-----
	// replaceImages(pWikiCode)  Return: String
	//	Convert for inline elements of the Wiki source code
	//----PUBLIC Method: Wiki2HTML.list(pWikiCode:String):String-----
	// list(pWikiCode)  Return: String
	//	Convert orderd and unorderd list in the Wiki Source code
	//----PUBLIC Method: Wiki2HTML.table(pWikiCode:String):String-----
	// table(pWikiCode)  Return: String
	//	Convert the table from WikiSource code in HTML
	//----PUBLIC Method: Wiki2HTML.paragraph(pWikiCode:String):String-----
	// paragraph(pWikiCode)  Return: String
	//	Convert all paragraphs in the Wiki source code
	//----PUBLIC Method: Wiki2HTML.math2jax(pWikiCode:String,pFormat:String):String-----
	// math2jax(pWikiCode,pFormat)  Return: String
	//	Convert the MATH-tag to a MathJax compatible HTML enviroment dependent of the pFormat of the parameter of math2jax.
	//	pFormat = 'reveal' 'html' are possible formats
	//----PUBLIC Method: Wiki2HTML.extractTOC(pWikiCode:String):String-----
	// extractTOC(pWikiCode)  Return: String
	//	Convert the table of contents from Wiki source code into HTML
	//----PUBLIC Method: Wiki2HTML.generateTOC(pWikiCode:String):String-----
	// generateTOC(pWikiCode)  Return: String
	//	Convert the table of contents from Wiki source code into HTML. TOC stored in this.aTOC as JSON file
	//----PUBLIC Method: Wiki2HTML.convertWiki2Local(pContent:String,:Hash):String-----
	// convertWiki2Local(pContent)  Return: String
	//	convertWiki2Local() replaces the MediaWiki internal links to links that work in a local HTML file. The parsed vMediaWiki Links
	//----PUBLIC Method: Wiki2HTML.parseWiki4Media(pWikiCode:String):Array-----
	// parseWiki4Media(pWikiCode)  Return: Array
	//	parseWiki4Media() the pWikiCode and extract the Media and File links.
	//----PUBLIC Method: Wiki2HTML.createMediaParseJSON(vMediaArray:Array)-----
	// createMediaParseJSON(vMediaArray)
	//	createMediaParseJSON(vMediaArray:Array) creates in this.aParseJSON["media"]={} a Hash
	//	that maps the local file path 'image/my_image.png' to the replace path
	//	this.aParseJSON["media"]["image/my_image.png"] = "https://commons.wikimedia.org/wiki/my_image.png"
	//----PUBLIC Method: Wiki2HTML.checkParseJSON(pHashID:String)-----
	// checkParseJSON(pHashID)
	//	checkParseJSON() checks if the File Link definitions exists in the pWikiHash["media"]
	//----PUBLIC Method: Wiki2HTML.getMediaSubDir(pMediaLink:String)-----
	// getMediaSubDir(pMediaLink)
	//	getMediaSubDir(pMediaLink) return for a pMediaLink the appropriate subdirectory.
	//----PUBLIC Method: Wiki2HTML.convertWikiMedia2File(pMediaLink:String):String-----
	// convertWikiMedia2File(pMediaLink)  Return: String
	//	convertWikiMedia2File(pMediaLink) converts the pMediaLink into an URL and returns the media link.
	//	removes blanks at the tail and replaces blanks with and underscore "_"
	//	and non-alpha-numerical characters with an underscore, so that finally the filename works fine on all file systems
	//----PUBLIC Method: Wiki2HTML.convertWikiMedia2URL(pMediaLink:String):String-----
	// convertWikiMedia2URL(pMediaLink)  Return: String
	//	convertWikiMedia2URL(pMediaLink) removes blanks at the tail and replaces blanks with and underscore "_"
	//----PUBLIC Method: Wiki2HTML.downloadWikiMedia(pMediaArray:Array)-----
	// downloadWikiMedia(pMediaArray)
	//	downloadWikiMedia(pMediaArray:Array) download the images to level-fs
	//	that can be exported as ZIP-file with archiver NPM module
	//----PUBLIC Method: Wiki2HTML.downloadMediaFile(pMediaLink:String)-----
	// downloadMediaFile(pMediaLink)
	//	downloadMediaFile(pMediaFile) from WikiMedia Commons to the local filesystem emulated with level-fs
	//----PUBLIC Method: Wiki2HTML.convertMediaLink4Wiki(pContent:String,pMediaArray:Array):String-----
	// convertMediaLink4Wiki(pContent,pMediaArray)  Return: String
	//	convertMediaLink4Wiki(pContent,pMediaWiki) convert the link
	//	- [[File:MyFile.png....   with
	//	- [File:https://commons.wikimedia.org/.../MyFile.png
	//----PUBLIC Method: Wiki2HTML.replaceString(pString:String,pSearch:String,pReplace:String):String-----
	// replaceString(pString,pSearch,pReplace)  Return: String
	//	replaceString(pString,pSearch,pReplace) replaces globally pSearch by pReplace and returns the modified string
	//----PUBLIC Method: Wiki2HTML.convertWiki2Online(pContent:String):String-----
	// convertWiki2Online(pContent)  Return: String
	//	convertWiki2Online(pContent) converts the Links and Media in way so that media and links
	//	are referenced to online resource to the server
	//----PUBLIC Method: Wiki2HTML.replaceWikiLinks(pWikiCode:String:Hash):String-----
	// replaceWikiLinks(pWikiCode)  Return: String
	//	Comment for replaceWikiLinks
	//----PUBLIC Method: Wiki2HTML.getWikiLinks(pWikiCode:String):String-----
	// getWikiLinks(pWikiCode)  Return: String
	//	getWikiLinks(pWikiCode) extract Double-Bracket [[...]] link in pWikiCode
	//----PUBLIC Method: Wiki2HTML.convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String-----
	// convertMediaLink4WikiOnline(pContent,pMediaArray)  Return: String
	//	convertMediaLink4WikiOnline(pWikiCode,pMediaArray) converts Media Links to WikiMedia Commons
	//	to a remote link for local files



}
//-------------------------------------------------------------------------
//---END Constructor of Class "Wiki2HTML()"
//-------------------------------------------------------------------------

//#################################################################
//# PUBLIC Method: init()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pLanguage:String
//#    pWikiID:String
//# Comment:
//#    parses the MediaWiki code in argument and returns a HTML string
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################


Wiki2HTML.prototype.init = function (pLanguage,pDomain,pDocJSON) {
	this.aLanguage = pLanguage;
	this.aDomain = pDomain; // e.g. "wikiversity"
	this.aServer = "https://"+this.aLanguage+"."+this.aDomain+".org/wiki/";
	this.aMediaPath = "https://"+this.aLanguage+"."+this.aDomain+".org/wiki/Special:Redirect/file/";
	this.aDocJSON = pDocJSON || {};
	if (this.aDocJSON.hasOwnProperty("lang_or_wikiid")) {
			delete this.aDocJSON["lang_or_wikiid"];
	};
	this.aDocJSON["language"] = pLanguage;
	this.aDocJSON["domain"] = pDomain;
};
//----End of Method init Definition


//#################################################################
//# PUBLIC Method: parse()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    parses the MediaWiki code in argument and returns a HTML string
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.parse = function (pWikiCode,pWikiTitle) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: parse(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: parse(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.parse(pWikiCode);
  //-------------------------------------------------------

  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
			pWikiTitle = pWikiTitle || "Title undefined in parse()";
  		var html = '<p>function wiki2html(pWikiCode): an error occurs</p>';
			this.aWikiTitle = pWikiTitle.replace(/_/g," ");
			// set Title in DocJSON
			if ((this.aDocJSON) && (this.aDocJSON.sections) && (this.aDocJSON.sections.length >0)) {
				// set Title in first section of aDocJSON
				this.aDocJSON.sections[0]["title"] = this.replaceString(this.aWikiTitle,"_"," ");
				// set Downloaded URL in aDocJSON
				this.aDocJSON["url"] = this.aServer+this.aWikiTitle;
				// set Download Time in aDocJSON
				var now = new Date();
				this.aDocJSON["date"] = now.toJSON();
			};
			if (this.aRemoteMedia == true) {
				// remote Media links
				//pWikiCode = this.convertWiki2Online(pWikiCode);
			} else {
				// local media links - requires download of Media files for display
				//pWikiCode = this.convertWiki2Local(pWikiCode);
				// ZIP/archive downloaded files TODO
			};
			// saveJSON("wikidata.json",vParseJSON); // TODO
			pWikiCode = this.clean_source(pWikiCode);
			pWikiCode = this.paragraph(pWikiCode);
			pWikiCode = this.math2jax(pWikiCode);
			pWikiCode = this.math2reveal(pWikiCode);
			pWikiCode = this.sections(pWikiCode);
  		pWikiCode = this.horizontalRule(pWikiCode);
			pWikiCode = this.replaceWikiLinks(pWikiCode);
			//pWikiCode = this.convertWiki2Local(pWikiCode);
			pWikiCode = this.replaceImages(pWikiCode);
			pWikiCode = this.inlineElement(pWikiCode);

  		pWikiCode = this.list(pWikiCode);
  		pWikiCode = this.table(pWikiCode);
			// collect a TOC (Table of Contents) JSON in vHashTOC.
			// Level=0 is the root level of TOC, it will NOT be stored in this.aTOC
			// unless vDepthIncrease > 0 and "title" of root section != ""
			// extractTOC() uses aDocJSON to create the TOC
			// this.extractTOC() will replace the this.aTOC attribute with vHashTOC if level=0
			var vDepthIncrease = 0; // increase depth of TOC (Table of Contents)
			//  set vDepthIncrease to 1 for WikiBookCreator because a section for collected articles necessary
			this.extractTOC(vDepthIncrease); // parse TOC
			pWikiCode = this.insertTOC(pWikiCode); // Inserts if this.aInsertTOC == true
			// Clean Wiki deletes currently unsupported Wiki Source Code
			pWikiCode = this.clean_unsupported_wiki(pWikiCode);
			html = pWikiCode;

  		return html;

};
//----End of Method parse Definition

//#################################################################
//# PUBLIC Method: clean_unsupported_wiki()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    clean_unsupported_wiki(pWikiCode) removes double bracket {{...}} Wiki commands.
//#    clean_unsupported_wiki() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
//#    after removing all {{...}} commands still left in Wiki Code.
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.clean_unsupported_wiki = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: clean_unsupported_wiki(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: clean_unsupported_wiki(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.clean_unsupported_wiki(pWikiCode);
  //-------------------------------------------------------
	pWikiCode = pWikiCode.replace(/\{\{[^}]\}\}/g, '');
  return pWikiCode;

};
//----End of Method clean_unsupported_wiki Definition


//#################################################################
//# PUBLIC Method: clean_source()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    clean_source(pWikiCode) normalizes line breaks in order to have a common base string for all browsers.
//#    clean_source() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
//#    after removing all CRs.
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.clean_source = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: clean_source(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: clean_source(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.clean_source(pWikiCode);
  //-------------------------------------------------------
	pWikiCode = this.replaceString(pWikiCode,"[[Image:","[[File:");
	pWikiCode = this.replaceString(pWikiCode,"[[Datei:","[[File:");
	pWikiCode = this.replaceString(pWikiCode,"|thumbnail|","|thumb|");
	pWikiCode = this.replaceString(pWikiCode,"|thumbnail]]","|thumb| ]]");
	pWikiCode = this.replaceString(pWikiCode,"|mini|","|thumb|");
	pWikiCode = this.replaceString(pWikiCode,"|mini]]","|thumb| ]]");
	//pWikiCode = pWikiCode.replace(/[|](thumbnail|mini)(\]|\|)/g,"|thumb$2");
  pWikiCode = pWikiCode.replace(/\r/g, '');
  return pWikiCode;

};
//----End of Method clean_source Definition


//#################################################################
//# PUBLIC Method: sections()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert all sections in Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.sections = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: sections(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: sections(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.sections(pWikiCode);
  //-------------------------------------------------------

  	  var heading_1_regEx = /^=[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?=/gm;
  		var heading_2_regEx = /^==[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?==/gm;
  		var heading_3_regEx = /^===[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?===/gm;
  		var heading_4_regEx = /^====[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?====/gm;
  		var heading_5_regEx = /^=====[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?=====/gm;
  		var heading_6_regEx = /^======[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?======/gm;

  		pWikiCode = pWikiCode.replace(heading_6_regEx, '<h6>$1</h6>');
  		pWikiCode = pWikiCode.replace(heading_5_regEx, '<h5>$1</h5>');
  		pWikiCode = pWikiCode.replace(heading_4_regEx, '<h4>$1</h4>');
  		pWikiCode = pWikiCode.replace(heading_3_regEx, '<h3>$1</h3>');
  		pWikiCode = pWikiCode.replace(heading_2_regEx, '<h2>$1</h2>');
  		pWikiCode = pWikiCode.replace(heading_1_regEx, '<h1>$1</h1>');

  		return pWikiCode;

};
//----End of Method sections Definition


//#################################################################
//# PUBLIC Method: horizontalRule()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert the  horizontal rules in Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.horizontalRule = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: horizontalRule(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: horizontalRule(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.horizontalRule(pWikiCode);
  //-------------------------------------------------------

  	var horizontalLine = /----/g;

  	pWikiCode = pWikiCode.replace(horizontalLine, '<hr>');

  	return pWikiCode;

};
//----End of Method horizontalRule Definition


//#################################################################
//# PUBLIC Method: inlineElement()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert for inline elements of the Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.inlineElement = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: inlineElement(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: inlineElement(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.inlineElement(pWikiCode);
  //-------------------------------------------------------

			//var strongEm = /'''''([(0-9A-Za-z].*)'''''/g;
			var strongEm = /'''''([^']*)'''''([^'])?/g;
			//var strong = /'''([(0-9A-Za-z].*)'''/g;
			var strong = /'''([^']*)'''([^'])?/g;
			//var em = /''([(0-9A-Za-z].*)''/g;
			var em = /''([^']*)''([^'])?/g;

  		pWikiCode = pWikiCode.replace(strongEm, '<strong><em>$1</em></strong>$2');
  		pWikiCode = pWikiCode.replace(strong, '<strong>$1</strong>$2');
  		pWikiCode = pWikiCode.replace(em, '<em>$1</em>$2');

  		return pWikiCode;

};
//----End of Method inlineElement Definition


//#################################################################
//# PUBLIC Method: replaceImages()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert for inline elements of the Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.replaceImages = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: replaceImages(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: replaceImages(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.replaceImages(pWikiCode);
  //-------------------------------------------------------

	//var image = /\[\[File:(.[^\]|]*)([|]thumb|frame|mini)?([|]alt=.[^\]|]*)?([|].[^\]|]*)?\]\]/g;
	var image = /\[\[File:(.[^\]]*)\]\]/g;
	var vTitle = "";
	var vAltText = "";
	var vClass = "image";
	var vURL = "";
	var vCaption = "";
  while(tokens = image.exec(pWikiCode)) {
		vTitle = "";
		vAltText = "";
		//[[File:my Image.png|thumb|alt=Alternative Text|<a href="test.html">Test Comment</a> Image Comment]]
		//tokens[0]=my Image.png|thumb|alt=Alternative Text|<a href="test.html">Test Comment</a> Image Comment
		var vLinkSplit = (tokens[0]).split("|");
		vURL = this.getWikiMediaURL(vLinkSplit[0]);
		if (vLinkSplit.length == 1) {
			pWikiCode = pWikiCode.replace(tokens[0], '<figure class="' + vClass + '"><img src="' + vURL + '" class="' + vClass + '></figure>');
		} else {
			if (vLinkSplit.length == 2) {
				vCaption = this.checkCaption(vLinkSplit[1]);
				//pWikiCode = pWikiCode.replace(tokens[0], '<figure class="' + vClass + '"><img src="' + vURL + '" class="' + vClass + '" alt="' + tokens[0] + '"><figcaption>' + tokens[4] + '</figcaption></figure>');
				pWikiCode = pWikiCode.replace(tokens[0], '<figure class="' + vClass + '"><img src="' + vURL + '" class="' + vClass + '><figcaption>' + vCaption + '</figcaption></figure>');
			} else {
				//if vLinkSplit.length > 2 do the following LinkSplit parsing
				for (var i = 1; i < (vLinkSplit.length-1); i++) {
					if ((vLinkSplit[i]).indexOf("alt=") == 0) {
						vAltText =  ' alt="' + vLinkSplit[i] + '" ';
					} else if (vLinkSplit[i] == "thumb") {
						console.log("Background Image Slide for 'thumb'");
					};
				};
				vCaption = this.checkCaption(vLinkSplit[vLinkSplit.length-1]);
				pWikiCode = pWikiCode.replace(tokens[0], '<figure class="' + vClass + '"><img src="' + vURL + '" class="' + vClass + '"' + vAltText + '><figcaption>' + vCaption + '</figcaption></figure>');
			}
		}; // else if vLineSplit.length
	}; // While tokens
  return pWikiCode;

};
//----End of Method replaceImages Definition


//#################################################################
//# PUBLIC Method: checkCaption()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pCaption:String
//# Comment:
//#    Correct a caption removes ]] at end
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.checkCaption = function (pCaption) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: checkCaption(pCaption:String):String");
  // alert("js/wiki2html.js - Call: checkCaption(pCaption:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.checkCaption(pCaption);
  //-------------------------------------------------------
	if (pCaption) {
		pCaption = pCaption.replace(/[\]]+$/g,"");
	};
	console.log("Caption Figure: '"+pCaption+"' ");
  return pCaption;

};
//----End of Method checkCaption Definition


//#################################################################
//# PUBLIC Method: list()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert orderd and unorderd list in the Wiki Source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.list = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: list(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: list(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.list(pWikiCode);
  //-------------------------------------------------------

  	// unordered
  		var unorderedStartList = /\n\n<li>/gm; //|\r\n\r\n<li>
  		var unorderedListItem = /^\*(.*)/gm;
  		var unorderedEndList = /<\/li>\n(?!<li>)/gm; // |<\/li>\r\n(?!<li>)

  		pWikiCode = pWikiCode.replace(unorderedListItem, '<li>$1</li>');
  		pWikiCode = pWikiCode.replace(unorderedStartList, "\n<ul>\n<li>");
  		pWikiCode = pWikiCode.replace(unorderedEndList, "</li>\n</ul>\n\n");

  		// ordered
  		var orderedStartList = /\n\n<li>/gm; // |\r\n\r\n<li> ///([^<\/li>][>]?[\n])<li>/g;
  		var orderedListItem = /^#[:]?[#]* (.*)/gm;
  		var orderedEndList = /<\/li>\n(?!<li>|<\/ul>)/gm; // |<\/li>\r\n(?!<li>|<\/ul>) ///<\/li>\n(?!<li>)/gm;

  		pWikiCode = pWikiCode.replace(orderedListItem, '<li>$1</li>');
  		pWikiCode = pWikiCode.replace(orderedStartList, "\n<ol>\n<li>");
  		pWikiCode = pWikiCode.replace(orderedEndList, "</li>\n</ol>\n\n");

  		return pWikiCode;

};
//----End of Method list Definition


//#################################################################
//# PUBLIC Method: table()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert the table from WikiSource code in HTML
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.table = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: table(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: table(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.table(pWikiCode);
  //-------------------------------------------------------

  		// http://www.mediawiki.org/wiki/Help:Tables
  		var tableStart = /^\{\|/gm;
  		var tableRow = /^\|-/gm;
  		var tableHeader = /^!\s(.*)/gm;
  		var tableData = /^\|\s(.*)/gm;
  		var tableEnd = /^\|\}/gm;

  		pWikiCode = pWikiCode.replace(tableStart, '<table><tr>');
  		pWikiCode = pWikiCode.replace(tableRow, '</tr><tr>');
  		pWikiCode = pWikiCode.replace(tableHeader, '<th>$1</th>');
  		pWikiCode = pWikiCode.replace(tableData, '<td>$1</td>');
  		pWikiCode = pWikiCode.replace(tableEnd, '</tr></table>');

  		return pWikiCode;

};
//----End of Method table Definition


//#################################################################
//# PUBLIC Method: paragraph()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert all paragraphs in the Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.paragraph = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: paragraph(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: paragraph(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.paragraph(pWikiCode);
  //-------------------------------------------------------

	//var paragraph = /\n\n([^#\*=].*)/gm; //|\r\n\r\n([^#\*=].*)

	//pWikiCode = pWikiCode.replace(paragraph, "\n<p>$1</p>\n");
	var listbegin = /(\n[^#\*\n]*)(\n[#\*])/gm; //|\r\n\r\n([^#\*=].*)
	pWikiCode = pWikiCode.replace(listbegin, "$1\n\n$2");

	return pWikiCode;

};
//----End of Method paragraph Definition


//#################################################################
//# PUBLIC Method: math2jax()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//#    pFormat:String
//# Comment:
//#    Convert the MATH-tag to a MathJax compatible HTML enviroment dependent of the pFormat of the parameter of math2jax.
//#    pFormat = 'reveal' 'html' are possible formats
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.math2jax = function (pWikiCode,pFormat) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: math2jax(pWikiCode:String,pFormat:String):String");
  // alert("js/wiki2html.js - Call: math2jax(pWikiCode:String,pFormat:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.math2jax(pWikiCode,pFormat);
  //-------------------------------------------------------
	pWikiCode = pWikiCode.replace(/\\R /g,"\\mathbb R ");
	pWikiCode = pWikiCode.replace(/\\R\^/g,"\\mathbb R^");
	pWikiCode = pWikiCode.replace(/\\R</g,"\\mathbb R<");
	pWikiCode = pWikiCode.replace(/\\R\s/g,"\\mathbb R ");
	//pWikiCode =this.replaceString(pWikiCode,'\\','\mathbb R \\');
	return pWikiCode;

};
//----End of Method math2jax Definition


//#################################################################
//# PUBLIC Method: mathsymbols()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//#    pFormat:String
//# Comment:
//#    Convert math symbols for proper handling in MathJax
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.mathsymbols = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: mathsymbols(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call:  mathsymbols(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    pWikiCode = vMyInstance.mathsymbols(pWikiCode);
  //-------------------------------------------------------
	pWikiCode = pWikiCode.replace(/\\R /g,"\\mathbb R ");
	pWikiCode = pWikiCode.replace(/\\R\^/g,"\\mathbb R^");
	pWikiCode = pWikiCode.replace(/\\R</g,"\\mathbb R<");
	pWikiCode = pWikiCode.replace(/\\R\s/g,"\\mathbb R ");
	//pWikiCode =this.replaceString(pWikiCode,'\\','\mathbb R \\');
	return pWikiCode;

};
//----End of Method math2jax Definition


//#################################################################
//# PUBLIC Method: math2reveal()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert math symbols for proper handling in MathJax
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.math2reveal = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: math2reveal(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call:  math2reveal(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    pWikiCode = vMyInstance.math2reveal(pWikiCode);
  //-------------------------------------------------------
	//pWikiCode = pWikiCode.replace(/\\R /g,"\\mathbb R ");
	//pWikiCode =this.replaceString(pWikiCode,'\\','\mathbb R \\');
	//-------------------------------------------------------
	// 'Greedy' means match longest possible string.
	// 'Lazy' means match shortest possible string.
	// For example, the greedy h.+l matches 'hell' in 'hello' but the lazy h.+?l
	//-------------------------------------------------------
	// DISPLAY MATH REPLACEMENT
	// DISPLAY MATH <p><span class="math display">\[ f(x) \]</span></p>
	var vMathTag = /\n(:<math[^>]+>)(.+?)(<\/math>)/gi;
	var vMath = "";
  while(tokens = vMathTag.exec(pWikiCode)) {
		vMath = tokens[1];
		pWikiCode = this.replaceString(pWikiCode,tokens[0]+tokens[1]+tokens[2],"<p><span class=\"math display\">\\["+vMath+"\\]</span></p>")
	};
	//-------------------------------------------------------
	// INLINE MATH REPLACEMENT
	// INLINE MATH <span class="math inline">\( f(x) \)</span>
	vMathTag = /(<math[^>]+>)(.+?)(<\/math>)/gi;
	while(tokens = vMathTag.exec(pWikiCode)) {
		vMath = tokens[1];
		pWikiCode = this.replaceString(pWikiCode,tokens[0]+tokens[1]+tokens[2],"<span class=\"math inline\">\\("+vMath+"\\)</span>")
	};
	return pWikiCode;

};
//----End of Method math2reveal() Definition


//#################################################################
//# PUBLIC Method: extractTOC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert the table of contents from Wiki source code into HTML
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.extractTOC = function (pWikiCode,pDepthIncrease) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: extractTOC(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: extractTOC(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.extractTOC(pWikiCode);
  //-------------------------------------------------------
	pDepthIncrease = pDepthIncrease || 0; // Used for WikiBookCreator to increase TOC depth
	if (this.aDocJSON["type"] == "page") {
		var vSections = this.aDocJSON["sections"];
		this.aTOC = [];
		for (var i = 0; i < vSections.length; i++) {
			vSections[i]["depth"] += pDepthIncrease;
			if ((vSections[i]["title"] != "") && (vSections[i]["depth"] >0)) {
				// push a TOC record to TOC array
				this.aTOC.push({"title":vSections[i]["title"],"depth":vSections[i]["depth"]});
			}
		}; // end for
	};
};
//----End of Method extractTOC Definition

//#################################################################
//# PUBLIC Method: generateTOC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert the table of contents from Wiki source code into HTML
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.generateTOC = function () {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: generateTOC(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: generateTOC(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.generateTOC(pWikiCode);
  //-------------------------------------------------------
	var vTOC = this.aTOC;
	for (var i = 0; i < vTOC.length; i++) {
		//if (vTOC[i]["depth"] > vDepth) {
			//vTOC[i]["depth"];
			//vTOC[i]["title"]
		//}
	}
	console.log("Not implemented yet");
  return vOutTOC;

};
//----End of Method generateTOC Definition

//#################################################################
//# PUBLIC Method: insertTOC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pContent:String
//# Comment:
//#    return the opening environment of the TOC according to the depth
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.insertTOC = function (pWikiCode) {
	if (this.aInsertTOC == true) {
		var vPosH1 = pWikiCode.indexOf("<h1");
		if (vPosH1 >= 0) {
			pWikiCode = pWikiCode.slice(0, vPosH1) + "\n"+ this.generateTOC() +"\n" + pWikiCode.slice(vPosH1);
		};
	};
	return pWikiCode
};

//#################################################################
//# PUBLIC Method: openLevelTOC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pDepth:Integer
//# Comment:
//#    return the closing environment of the TOC
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.openLevelTOC = function (pDepth) {
	return "<ul>"
};

//#################################################################
//# PUBLIC Method: itemLevelTOCC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pDepth:integer
//#    pEnum:Array of Integer TOC enumeration
//#    pTitle:String
//# Comment:
//#    return the item of the TOC
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.itemLevelTOC = function (pDepth,pEnum,pTitle) {
	var vSecNr = "";
	var vDot = "";
	for (var i = 1; i < pEnum.length; i++) {
		vSecNr += vDot + pEnum[i];
	};

	return "<li>"+vSecNr+" "+pEnumpTitle+"</li>"
};

//#################################################################
//# PUBLIC Method: closeLevelTOC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pDepth:Integer
//# Comment:
//#    return the closing environment of the TOC
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.closeLevelTOC = function (pDepth) {
	return "<ul>"
}

//#################################################################
//# PUBLIC Method: convertWiki2Local()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pContent:String
//# Comment:
//#    convertWiki2Local() replaces the MediaWiki internal links to links that work in a local HTML file. The parsed vMediaWiki Links
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertWiki2Local = function (pContent) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertWiki2Local(pContent:String):String");
  // alert("js/wiki2html.js - Call: convertWiki2Local(pContent:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertWiki2Local(pContent);
  //-------------------------------------------------------

		pContent = this.replaceWikiLinks(pContent);
		var vMediaArray = this.parseWiki4Media(pContent);
		this.createMediaParseJSON(vMediaArray);
    this.downloadWikiMedia(vMediaArray);
    pContent = this.convertMediaLink4Wiki(pContent,vMediaArray);
    return pContent;

};
//----End of Method convertWiki2Local Definition


//#################################################################
//# PUBLIC Method: parseWiki4Media()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    parseWiki4Media() the pWikiCode and extract the Media and File links.
//# Return: Array
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.parseWiki4Media = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: parseWiki4Media(pWikiCode:String):Array");
  // alert("js/wiki2html.js - Call: parseWiki4Media(pWikiCode:String):Array");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.parseWiki4Media(pWikiCode);
  //-------------------------------------------------------
		// the following code is performed in clean_source()
		//pWikiCode = this.replaceString(pWikiCode,"[[Image:","[[File:");
		//pWikiCode = this.replaceString(pWikiCode,"[[Datei:","[[File:");
		var vMediaArray = [];
		// (1) find the image specs "my_image.png|330px|thumb|My Caption" in "[[File:my_image.png|330px|thumb|My Caption]]"
    //var vSearch = /\[(File|Datei|Image):([^\|]*)/;
		// (2) find just the filename "my_image.png" in "[[File:my_image.png|330px|thumb|My Caption]]"
	    var vSearch = /\[(?:File|Image|Datei):([^\|\]]+)/g;
	    // \[            # "["
	    // (?:            # non-capturing group
	    //  File|Image|Datei        #   "File" or "Image" or "Datei"
	    // )              # end non-capturing group
	    //:             # ":"
	    //(              # group 1
	    //  [^\|\]]+      #   any character except "|" or "]" at least once
	    // )              # end group 1 - this will be the image's name
	    var vResult;
	    var vCount =0;
	    while (vResult = vSearch.exec(pWikiCode)) {
	      vCount++;
      vMediaArray.push(vResult[1]);
      console.log("Media "+vCount+": '" + vResult[1] + "' found");
    };
    return vMediaArray;

};
//----End of Method parseWiki4Media Definition


//#################################################################
//# PUBLIC Method: createMediaParseJSON()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    vMediaArray:Array
//# Comment:
//#    createMediaParseJSON(vMediaArray:Array) creates in this.aParseJSON["media"]={} a Hash
//#    that maps the local file path 'image/my_image.png' to the replace path
//#    this.aParseJSON["media"]["image/my_image.png"] = "https://commons.wikimedia.org/wiki/my_image.png"
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.createMediaParseJSON = function (pMediaArray) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: createMediaParseJSON(vMediaArray:Array)");
  // alert("js/wiki2html.js - Call: createMediaParseJSON(vMediaArray:Array)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.createMediaParseJSON(vMediaArray);
  //-------------------------------------------------------

    var vMediaFile = "";
    var vSubDir = "";
    var vLocalID = "";
		var vID = "";
		this.checkParseJSON("media");
		this.aParseJSON["media"] = {};
		for (var i = 0; i < pMediaArray.length; i++) {
      vID = this.convertWikiMedia2ID(pMediaArray[i]);
      //this.aParseJSON[vMediaArray[i]] = vLocalID;
      this.aParseJSON["media"][vID] = this.getImageProps(pMediaArray[i]);
			// Hash contains all properties of the image
			//	"title": "Title of "+vMediaFile,
			//	"file": vMediaFile,
			//	"subdir": vSubDir + "/",
			//	"mediastring": pMediaArray[i],
			//	"url": "url-undefined",
			//	"align":"left"
	  };

};
//----End of Method createMediaParseJSON Definition


//#################################################################
//# PUBLIC Method: checkParseJSON()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pHashID:String
//# Comment:
//#    checkParseJSON() checks if the File Link definitions exists in the pWikiHash["media"]
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.checkParseJSON = function (pHashID) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: checkParseJSON(pHashID:String)");
  // alert("js/wiki2html.js - Call: checkParseJSON(pHashID:String)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.checkParseJSON(pHashID);
  //-------------------------------------------------------
	if (this.aParseJSON[pHashID]) {
    console.log("ParseJSON['"+pHashID+"']  exists!");
  } else {
    this.aParseJSON[pHashID] = {};
  };
};
//----End of Method checkParseJSON Definition


//#################################################################
//# PUBLIC Method: getMediaSubDir()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaLink:String
//# Comment:
//#    getMediaSubDir(pMediaLink) return for a pMediaLink the appropriate subdirectory.
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.getMediaSubDir = function (pMediaLink) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: getMediaSubDir(pMediaLink:String)");
  // alert("js/wiki2html.js - Call: getMediaSubDir(pMediaLink:String)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.getMediaSubDir(pMediaLink);
  //-------------------------------------------------------
		var vMediaFile = "";
    var vSubDir = "";
    if (pMediaLink) {
      vSubDir = this.getMediaSubDir(pMediaLink);
      vMediaFile = this.convertWikiMedia2File(pMediaLink);
      vSubDir  = vSubDir + "/" + vMediaFile
    };
		return vSubDir;
};
//----End of Method getMediaSubDir Definition

//#################################################################
//# PUBLIC Method: correct_filename()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pFilename:String
//# Return: String
//# Comment:
//#    convert filename to local filename
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################
Wiki2HTML.prototype.correct_filename = function (pFileName) {
	pFileName = pFileName.replace(/[^\/\\A-Za-z0-9\.]/g,"_");
	pFileName = pFileName.replace(/[_]+/g,"_");
	return pFileName
}


//#################################################################
//# PUBLIC Method: getMediaSubDir()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pFilename:String
//# Return: String
//# Comment:
//#    get Subdirectory according to file extension
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################
Wiki2HTML.prototype.getMediaSubDir = function (pFileName) {
	if (pFileName) {
		this.correct_filename(pFileName)
	};
	return pFileName;
}

//#################################################################
//# PUBLIC Method: convertWikiMedia2File()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaLink:String
//# Comment:
//#    convertWikiMedia2File(pMediaLink) converts the pMediaLink into an URL and returns the media link.
//#    removes blanks at the tail and replaces blanks with and underscore "_"
//#    and non-alpha-numerical characters with an underscore, so that finally the filename works fine on all file systems
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertWikiMedia2File = function (pMediaLink) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertWikiMedia2File(pMediaLink:String):String");
  // alert("js/wiki2html.js - Call: convertWikiMedia2File(pMediaLink:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertWikiMedia2File(pMediaLink);
  //-------------------------------------------------------
	var vMediaFile = "";

	var vPathSplit = pMediaLink.split("/");
	if (vPathSplit.length >0) {
		vMediaFile = vPathSplit[vPathSplit.length-1];
		//vMediaFile = this.correct_filename(vMediaFile);
	} else {
		console.log("ERROR: pMediaLink='"+pMediaLink+"' is not defined");
	};
  return vMediaFile;

};
//----End of Method convertWikiMedia2File Definition


//#################################################################
//# PUBLIC Method: convertWikiMedia2URL()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaLink:String
//# Comment:
//#    convertWikiMedia2URL(pMediaLink) removes blanks at the tail and replaces blanks with and underscore "_"
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertWikiMedia2URL = function (pMediaLink) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertWikiMedia2URL(pMediaLink:String):String");
  // alert("js/wiki2html.js - Call: convertWikiMedia2URL(pMediaLink:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertWikiMedia2URL(pMediaLink);
  //-------------------------------------------------------

    pMediaLink = pMediaLink.replace(/[ \t]+$/,"");
    pMediaLink = pMediaLink.replace(/ /g,"_");
    //console.log("MediaLink: '"+pMediaLink+"'");
    return pMediaLink;

};
//----End of Method convertWikiMedia2URL Definition

//#################################################################
//# PUBLIC Method: convertWikiMedia2ID()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaLink:String
//# Comment:
//#    convertWikiMedia2ID(pMediaLink) removes blanks at the tail and replaces blanks with and underscore "_"
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertWikiMedia2ID = function (pMediaLink) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertWikiMedia2ID(pMediaLink:String):String");
  // alert("js/wiki2html.js - Call: convertWikiMedia2ID(pMediaLink:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertWikiMedia2ID(pMediaLink);
  //-------------------------------------------------------

    pMediaLink = this.convertWikiMedia2URL(pMediaLink);
    pMediaLink = pMediaLink.replace(/[^A-Za-z0-9_]/g,"_");
		pMediaLink = pMediaLink.replace(/[_]+/g,"_");
    //console.log("MediaLink: '"+pMediaLink+"'");
    return pMediaLink;

};
//----End of Method convertWikiMedia2ID Definition

//#################################################################
//# PUBLIC Method: downloadWikiMedia()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaArray:Array
//# Comment:
//#    downloadWikiMedia(pMediaArray:Array) download the images to level-fs
//#    that can be exported as ZIP-file with archiver NPM module
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.downloadWikiMedia = function (pMediaArray) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: downloadWikiMedia(pMediaArray:Array)");
  // alert("js/wiki2html.js - Call: downloadWikiMedia(pMediaArray:Array)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.downloadWikiMedia(pMediaArray);
  //-------------------------------------------------------

    for (var i = 0; i < pMediaArray.length; i++) {
      this.downloadMediaFile(pMediaArray[i]);
    };

};
//----End of Method downloadWikiMedia Definition


//#################################################################
//# PUBLIC Method: downloadMediaFile()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaLink:String
//# Comment:
//#    downloadMediaFile(pMediaFile) from WikiMedia Commons to the local filesystem emulated with level-fs
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.downloadMediaFile = function (pMediaLink) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: downloadMediaFile(pMediaLink:String)");
  // alert("js/wiki2html.js - Call: downloadMediaFile(pMediaLink:String)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.downloadMediaFile(pMediaLink);
  //-------------------------------------------------------
	var vSubDir = this.getMediaSubDir(pMediaLink);
	// convertWikiMedia2File "http://www,srv.org/img/my_image.png" to  "my_image.png"
	var vMediaFile = this.convertWikiMedia2File(pMediaLink);
	// add a subdirectory according to file type
	// e.g."my_image.png" to "img/my_image.png"
	// or  "my_music.mp3" to "audio/my_music.mp3"
	// or  "my_video.webm" to "video/my_video.webm"
	var vLocalLink = vSubDir + "/" + vMediaFile;
	var vWGET_CMD = "wget -O " + this.aProjectDir + "/" + vLocalLink + " "+ pMediaLink;
	console.log("CALL WGET: "+vWGET_CMD+" (e.g. in NodeJS)");
	console.log("Download Media File '"+pMediaLink+"' to folder '"+this.aProjectDir+"' not implemented yet");

};
//----End of Method downloadMediaFile Definition


//#################################################################
//# PUBLIC Method: convertMediaLink4Wiki()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pContent:String
//#    pMediaArray:Array
//# Comment:
//#    convertMediaLink4Wiki(pContent,pMediaWiki) convert the link
//#    - [[File:MyFile.png....   with
//#    - [File:https://commons.wikimedia.org/.../MyFile.png
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertMediaLink4Wiki = function (pWikiCode,pMediaArray) {
  //----Debugging------------------------------------------
  console.log("js/wiki2html.js - Call: convertMediaLink4Wiki(pWikiCode:String,pMediaArray:Array):String");
  // alert("js/wiki2html.js - Call: convertMediaLink4Wiki(pContent:String,pMediaArray:Array):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertMediaLink4Wiki(pContent,pMediaArray);
  //-------------------------------------------------------

    var vReplaceLink;
    var vMediaFile;
    var vSubDir;
		var vLinkHTML;

    pWikiCode = pWikiCode.replace(/\[(File|Image|Datei):/gi,"[File:");

    for (var i = 0; i < pMediaArray.length; i++) {
      vSubDir = this.getMediaSubDir(pMediaArray[i]);
			// convertWikiMedia2File "http://www,srv.org/img/my_image.png" to  "my_image.png"
      vMediaFile = this.convertWikiMedia2File(pMediaArray[i]);
      vReplaceLink = vSubDir + "/" + vMediaFile;

			pWikiCode = this.replaceString(pWikiCode,"File:"+pMediaArray[i],"File:"+vReplaceLink);
    };
    return pWikiCode;

};
//----End of Method convertMediaLink4Wiki Definition


//#################################################################
//# PUBLIC Method: replaceString()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pString:String
//#    pSearch:String
//#    pReplace:String
//# Comment:
//#    replaceString(pString,pSearch,pReplace) replaces globally pSearch by pReplace and returns the modified string
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.replaceString = function (pString,pSearch,pReplace) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: replaceString(pString:String,pSearch:String,pReplace:String):String");
  // alert("js/wiki2html.js - Call: replaceString(pString:String,pSearch:String,pReplace:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.replaceString(pString,pSearch,pReplace);
  //-------------------------------------------------------

  	//alert("cstring.js - replaceString() "+pString);
  	if (!pString) {
  		alert("replaceString()-Call - pString not defined!");
  	} else if (pString != '') {
			//alert("cstring.js - replaceString() "+pString);
			var vHelpString = '';
			var vN = pString.indexOf(pSearch);
			var vReturnString = '';
			while (vN >= 0) {
				if (vN > 0)
					vReturnString += pString.substring(0, vN);
					vReturnString += pReplace;
								if (vN + pSearch.length < pString.length) {
						pString = pString.substring(vN+pSearch.length, pString.length);
				} else {
						pString = ''
				};
				vN = pString.indexOf(pSearch);
			};
			return vReturnString + pString;
		};
};
//----End of Method replaceString Definition


//#################################################################
//# PUBLIC Method: convertWiki2Online()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pContent:String
//# Comment:
//#    convertWiki2Online(pContent) converts the Links and Media in way so that media and links
//#    are referenced to online resource to the server
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertWiki2Online = function (pContent) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertWiki2Online(pContent:String):String");
  // alert("js/wiki2html.js - Call: convertWiki2Online(pContent:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertWiki2Online(pContent);
  //-------------------------------------------------------

    var vMediaArray = this.parseWiki4Media(pContent);
    // this.downloadWikiMedia(vMediaArray);
    pContent = this.convertMediaLink4WikiOnline(pContent,vMediaArray);
    pContent = this.replaceWikiLinks(pContent);
    return pContent;

};
//----End of Method convertWiki2Online Definition


//#################################################################
//# PUBLIC Method: replaceWikiLinks()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Comment for replaceWikiLinks
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.replaceWikiLinks = function (pWikiCode) {
  //----Debugging------------------------------------------
  console.log("js/wiki2html.js - Call: replaceWikiLinks(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: replaceWikiLinks(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.replaceWikiLinks(pWikiCode);
  //-------------------------------------------------------

    var vLinkArray = this.getWikiLinks(pWikiCode);
    var vURL,Title,vLink,vLocalLink;
    var vPipePos = 0;
		var vColonPos = 0;
		this.aMediaArray = [];
    this.checkParseJSON("links");
		var vCount = 0;
    for (var i = 0; i < vLinkArray.length; i++) {
      vLink = vLinkArray[i];
      vPipePos = vLink.indexOf("|");
			if (vPipePos>0) {
				//Wiki-Link 1: '/Birds/|Swarm of Birds' found
				//Wiki-Link 2: 'Water|Water Learning Resource' found
				//Wiki-Link 3: 'w:Water|Water Wikipedia' found
				//Wiki-Link 4: 'v:Water|Water Wikiversity' found
				vURL = vLink.substr(0,vPipePos);
				vTitle = vLink.substr(vPipePos+1,vLink.length);
      } else {
				//Wiki-Link 1: 'Swarm Intelligence' found
				//Wiki-Link 2: 'Water' found
				//Wiki-Link 3: '/Birds/' found
			  vURL = vLink;
        vTitle = vLink.replace(/\//g,"");
      };
			//Wiki-Link 1: 'w:Water|Water Wikipedia' found
			//Wiki-Link 4: 'Wikiversity:Water|Water Wikiversity' found
			vColonPos = vURL.indexOf(":");
			if (vColonPos > 0) {
				//for Wikipedia:Water vLinkSplit[0]= "Wikipedia" -> is a not interwikilink
				// link contains colon ":"
				var vColonPrefix = vURL.substr(0,vColonPos);
				//vColonPrefix w,v,Wikipedia,wikiversity Interwiki Link
				if (vColonPrefix.toLowerCase() == "category") {
					// [[Category:Risk management]]
					console.log("Category with Local Wiki Link '"+vURL+"' found");
					vURL = this.getWikiDisplayURL(vURL);
					vLocalLink = "<a href=\""+vURL+"\" target=\"_blank\">"+vTitle+"</a>";
				  pWikiCode = this.replaceString(pWikiCode,"[["+vLink+"]]",vLocalLink);
				  // for reverse replacement to online Wikipedia or Wikiversity store replacement in ParseJSON
				  this.aParseJSON["links"][vLocalLink] = "["+vLink+"]";
			 	} else if (this.aFilePrefix.hasOwnProperty(vColonPrefix)) {
					console.log("URL: '"+vURL+"' is an image, do not replace by URL text reference.");
					this.aMediaArray.push(vURL);
				} else if (this.aMap.hasOwnProperty(vColonPrefix)) {
					// do something for interwiki links
					console.log("Inter Wiki Link '"+vURL+"' found");
					vURL = this.getWikiDisplayURL(vURL);
		      vLocalLink = "<a href=\""+vURL+"\" target=\"_blank\">"+vTitle+"</a>";
		      pWikiCode = this.replaceString(pWikiCode,"[["+vLink+"]]",vLocalLink);
		      // for reverse replacement to online Wikipedia or Wikiversity store replacement in ParseJSON
		      this.aParseJSON["links"][vLocalLink] = "["+vLink+"]";
				}
			} else {
				console.log("Local Wiki Link '"+vURL+"' found");
				vURL = this.getWikiDisplayURL(vURL);
	      vLocalLink = "<a href=\""+vURL+"\" target=\"_blank\">"+vTitle+"</a>";
	      pWikiCode = this.replaceString(pWikiCode,"[["+vLink+"]]",vLocalLink);
	      // for reverse replacement to online Wikipedia or Wikiversity store replacement in ParseJSON
	      this.aParseJSON["links"][vLocalLink] = "["+vLink+"]";
			};
	  };
		// Replace External Links: [http://www.example.com Example Server]
		var external_links = /\[(https:\/\/|http:\/\/)([a-zA-Z0-9].[^\s]*) ([a-zA-Z0-9].[^\]]*)\]/g;
		pWikiCode = pWikiCode.replace(external_links, '<a href="$1$2" target="_blank">$3</a>');

    return pWikiCode;
};
//----End of Method replaceWikiLinks Definition

//#################################################################
//# PUBLIC Method: getWikiDisplayURL()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Comment for replaceWikiLinks
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.getWikiDisplayURL= function (pLink) {
	var vLanguage = this.aLanguage;
	var vServer  = this.aLanguage+"."+this.aDomain+".org";
	console.log("getWikiDisplayURL('"+pLink+"') vServer='"+vServer+"'");
	var vMap = this.aMap;
	pLink = pLink || "undefined link";
	pLink =this.replaceString(pLink," ","_");
	var vLinkArr = pLink.split(":");
	// pLink = "Wikipedia:Water"
	var vArticle = pLink;
	// vArticle = "Water"
	if (vLinkArr.length == 2) {
		// Wikipedia:Swarm_intelligence
		// w:Swarm_intelligence
		// /Slime_mold/
		// Category:Risk Management
		if ((vLinkArr[0]).toLowerCase() == "category") {
			// Category:Risk Management
			vArticle = pLink || "undefined_wiki_link";
		} else {
			// w:Swarm_intelligence
			vServer = vLanguage + "." + vMap[vLinkArr[0]]+".org";
			vArticle = vLinkArr[1] || "undefined_wiki_link";
		};

	} else if (vLinkArr.length == 3) {
		// w:en:Swarm_intelligence
		// [[Wikipedia:Category:Risk Management]]
		var vLinkLanguage = this.aLanguage;
		var vLinkDomain = this.aDomain;
		if ((vLinkArr[1]).toLowerCase() == "category") {
			// [[Wikipedia:Category:Risk Management]]
			vArticle = vLinkArr[1]+":"+vLinkArr[2] || "undefined_category";
			// vArticle = "Category:Risk Management"
		} else {
			vArticle = vLinkArr[2] || "undefined_wiki_link";
			// w:en:Swarm_intelligence
			vLinkLanguage = vLinkArr[1];     // vLinkArr[1] = "en"
			vLinkDomain = vMap[vLinkArr[0]]; // map "w" to "wikipedia"
		};
		vServer = vLinkLanguage + "." + vLinkDomain +".org";
	} else if (vArticle.indexOf("/")==0) {
		// Link: "/Slime mold/"
		vArticle = this.aWikiTitle+vArticle;
		// Link: "Swarm intelligence/Slime mold/ "
		vArticle = vArticle.replace(/[\/\s]+$/i,"");
		// Link: "Swarm intelligence/Slime mold"
	};
	vArticle = this.replaceString(vArticle," ","_");
	// Link: "Swarm_intelligence/Slime_mold"
	return "https://"+vServer+"/wiki/"+vArticle;
};

//#################################################################
//# PUBLIC Method: getWikiMediaURL()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pFileName:String
//# Comment:
//#
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################
Wiki2HTML.prototype.getWikiMediaURL = function(pFileName) {
	pFileName = pFileName.replace(/^\[\[(File|Image|Datei):/gi,"");
	pFileName = pFileName.replace(/[\]]+$/gi,"");
	pFileName = pFileName.replace(/\s/g,"_");
	return this.aMediaPath+pFileName;
};

//#################################################################
//# PUBLIC Method: getWikiDisplayURL()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pFilename:String
//# Comment:
//#
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.getMediaFileType = function (pFileName) {
	var vType = "none";
	if ( /\.(jpe?g|png|gif|bmp)$/i.test(pFileName) ) {
		vType = "img";
	};
	if ( /\.(svg)$/i.test(pFileName) ) {
		vType = "svg";
	};
	if ( /\.(mp4|webm|mov|avi|mpe?g|ogv)$/i.test(pFileName) ) {
		vType = "video";
	};
	if ( /\.(mp3|wav|ogg|mid)$/i.test(pFileName) ) {
		vType = "audio";
	};
	return vType
}

//#################################################################
//# PUBLIC Method: getWikiLinks()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    getWikiLinks(pWikiCode) extract Double-Bracket [[...]] link in pWikiCode
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.getWikiLinks = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: getWikiLinks(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: getWikiLinks(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.getWikiLinks(pWikiCode);
  //-------------------------------------------------------

    // Wiki Links are open with ""
    var vLinkArray = [];
    //var vSearch = /\[(File|Datei|Image):([^\|]*)/;
    var vSearch = /\[\[([^\[\]]+)\]\]/g;
    // \[\[         # "[["
    //(             # group 1
    //  [^\[\]]+    #   any character except "[" and "]" ":" at least once
    // )            # end group 1 - this will be the image's name
    // \]\]         # "]]"
    var vResult;
    var vCount =0;
		var vLink = "";
		var vLinkSplit;
		var vType = "";
		while (vResult = vSearch.exec(pWikiCode)) {
      vCount++;
			vLinkSplit = vResult[1].split(":");
			if (vLinkSplit.length == 1) {
				// link contains no colon ":"
				vLinkArray.push(vResult[1]);
			} else if (this.aMap.hasOwnProperty(vLinkSplit[0])) {
				//for Wikipedia:Water vLinkSplit[0]= "Wikipedia" -> is a wikilink
				vLinkArray.push(vResult[1]);
				console.log("Wiki-Link ('"+vLinkSplit[0]+"') "+vCount+": '" + vResult[1] + "' found");
			} else if ((vLinkSplit[0]).toLowerCase() == "category") {
				//for Wikipedia:Water vLinkSplit[0]= "Wikipedia" -> is a wikilink
				vLinkArray.push(vResult[1]);
				console.log("Wiki-Category-Link ('"+vLinkSplit[0]+"') "+vCount+": '" + vResult[1] + "' found");
			} else {
				console.log("Wiki-File "+vCount+": '" + vResult[1] + "' found");
				//for File:Water.png vLinkSplit[0]= "File" not an own property of aMap -> not a Link
			};
    };
    return vLinkArray;

};
//----End of Method getWikiLinks Definition


//#################################################################
//# PUBLIC Method: convertMediaLink4WikiOnline()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pContent:String
//#    pMediaArray:Array
//# Comment:
//#    convertMediaLink4WikiOnline(pWikiCode,pMediaArray) converts Media Links to WikiMedia Commons
//#    to a remote link for local files
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertMediaLink4WikiOnline = function (pWikiCode,pMediaArray) {
  //----Debugging------------------------------------------
  console.log("js/wiki2html.js - Call: convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String");
  // alert("js/wiki2html.js - Call: convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertMediaLink4WikiOnline(pContent,pMediaArray);
  //-------------------------------------------------------

    var vReplaceLink;
    var vMediaFile;
    var vPathArray;

		// "File:" "Image:" "Datei:" will be replaced "File:" by clean_source()
		//pWikiCode = pWikiCode.replace(/\[\[(File|Image|Datei):/gi,"[[File:");

		//var vSearch = /\[(File|Datei|Image):([^\|]*)/;
    var vSearch = /(\[\[File:[^\]]+\]\])/g;
		// (              # begin capturing group
    // \[\[           # "[["
    //  File:         #   "File:"
		//  [^\]]+        #   any character except  "]" at least once
		// \]\]           # "]]"
    // )              # end capturing group
    var vResult;
    var vCount =0;
		var vReplaceArray = [];
    while (vResult = vSearch.exec(pWikiCode)) {
      vCount++;
      console.log("Media "+vCount+": '" + vResult[1] + "' replace into IMG-tag");
			vReplaceArray.push(vResult[1]);
    };
		if (vReplaceArray.length == pMediaArray.length) {
			for (var i = 0; i < pMediaArray.length; i++) {
				//vPathArray = (pMediaArray[i]).split("/");
				//vMediaFile = vPathArray[vPathArray.length-1];
				vMediaFile = pMediaArray[i];
				var vFileSplit = vMediaFile.split("|");
				vMediaFile = vFileSplit[0];
				var vWidth = this.aDefaultImageWidth;
				var vCenterImage = false;
				for (var i = 1; i < vFileSplit.length; i++) {
					if ((vFileSplit[i]).match(/^[0-9]+px$/)) {
						//vFileSplit[i] = "350px"
						vWidth = (vFileSplit[i]).replace(/[^0-9]/g,"");
						//vFileSplit[i] = "350"
					} else if (vFileSplit[i] == "center") {
						vCenterImage = true;
					};
				};
				var vCaption = "";
				if (vFileSplit.length >1) {
					//[[File:My File.png|center|400px|My Caption "Title"]]
					vCaption = this.checkCaption(vFileSplit[vFileSplit.length-1]);
					// vCaption ="My Caption \"Title\""
					vCaption =this.replaceString(vCaption,"\"","'");
					// vCaption ="My Caption 'Title'
				};
				// ReplaceLink created as image-tag
				vReplaceLink = "<img src=\""+this.getWikiMediaURL(vMediaFile) + "\" width=\""+vWidth+"\" ";
				if (vCaption != "") {
					vReplaceLink += " alt=\""+vCaption+"\" title=\""+vCaption+"\"";
				};
				if (vCenterImage == true) {
					vReplaceLink += " align=\"middle\" ";
				};
				vReplaceLink += ">";
				// add figcaption if aAddFigCaption as attribute is true
				if (this.aAddFigCaption == true) {
					vCaption = this.checkCaption(vCaption);
					vReplaceLink += "\n<figcaption>"+vCaption+"</figcaption>";
				};
				// wrap image into <figure>-tag
				vReplaceLink = "<figure>\n   "+vReplaceLink+"</figure>";
				//pWikiCode = this.replaceString(pWikiCode,vReplaceArray[i],vReplaceLink);
			};
		} else {
			console.log("ERROR: Replace Link for MediaLinks do not have the same length");
		};
	  return pWikiCode;

};
//----End of Method convertMediaLink4WikiOnline Definition

Wiki2HTML.prototype.getImageProps = function (pMediaLink) {
	var vImgProps = {
		"title": "",
		"file": "",
		"url": "",
		"mediastring": pMediaLink,
		"subdir": "images/",
		"width":this.aDefaultImageWidth,
		"align":"left",
		"thumb":true,
		"frame":false
	};

	var vFileSplit = pMediaLink.split("|");
	vMediaFile = vFileSplit[0];
	var vWidth = this.aDefaultImageWidth;
	var vCenterImage = false;
	for (var i = 1; i < vFileSplit.length; i++) {
		if ((vFileSplit[i]).match(/^[0-9]+px$/)) {
			//vFileSplit[i] = "350px"
			vImgProps["width"] = (vFileSplit[i]).replace(/[^0-9]/g,"");
			//vFileSplit[i] = "350"
		} else if (vFileSplit[i] == "center") {
			vImgProps["align"] = "center";
		} else if (vFileSplit[i] == "left") {
			vImgProps["align"] = "left";
		} else if (vFileSplit[i] == "right") {
			vImgProps["align"] = "right";
		} else if ((vFileSplit[i] == "thumb") && (vFileSplit[i] == "thumbnail") && (vFileSplit[i] == "mini")) {
			vImgProps["thumb"] = true;
		};
	};
	// Determine Caption of Image/Figure
	if (vFileSplit.length >1) {
		//[[File:My File.png|center|400px|My Caption "Title"]]
		vImgProps["title"] = vFileSplit[vFileSplit.length-1];
		// Caption ="My Caption \"Title\""
		vImgProps["title"] = this.replaceString(vImgProps["caption"],"\"","'");
		// Caption ="My Caption 'Title' ""
	};
	// Determine Media URL from WikiMedia Commons with this.aDocJSON["images"] Array
	console.log("IMAGE PROPS: Find '"+pMediaLink+"'");
	//getImageIndexDocJSON()
	return vImgProps;
}

//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: Wiki2HTML
//-------------------------------------------



// Library: js/wikiconvert.js 

//#################################################################
//# Javascript Class: WikiConvert()
//#       SuperClass:
//#   Class Filename: wikiconvert.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               21.1.2018
//# last modifications    2018/01/21 17:17:18
//# Version:              1.1.1
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

  	/*
  	This Library was created with JavascriptClassCreator
  	https://niebert.github.io/JavascriptClassCreator
  	The library is based on  wiki2HTML library of Elia Contini
  	publised under GPL.
  	Parses wiki markup and generates HTML 5 showing a preview.
      Copyright (C) 2010-2013 Elia Contini

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program. If not, see http://www.gnu.org/licenses/.
   */

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/wikiconvert.js"
//---------------------------------------------------------------------
//---Constructor of Class WikiConvert()
// Call the constructor for creating an instance of class WikiConvert
// by the following command in HTML-file that imports this class
// var vMyInstance = new WikiConvert();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of WikiConvert, use
// the attribute name with a leading "this." in the definition of method of WikiConvert, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'WikiConvert'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'WikiConvert' will be set by
// use the method's name and extend it with 'WikiConvert'.
//    WikiConvert.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

	// no superclass defined


function WikiConvert () {
	// no superclass defined

  //---------------------------------------------------------------------
  //---Attributes of Class "WikiConvert()"
  //---------------------------------------------------------------------
	//---PUBLIC: aProjectDir (String): the attribute 'aProjectDir' stores in 'String' the relative path in the PanDoc root directory
	this.aWikiTitle = "Swarm intelligence";
	//---PUBLIC: aProjectDir (String): the attribute 'aProjectDir' stores in 'String' the relative path in the PanDoc root directory
	this.aProjectDir = "demo/my_article";
	//---PUBLIC: aRemoteMedia (Boolean): the attribute 'aRemoteMedia' stores in 'Boolean' variable if the MediaLinks are stored in the local file system of referenced to remote Media Server
	this.aRemoteMedia = false;
	//---PUBLIC: aRemoteMedia (Boolean): the attribute 'aRemoteMedia' stores in 'Boolean' variable if the MediaLinks are stored in the local file system of referenced to remote Media Server
	this.aOutFormat = "html";  // "markdown" "latex" "reveal"
	//---PUBLIC: aLanguage ID (String): defines the Language of the MediaWiki
	this.aLanguage = "en";
	//---PUBLIC: aDomain(String): defines the MediaWiki product of Wiki Foundation "wikiversity", "wikipedia", ..
	this.aDomain = "wikiversity";
	//---PUBLIC: aTOC stored the TOC Table of Contents parsed from the section structure of the Wiki/HMTL file
	this.aTOC = [];
	this.aInsertTOC = true; // will be inserted in sections
	//---PUBLIC: aServer is set with the init(pLanguage,pDomain) together with aLanguage and aDomain
	this.aServer = "https://en.wikiversity.org/wiki/";
	//---PUBLIC: aMediaPath is used for downloading the embedded image resp. the referencing the images in the HTML
	this.aMediaPath = "https://en.wikiversity.org/wiki/Special:Redirect/file/";
	//---PUBLIC: aDocJSON is a Hash that collects the data while parsing the vWikiCode generated by wtf_wikipedia.js set by init()-call
	this.aDocJSON = {};
	// depricated replaced by aDocJSON
	this.aParseJSON = {};
	//---PUBLIC: aDefaultImageWidth is used if width of the image in not defined
	this.aDefaultImageWidth = 300;

	this.aMap = {};
	this.aMap["w"] = "wikipedia";
	this.aMap["wikipedia"] = "wikipedia";
	this.aMap["Wikipedia"] = "wikipedia";
	this.aMap["v"] = "wikiversity";
	this.aMap["wikiversity"] = "wikiversity";
	this.aMap["Wikiversity"] = "wikiversity";
	this.aMap["b"] = "wikibooks";
	this.aMap["wikibooks"] = "wikibooks";
	this.aMap["Wikibooks"] = "wikibooks";

	this.aFilePrefix = {};
	this.aFilePrefix["File"] = "File";
	this.aFilePrefix["file"] = "File";
	this.aFilePrefix["Datei"] = "File";
	this.aFilePrefix["Image"] = "File";

	this.aMediaArray = [];
	this.aCatArray = []; //Array of Categories
	//this.aTplEngine = new TemplateEngine();


  //---------------------------------------------------------------------
  //---Methods of Class "WikiConvert()"
  //---------------------------------------------------------------------
	//----PUBLIC Method: WikiConvert.init(pLanguage,pDomain,pDocJSON)
	// init a converter with the language "en" and a domain "wikiversity" or "wikipedia"
	//----PUBLIC Method: WikiConvert.initArticle(pWikiTitle:String)
	// init the WikiConverter with a specific article Wiki Page Identifier
	//----PUBLIC Method: WikiConvert.convert(pWikiCode:String):String-----
	// convert(pWikiCode)  Return: String
	//	converts the MediaWiki code in argument and returns a corrected string
	//  that correct local image and wiki links into remote links and remotely embedded images
	//----PUBLIC Method: WikiConvert.clean_source(pWikiCode:String):String-----
	// clean_source(pWikiCode)  Return: String
	//	clean_source(pWikiCode) normalizes line breaks in order to have a common base string for all browsers.
	//	clean_source() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
	//	after removing all CRs.
	//----PUBLIC Method: WikiConvert.sections(pWikiCode:String):String-----
	// sections(pWikiCode)  Return: String
	//	Convert all sections in Wiki source code
	//----PUBLIC Method: WikiConvert.horizontalRule(pWikiCode:String):String-----
	// horizontalRule(pWikiCode)  Return: String
	//	Convert the  horizontal rules in Wiki source code
	//----PUBLIC Method: WikiConvert.inlineElement(pWikiCode:String):String-----
	// inlineElement(pWikiCode)  Return: String
	//	Convert for inline elements of the Wiki source code
	//----PUBLIC Method: WikiConvert.replaceImages(pWikiCode:String):String-----
	// replaceImages(pWikiCode)  Return: String
	//	Convert for inline elements of the Wiki source code
	//----PUBLIC Method: WikiConvert.math2jax(pWikiCode:String,pFormat:String):String-----
	// math2jax(pWikiCode,pFormat)  Return: String
	//	Convert the MATH-tag to a MathJax compatible HTML enviroment dependent of the pFormat of the parameter of math2jax.
	//	pFormat = 'reveal' 'html' are possible formats
	//----PUBLIC Method: WikiConvert.convertWiki2Local(pContent:String,:Hash):String-----
	// convertWiki2Local(pContent)  Return: String
	//	convertWiki2Local() replaces the MediaWiki internal links to links that work in a local HTML file. The parsed vMediaWiki Links
	//----PUBLIC Method: WikiConvert.parseWiki4Media(pWikiCode:String):Array-----
	// parseWiki4Media(pWikiCode)  Return: Array
	//	parseWiki4Media() the pWikiCode and extract the Media and File links.
	//----PUBLIC Method: WikiConvert.createMediaParseJSON(vMediaArray:Array)-----
	// createMediaParseJSON(vMediaArray)
	//	createMediaParseJSON(vMediaArray:Array) creates in this.aParseJSON["media"]={} a Hash
	//	that maps the local file path 'image/my_image.png' to the replace path
	//	this.aParseJSON["media"]["image/my_image.png"] = "https://commons.wikimedia.org/wiki/my_image.png"
	//----PUBLIC Method: WikiConvert.checkParseJSON(pHashID:String)-----
	// checkParseJSON(pHashID)
	//	checkParseJSON() checks if the File Link definitions exists in the pWikiHash["media"]
	//----PUBLIC Method: WikiConvert.getMediaSubDir(pMediaLink:String)-----
	// getMediaSubDir(pMediaLink)
	//	getMediaSubDir(pMediaLink) return for a pMediaLink the appropriate subdirectory.
	//----PUBLIC Method: WikiConvert.convertWikiMedia2File(pMediaLink:String):String-----
	// convertWikiMedia2File(pMediaLink)  Return: String
	//	convertWikiMedia2File(pMediaLink) converts the pMediaLink into an URL and returns the media link.
	//	removes blanks at the tail and replaces blanks with and underscore "_"
	//	and non-alpha-numerical characters with an underscore, so that finally the filename works fine on all file systems
	//----PUBLIC Method: WikiConvert.convertWikiMedia2URL(pMediaLink:String):String-----
	// convertWikiMedia2URL(pMediaLink)  Return: String
	//	convertWikiMedia2URL(pMediaLink) removes blanks at the tail and replaces blanks with and underscore "_"
	//----PUBLIC Method: WikiConvert.downloadWikiMedia(pMediaArray:Array)-----
	// downloadWikiMedia(pMediaArray)
	//	downloadWikiMedia(pMediaArray:Array) download the images to level-fs
	//	that can be exported as ZIP-file with archiver NPM module
	//----PUBLIC Method: WikiConvert.downloadMediaFile(pMediaLink:String)-----
	// downloadMediaFile(pMediaLink)
	//	downloadMediaFile(pMediaFile) from WikiMedia Commons to the local filesystem emulated with level-fs
	//----PUBLIC Method: WikiConvert.convertMediaLink4Wiki(pContent:String,pMediaArray:Array):String-----
	// convertMediaLink4Wiki(pContent,pMediaArray)  Return: String
	//	convertMediaLink4Wiki(pContent,pMediaWiki) convert the link
	//	- [[File:MyFile.png....   with
	//	- [File:https://commons.wikimedia.org/.../MyFile.png
	//----PUBLIC Method: WikiConvert.replaceString(pString:String,pSearch:String,pReplace:String):String-----
	// replaceString(pString,pSearch,pReplace)  Return: String
	//	replaceString(pString,pSearch,pReplace) replaces globally pSearch by pReplace and returns the modified string
	//----PUBLIC Method: WikiConvert.convertWiki2Online(pContent:String):String-----
	// convertWiki2Online(pContent)  Return: String
	//	convertWiki2Online(pContent) converts the Links and Media in way so that media and links
	//	are referenced to online resource to the server
	//----PUBLIC Method: WikiConvert.replaceWikiLinks(pWikiCode:String:Hash):String-----
	// replaceWikiLinks(pWikiCode)  Return: String
	//	Comment for replaceWikiLinks
	//----PUBLIC Method: WikiConvert.getWikiLinks(pWikiCode:String):String-----
	// getWikiLinks(pWikiCode)  Return: String
	//	getWikiLinks(pWikiCode) extract Double-Bracket [[...]] link in pWikiCode
	//----PUBLIC Method: WikiConvert.convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String-----
	// convertMediaLink4WikiOnline(pContent,pMediaArray)  Return: String
	//	convertMediaLink4WikiOnline(pWikiCode,pMediaArray) converts Media Links to WikiMedia Commons
	//	to a remote link for local files

	//#################################################################
	//# PUBLIC Method: init()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pLanguage:String
	//#    pWikiID:String
	//# Comment:
	//#    parses the MediaWiki code in argument and returns a HTML string
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################


	this.init = function (pLanguage,pDomain,pDocJSON,pOutFormat) {
		this.aOutFormat = pOutFormat || "html";
		this.aLanguage = pLanguage;
		this.aDomain = pDomain; // e.g. "wikiversity"
		this.aServer = "https://"+this.aLanguage+"."+this.aDomain+".org/wiki/";
		this.aMediaPath = "https://"+this.aLanguage+"."+this.aDomain+".org/wiki/Special:Redirect/file/";
		this.aDocJSON = pDocJSON || {};
		if (this.aDocJSON.hasOwnProperty("lang_or_wikiid")) {
				delete this.aDocJSON["lang_or_wikiid"];
		};
		this.aDocJSON["language"] = pLanguage;
		this.aDocJSON["domain"] = pDomain;
		this.options = {
        'link-image': true //Preserve backward compat
    };
		this.aSectionCount = 0;
	};
	//----End of Method init Definition

	//#################################################################
	//# PUBLIC Method: initArticle()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//#    pWikiTitle:String
	//# Comment:
	//#    parses the MediaWiki code in argument and returns a HTML string
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################


	this.initArticle = function (pWikiTitle) {
		pWikiTitle = pWikiTitle || "Title undefined in convert()";
		var html = '<p>function wiki2html(pWikiCode): an error occurs</p>';
		this.aWikiTitle = pWikiTitle.replace(/_/g," ");
		// set Title in DocJSON
		if ((this.aDocJSON) && (this.aDocJSON.sections) && (this.aDocJSON.sections.length >0)) {
			// set Title in first section of aDocJSON
			this.aDocJSON.sections[0]["title"] = this.replaceString(this.aWikiTitle,"_"," ");
			// set Downloaded URL in aDocJSON
			this.aDocJSON["url"] = this.aServer+this.aWikiTitle;
			// set Download Time in aDocJSON
			var now = new Date();
			this.aDocJSON["date"] = now.toJSON();
		};
	};
	//----End of Method init Definition

	this.content_before_section = function (pMarkdown,pOptions) {
		var vMarkDown = pMarkdown;
		vMarkDown = vMarkDown.replace(/^[ \n\t]+/,"");
		if (vMarkDown.indexOf("=") == 0) {
			console.log("Wiki markdown begins with section");
		} else {
			console.warn("Section inserted for text without section header");
			vMarkDown = "==== &nbsp; ====\n" + vMarkDown;
		}
		return vMarkDown;
	}


		this.remove_categories = function (wikicode,pOptions) {
			console.log("remove_categories() ");
			if (wikicode) {
				//var vSearch = /(<math[^>]*?>)(.*?)(<\/math>)/gi;
				var vSearch = /(\[\[(Kategorie|Category)\:[^\]]+\]\])/gi;
				// \[            # "["
				// (?:            # non-capturing group
				//  File|Image|Datei        #   "File" or "Image" or "Datei"
				// )              # end non-capturing group
				//:             # ":"
				//(              # group 1
				//  [^\|\]]+      #   any character except "|" or "]" at least once
				// )              # end group 1 - this will be the image's name
				var vResult;
				var vCount =0;
				console.log("remove_categories() - wikicode defined");
				while (vResult = vSearch.exec(wikicode)) {
					vCount++;
					console.log("Remove Category "+vCount+": '" + vResult[1] + "' found");
					var vFound = vResult[1];
					this.aCatArray.push(vFound);
					var vReplace = " ";
					wikicode = this.replaceString(wikicode,vFound,vReplace);
				};
			} else {
				console.error("ERROR: remove_categories() - wikicode not defined!");
			}
			return wikicode
		}

	//#################################################################
	//# PUBLIC Method: section2id()
	//#    used in Class: WikiJSON2HTML
	//# Parameter:
	//#    wikicode:String
	//# Comment:
	//#    Convert all replaceSections in Wiki source code
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 9:54:13
	//#################################################################

	this.section2id = function (pHeader) {
	  //----Debugging------------------------------------------
	  // console.log("js/wiki2html.js - Call: section2id(wikicode:String):String");
	  // alert("js/wiki2html.js - Call: section2id(wikicode:String):String");
	  //----Create Object/Instance of WikiJSON2HTML----
	  //    var vMyInstance = new WikiJSON2HTML();
	  //    vMyInstance.section2id(wikicode);
	  //-------------------------------------------------------
		var vHeader = pHeader || ("Header"+Date.now());
		vHeader = vHeader.replace(/[^A-Za-z0-9]/g,"_");

	  return vHeader;

	};
	//----End of Method section2id Definition
	this.removeMathNewlines = function(wikicode) {
		console.log("replaceMathNewLines() "+wikicode);
		if (wikicode) {
			//var vSearch = /(<math[^>]*?>)(.*?)(<\/math>)/gi;
			wikicode = wikicode.replace(/(<math>)(.*?)(<\/math>)/mg,function(str,p1,pmath,p2) {
				console.log("BEFORE pmath="+pmath);
				pmath = pmath.replace(/\n/g," ");
				pmath = p1 + pmath + p2;
				console.log("AFTER pmath="+pmath);
				return pmath
			});
		};
		return wikicode
	};

	this.removeMathNewlines_X = function(wikicode) {
		console.log("replaceMathNewLines() "+wikicode);
		if (wikicode) {
			//var vSearch = /(<math[^>]*?>)(.*?)(<\/math>)/gi;
			var vSearch = /(<math>)(.*?)(<\/math>)/gi;
			// \[            # "["
			// (?:            # non-capturing group
			//  File|Image|Datei        #   "File" or "Image" or "Datei"
			// )              # end non-capturing group
			//:             # ":"
			//(              # group 1
			//  [^\|\]]+      #   any character except "|" or "]" at least once
			// )              # end group 1 - this will be the image's name
			var vResult;
			var vCount =0;
			console.log("CALL: removeMathNewlines() with Parameter 'wikicode' defined");
			while (vResult = vSearch.exec(wikicode)) {
				vCount++;
				console.log("Math Expression "+vCount+": '" + vResult[1] + "' found");
				var vFound = vResult[1];
				var vReplace = vFound.replace(/\n/g," ");
				wikicode = this.replaceString(wikicode,vFound,vReplace);
			};
		}
		return wikicode
};

	//#################################################################
	//# PUBLIC Method: replaceSections()
	//#    used in Class: WikiJSON2HTML
	//# Parameter:
	//#    wikicode:String
	//# Comment:
	//#    Convert all replaceSections in Wiki source code
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 9:54:13
	//#################################################################
	this.replaceSections = function (wikicode) {
			// split wikicode into an array of lines
			console.log("this.replaceSections()-Call based on wiky.js");
			var lines = wikicode.split(/[\s]*?\r?\n/);
			console.log("wikicode has "+lines.length+" lines.");
			var html = "";
			var title = "";
			var level = 0;
			var i=0;
			var start = 0;
			var end = 0;
			while (i<lines.length) {
				console.log("("+(i+1)+"/"+lines.length+") LINE iteration for section");
				line = lines[i] || "";
				if (line) {
				 	console.log("Line "+(i+1)+" Checker");
					//if (line.match(/^[\:]+.*?<math[^>]*>/)) {
					if ((lines[i]).match(/^[\:]+\s*?<math[^>]*>/i)) {
						console.log("Indent MATH BLOCK found");
						(lines[i]).replace(/^[\:]+\s*?/i,"&nbsp;");
						var mathblock = "<br>\n"+line;
						while (i < lines.length && (lines[i].toLowerCase()).indexOf("</math>") < 0) {
							// find end line of </math>
							console.log("Add MATH Block Line: "+lines[i]);
							mathblock += " "+lines[i];
							i++;
						};
						html +=   mathblock + "\n";
					} else if ((lines[i]).match(/^[\:]+.*?<math[^>]*>/i)) {
						console.log("Indent MATH INLINE found");
						var mathinline = line;
						while (i < lines.length && (lines[i].toLowerCase()).indexOf("</math>") < 0) {
							// find end line of </math>
							console.log("Add MATH Block Line: "+lines[i]);
							mathinline += lines[i];
							i++;
						};
						html += mathinline
					} else if (line.indexOf("<math")>=0) {
							console.log("Simple MATH INLINE found"+lines[i]);
						if ((lines[i].toLowerCase()).indexOf("</math>") >= 0) {
							html += line;
						} else {
							while (i < lines.length && (lines[i].toLowerCase()).indexOf("</math>") < 0) {
								// find end line of </math>
								console.log("Add MATH Block Line: "+lines[i]);
								html += lines[i];
								i++;
							};
						};
					}  else if (line.match(/^======/)!=null && line.match(/======$/)!=null) {
						level = 6;
						title = line.substring(level,line.length-level);
						html += this.convert_section(title,level);
					} else if (line.match(/^=====/)!=null && line.match(/=====$/)!=null) {
						level = 5;
						title = line.substring(level,line.length-level);
						html += this.convert_section(title,level);
					} else if (line.match(/^====/)!=null && line.match(/====$/)!=null) {
						level = 4;
						title = line.substring(level,line.length-level);
						html += this.convert_section(title,level);
					} else if (line.match(/^===/)!=null && line.match(/===$/)!=null) {
						level = 3;
						title = line.substring(level,line.length-level);
						html += this.convert_section(title,level);
					} else if (line.match(/^==/)!=null && line.match(/==$/)!=null) {
						level = 2;
						title = line.substring(level,line.length-level);
						html += this.convert_section(title,level);
					} else if (line.match(/^\:+/)!=null) {
						console.log("replaceSections()-Call: Indent Found");
						// find start line and ending line
						start = i;
						while (i < lines.length && lines[i].match(/^\:+/)!=null) i++;
						i--;

						//html += this.processIndent4MathBlock(lines,start,i);
						html += this.process_indent(lines,start,i);
					} else if (line.match(/^----+(\s*)$/)!=null) {
						console.log("horizontal line");
						html += "<hr/>";
					} else if (line.match(/^(\*+) /)!=null) {

						// find start line and ending line
						start = i;
						while (i < lines.length && lines[i].match(/^(\*+|\:\:+|\#\#+)\:? /)!=null)  {
							// find end line of itemize
							i++;
						};
						end = i-1;
						html += this.process_bullet_point(lines,start,end);
					}
					else if (line.match(/^(\#+) /)!=null)
					{

						start = i;
						// find start line and ending line
						while (i < lines.length && lines[i].match(/^(\#+|\:\:+|\*\*+)\:? /)!=null) {
							// find end line of enumeration
							i++;
						};
						end = i-1;
						html += this.process_bullet_point(lines,start,i);
					}
					else
					{
						console.log("CALL: process_normal(line) for line='"+line+"'");
						html += this.process_normal(line);

					}
					html += "\n";

				} else {
					html += "\n";
				}

				//html += "<br/>\n";
				i++;
				console.log("("+(i)+"/"+lines.length+") LINE END iteration end line="+(lines[i] || "undefined"));
				if (i<lines.length) {

				}

			};
			console.log("close_document()-Call End of replaceSections()-Call");
			html += this.close_document();
			// return wikicode;
			return html;

	};
	//----End of Method replaceSections Definition

		this.convert_section = function (match,level) {
			console.log("convert_section()-call: match='"+match+"' at level="+level+".");
			var delimiter = ["","=","==","===","====","=====","======"];
			//var delimiter = ["","_","__","___","____","_____","______"];
			// section command
			var texopen = ["","\\chapter{","\\section{","\\subsection{","\\subsubsection{","\\paragraph{","\\","\\subparagraph{"]
			var texclose = ["","}","}","}","}","}","} \\quad \\\\"]
			var out = "";
			switch (this.aOutFormat) {
				case "html":
					//out += delimiter[level] + match + delimiter[level] + "\n";
					out += "<h"+level+" id=\""+this.section2id(match)+"\">"+match+"</h"+level+">"
				break;
				case "latex":
					//out += delimiter[level] + match + delimiter[level] + "\n";
					out += texopen[level] + match + texclose[level]+ " \\label{"+this.section2id(match)+"}"
				break;
				case "reveal":
					//out += delimiter[level] + match + delimiter[level] + "\n";
					if (this.aSectionCount > 0) {
							out += "</div>";
							out += "</section>\n";
					};
					this.aSectionCount++;
					out += "<section class=\"level"+level+"\" id=\""+this.section2id(match)+"\">\n\t<h"+level+">"+match+"</h"+level+">"
					out += "\n<div class=\"textleft\" style=\"text-align: left;\">\n";
					//if (document.location.href.indexOf("reveal") >= 0) {
				  //	out += '<p class="fragment" data-audio-src="audio/silence.ogg">';
					//}
					break;
				default:
					out += delimiter[level] + match + delimiter[level] + "\n";
			};
			return out
		}

	this.processIndent4MathBlock = function(lines,start,i) {
		var vSearch = /(^[:][\s]*?<math>)(.*?)(<\/math>)/i;
		var vSearchBlock = /(^[:][\s]*?<math>)/i;
		//var vSearchBlockEnd = /(*?<\/math>)/i;
    var vResult;
    var vTagInsert = "";
    var vSearchStr = "";
		var vMarkDown = lines[start];
		var html = "";
		// One Line MathBlock
    if (vResult = vSearch.exec(vMarkDown)) {
       vCount++;
       var vMathBlock = vResult[2];
       vMathBlock = vMathBlock.replace(/\n/g," ");
       vSearchStr = vResult[1]+vMathBlock+vResult[3];
       html = vMarkDown.replace(vSearchStr,'<center><XXXspan id="math'+start+'block" class="math inline"> \\( \\displaysytle ' + vMathBlock +'\\) </XXXspan></center>');
       console.log("INDENT: Math Block Expression line "+start+" found: '"+vMathBlock+"'");
     } else if (vResult = vSearchBlock.exec(vMarkDown)) {
			 vSearchStr = vResult[1];
 			 html = vMarkDown.replace(vSearchStr,'<center><XXXspan id="math'+start+'block" class="math inline"> \\( \\displaysytle ');
 			 console.log("INDENT: Math Block Expression multiline "+start+" found: '"+vMathBlock+"'");
			 while ((i<lines.length) && lines[i] && (lines.indexOf("</math>")<0)) {
				 i++
			 };
			 if (lines[i] && (lines.indexOf("</math>")<0)) {
				 this.replaceString(lines[i],"</math>",'\\) </XXXspan></center>')
			 };
     } else {
			 html = this.process_indent(lines,start,i)
		 };
     return html;
	}

	this.open_indent_block = function() {
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "<dl>";
			break;
			case "latex":
					return "\\begin{addmargin}[1cm]{0cm}\n";
			break;
			case "plain":
					return "\n";
			break;
			default:
				return "<dl>";
		}
	}


	this.check_audio_slide = function (pMarkdown) {
		var vLoc = document.location.href || "nolocation.html";
		var vReturn = "undefined_type";
		if (vLoc.indexOf("dzslides") >= 0) {
			console.log("Slide Type: DZSlides");
			vReturn = "dzslides"
		} else {
			console.log("Slide Type: RevealJS");
			vReturn = "reveal"
		}
	  return vReturn;
	}

	this.close_indent_block = function() {
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "</dl>";
			break;
			case "latex":
					return "\\end{addmargin}\n";
			break;
			case "plain":
					return "\n";
			break;
			default:
				return "</dl>";
		}
	}

	this.open_indent_line = function() {
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "<dd>";
			break;
			case "latex":
					return "\n\n";
			break;
			case "plain":
					return "    ";
			break;
			default:
				return "<dd>";
		}
	}


	this.close_indent_line = function() {
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "</dd>";
			break;
			case "latex":
					return "\n";
			break;
			case "plain":
					return "";
			break;
			default:
				return "</dd>";
		}
	}

	this.close_document = function() {
		switch (this.aOutFormat) {
			case "reveal":
				return "</section>";
			break;
			case "html":
					return "\n";
			break;
			case "latex":
					return "\n";
			break;
			case "plain":
					return "";
			break;
			default:
				return "\n";
		}
	}

	this.process_indent = function(lines,start,end) {
	console.log("process_indent() - start='"+start+"' end='"+end+"'");
	var i = start;

	var html = this.open_indent_block();

	for(var i=start;i<=end;i++) {

		html += this.open_indent_line();

		var this_count = lines[i].match(/^(\:+)/)[1].length;

		html += this.process_normal(lines[i].substring(this_count));

		var nested_end = i;
		for (var j=i+1;j<=end;j++) {
			var nested_count = lines[j].match(/^(\:+)/)[1].length;
			if (nested_count <= this_count) break;
			else nested_end = j;
		}

		if (nested_end > i) {
			html += this.process_indent(lines,i+1,nested_end);
			i = nested_end;
		}

		html += this.close_indent_line();
	}

	html += this.close_indent_block();
	return html;
}


this.open_bullet_point = function (pChar) {
	console.log("open_bullet_point('"+pChar+"')");
	if (pChar == "#") {
		// enumeration 1. 2.,....
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "<div><ol>";
			break;
			case "latex":
					return "\\begin{enumeration}";
			break;
			case "plain":
					return "\n";
			break;
			default:
				return "<div><ol>";
		}
	} else {
		// itemize pChar == "*"
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "<div><ul>";
			break;
			case "latex":
					return "\\begin{itemize}";
			break;
			case "plain":
					return "\n";
			break;
			default:
				return "<div><ul>";
		}
	}
}

this.close_bullet_point = function (pChar) {
	console.log("close_bullet_point('"+pChar+"')");
	if (pChar == "#") {
		// enumeration
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "</ol></div>";
			break;
			case "latex":
					return "\\end{enumeration}";
			break;
			case "plain":
					return "\n";
			break;
			default:
				return "</ol></div>";
		}
	} else {
		// itemize pChar == "*"
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "</ul></div>";
			break;
			case "latex":
					return "\\end{itemize}";
			break;
			case "plain":
					return "\n";
			break;
			default:
				return "</ul></div>";
		}
	}
}

this.open_bullet_item = function (pChar,pNr) {
	console.log("open_bullet_item()-Call "+pNr+".");
	if (pChar == "#") {
		// enumeration
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "<li>";
			break;
			case "latex":
					return "\\item";
			break;
			case "plain":
					return "  "+pNr+". ";
			break;
			default:
				return "<li>";
		}
	} else {
		// itemize pChar == "*"
		console.log("open_bullet_item()-Call itemize *");
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "<li>";
			break;
			case "latex":
					return "\\item";
			break;
			case "plain":
					return "  * ";
			break;
			default:
				return "<li>";
		}
	};
}


this.close_bullet_item = function (pChar) {
	if (pChar == "#") {
		// itemize
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "</li>";
			break;
			case "latex":
					return "";
			break;
			case "plain":
					return "";
			break;
			default:
				return "</li>";
		}
	} else {
		// enumeration pChar == "*"
		switch (this.aOutFormat) {
			case "reveal":
			case "html":
					return "</li>";
			break;
			case "latex":
					return "";
			break;
			case "plain":
					return "";
			break;
			default:
				return "<li>";
		}
	}
}

this.insert_newline = function (pOptions) {
	switch (this.aOutFormat) {
		case "reveal":
		case "html":
				return "<br/>";
		break;
		case "latex":
				return "\n\n";
		break;
		case "plain":
				return "\n";
		break;
		default:
			return "<br/>";
	}
}

this.process_bullet_point = function(lines,start,end) {
	console.log("this.process_bullet_point() start='"+start+"' end='"+end+"'");
	var i = start;
	var list_char = lines[start].charAt(0); // e.g. "*" or "#"
	var html = this.open_bullet_point(list_char);
	console.log("Opened Bullet Point List");

  html += '\n';

	for(var i=start;i<=end;i++) {
		console.log("Bullet List "+(i-start+1));
		html += this.open_bullet_item(list_char,i-start+1);
		console.log("process_bullet_point() Line "+i+" "+lines[i]);
		var this_count = lines[i].match(/^(\*+|\#+) /)[1].length;
		console.log("count matches");
		html += this.process_normal(lines[i].substring(this_count+1));
		console.log("END process_normal()-Call "+(i-start+1));

		// continue previous with #:
		{
			var nested_end = i;
			for (var j = i + 1; j <= end; j++) {
				var nested_count = lines[j].match(/^(\*+|\#+)\:? /)[1].length;

				if (nested_count < this_count)
					break;
				else {
					if (lines[j].charAt(nested_count) == ':') {
						html += this.insert_newline() + this.process_normal(lines[j].substring(nested_count + 2));
						nested_end = j;
					} else {
						break;
					}
				}

			}

			i = nested_end;
		}

		// nested bullet point
		{
			var nested_end = i;
			for (var j = i + 1; j <= end; j++) {
				var nested_count = lines[j].match(/^(\*+|\#+)\:? /)[1].length;
				if (nested_count <= this_count)
					break;
				else
					nested_end = j;
			}

			if (nested_end > i) {
				html += this.process_bullet_point(lines, i + 1, nested_end);
				i = nested_end;
			}
		}

		// continue previous with #:
		{
			var nested_end = i;
			for (var j = i + 1; j <= end; j++) {
				var nested_count = lines[j].match(/^(\*+|\#+)\:? /)[1].length;

				if (nested_count < this_count)
					break;
				else {
					if (lines[j].charAt(nested_count) == ':') {
						html += this.process_normal(lines[j].substring(nested_count + 2));
						nested_end = j;
					} else {
						break;
					}
				}

			}

			i = nested_end;
		}

		html += this.close_bullet_item(list_char) + "\n";
	}

	html += this.close_bullet_point(lines[start].charAt(0));
  html += '\n';
	return html;
}

this.process_url = function(txt) {

	var index = txt.indexOf(" "),
        url = txt,
        label = txt,
        css = ' style="background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFZJREFUeF59z4EJADEIQ1F36k7u5E7ZKXeUQPACJ3wK7UNokVxVk9kHnQH7bY9hbDyDhNXgjpRLqFlo4M2GgfyJHhjq8V4agfrgPQX3JtJQGbofmCHgA/nAKks+JAjFAAAAAElFTkSuQmCC\") no-repeat scroll right center transparent;padding-right: 13px;"';

	if (index !== -1) {
		url = txt.substring(0, index);
		label = txt.substring(index + 1);
	}
	return '<a href="' + url + '"' + (this.options['link-image'] ? css : '') + '>' + label + '</a>';
};

this.process_image = function(txt) {
	var index = txt.indexOf(" ");
	url = txt;
	label = "";

	if (index > -1)
	{
		url = txt.substring(0,index);
		label = txt.substring(index+1);
	}


	return "<img src='"+url+"' alt=\""+label+"\" />";
}

this.process_video = function(url) {

	if (url.match(/^(https?:\/\/)?(www.)?youtube.com\//) == null)
	{
		return "<b>"+url+" is an invalid YouTube URL</b>";
	}

	if ((result = url.match(/^(https?:\/\/)?(www.)?youtube.com\/watch\?(.*)v=([^&]+)/)) != null)
	{
		url = "http://www.youtube.com/embed/"+result[4];
	}


	return '<iframe width="480" height="390" src="'+url+'" frameborder="0" allowfullscreen></iframe>';
}

this.process_normal = function(wikitext) {
	console.log("process_normal()-Call - wikitext='"+wikitext+"'");
	var out = "";
	// Image
	if (wikitext) {
		{
			var index = wikitext.indexOf("[[File:");
			var end_index = wikitext.indexOf("]]", index + 7);
			while (index > -1 && end_index > -1) {

				wikitext = wikitext.substring(0,index)
							+ this.process_image(wikitext.substring(index+7,end_index))
							+ wikitext.substring(end_index+2);

				index = wikitext.indexOf("[[File:");
				end_index = wikitext.indexOf("]]", index + 7);
			}
		}

		// Video
		{
			var index = wikitext.indexOf("[[Video:");
			var end_index = wikitext.indexOf("]]", index + 8);
			while (index > -1 && end_index > -1) {

				wikitext = wikitext.substring(0,index)
							+ this.process_video(wikitext.substring(index+8,end_index))
							+ wikitext.substring(end_index+2);

				index = wikitext.indexOf("[[Video:");
				end_index = wikitext.indexOf("]]", index + 8);
			}
		}


		// URL
		var protocols = ["http","ftp","news"];

		for (var i=0;i<protocols.length;i++)
		{
			var index = wikitext.indexOf("["+protocols[i]+"://");
			var end_index = wikitext.indexOf("]", index + 1);
			while (index > -1 && end_index > -1) {

				wikitext = wikitext.substring(0,index)
							+ this.process_url(wikitext.substring(index+1,end_index))
							+ wikitext.substring(end_index+1);

				index = wikitext.indexOf("["+protocols[i]+"://",end_index+1);
				end_index = wikitext.indexOf("]", index + 1);

			}
		}

		var count_b = 0;
		var index = wikitext.indexOf("'''");
		while(index > -1) {

			if ((count_b%2)==0) wikitext = wikitext.replace(/'''/,"<b>");
			else wikitext = wikitext.replace(/'''/,"</b>");

			count_b++;

			index = wikitext.indexOf("'''",index);
		}

		var count_i = 0;
		var index = wikitext.indexOf("''");
		while(index > -1) {

			if ((count_i%2)==0) wikitext = wikitext.replace(/''/,"<i>");
			else wikitext = wikitext.replace(/''/,"</i>");

			count_i++;

			index = wikitext.indexOf("''",index);
		}

		wikitext = wikitext.replace(/<\/b><\/i>/g,"</i></b>");
		out = wikitext;
	} else {
		console.log("wikitext empty - nothing to do");
	}

	return out;
}



	//#################################################################
	//# PUBLIC Method: convert()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//#    pWikiTitle:String
	//# Comment:
	//#    converts the MediaWiki code in argument and returns a HTML string
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.convert = function (pWikiCode,pWikiTitle) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: convert(pWikiCode:String):String");
	  // alert("js/wikiconvert.js - Call: convert(pWikiCode:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.convert(pWikiCode);
	  //-------------------------------------------------------

	  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
				// CALL: initArticle(pWikiTitle)
				// inits the this.aDocJSON with the WikiTitle and sets the first slide title
				this.initArticle(pWikiTitle);
				if (this.aRemoteMedia == true) {
					console.log("aRemoteMedia: TRUE");
					// remote Media links
					//pWikiCode = this.convertWiki2Online(pWikiCode);
				} else {
					console.log("aRemoteMedia: FALSE - try to download and zip media");
					// local media links - requires download of Media files for display
					//pWikiCode = this.convertWiki2Local(pWikiCode);
					// ZIP/archive downloaded files TODO
				};
				// saveJSON("wikidata.json",vParseJSON); // TODO
				pWikiCode = this.math2jax(pWikiCode);
				pWikiCode = this.math2reveal(pWikiCode);
				pWikiCode = this.replaceWikiLinks(pWikiCode);
				pWikiCode = this.replaceEnumeration(pWikiCode);
				//pWikiCode = this.convertWiki2Local(pWikiCode);
				pWikiCode = this.replaceImages(pWikiCode);
				return pWikiCode || "";

	};
	//----End of Method convert Definition

	//#################################################################
	//# PUBLIC Method: clean_unsupported_wiki()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//# Comment:
	//#    clean_unsupported_wiki(pWikiCode) removes double bracket {{...}} Wiki commands.
	//#    clean_unsupported_wiki() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
	//#    after removing all {{...}} commands still left in Wiki Code.
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.clean_unsupported_wiki = function (pWikiCode) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: clean_unsupported_wiki(pWikiCode:String):String");
	  // alert("js/wikiconvert.js - Call: clean_unsupported_wiki(pWikiCode:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.clean_unsupported_wiki(pWikiCode);
	  //-------------------------------------------------------
	  if (pWikiCode) {
      	// (1) References without a citaion label
      	pWikiCode = pWikiCode.replace(/ ?<ref>([\s\S]{0,1000}?)<\/ref> ?/gi," ");
      	// (2) Cite a reference by a label WITHOUT reference
      	// replace <ref name="my book label"/> by "___CITE_7238234792_my_book_label___"
      	pWikiCode = pWikiCode.replace(/ ?<ref[\s]+name=["']([^"'])["'][^>]{0,200}?\/> ?/gi," ");
      	// (3) Reference with citation label that is used multiple time in a document by (2)
      	pWikiCode = pWikiCode.replace(/ ?<ref [\s]+name=["']([^"'])["'][^>]{0,200}?>([\s\S]{0,1000}?)<\/ref> ?/gi," ");
      	pWikiCode = pWikiCode.replace(/\{\{[^}]\}\}/g, '');
	  } else {
      	pwiki = " ";
      }
	  return pWikiCode;

	};
	//----End of Method clean_unsupported_wiki Definition


	//#################################################################
	//# PUBLIC Method: clean_source()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//# Comment:
	//#    clean_source(pWikiCode) normalizes line breaks in order to have a common base string for all browsers.
	//#    clean_source() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
	//#    after removing all CRs.
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.clean_source = function (pWikiCode) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: clean_source(pWikiCode:String):String");
	  // alert("js/wikiconvert.js - Call: clean_source(pWikiCode:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.clean_source(pWikiCode);
	  //-------------------------------------------------------
		pWikiCode = this.replaceString(pWikiCode,"[[Image:"," [[File:");
		pWikiCode = this.replaceString(pWikiCode,"[[Datei:"," [[File:");
		pWikiCode = this.replaceString(pWikiCode,"[[Kategorie:"," [[Category:");
		pWikiCode = this.replaceString(pWikiCode,"|thumbnail|","|thumb|");
		pWikiCode = this.replaceString(pWikiCode,"|thumbnail]]","|thumb| ]] ");
		pWikiCode = this.replaceString(pWikiCode,"|mini|","|thumb|");
		pWikiCode = this.replaceString(pWikiCode,"|mini]]","|thumb| ]] ");
		//pWikiCode = pWikiCode.replace(/[|](thumbnail|mini)(\]|\|)/g,"|thumb$2");
	  pWikiCode = pWikiCode.replace(/\r/g, '');
	  return pWikiCode;

	};
	//----End of Method clean_source Definition


			//#################################################################
			//# PUBLIC Method: replaceEnumeration()
			//#    used in Class: WikiConvert
			//# Parameter:
			//#    pWikiCode:String
			//# Comment:
			//#    replaceEnumeration(pWikiCode) replaces enumerations by ___LI___.
			//#    post_process() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
			//#    after removing all CRs.
			//# Return: String
			//# created with JSCC  2017/03/05 18:13:28
			//# last modifications 2018/01/21 17:17:18
			//#################################################################
			var wikiconfig = {
					options: {
							'link-image': true //Preserve backward compat
					}
			}

			this.replaceEnumeration = function(pWikiCode) {
				return this.processWiki(pWikiCode,wikiconfig)
			}



			this.processWiki = function(wikitext) {
				var lines = wikitext.split(/\r?\n/);

				var html = "";

				for (i=0;i<lines.length;i++)
				{
					line = lines[i];
					if (line.match(/^===/)!=null && line.match(/===$/)!=null)
					{
						html += "<h2>"+line.substring(3,line.length-3)+"</h2>";
					}
					else if (line.match(/^==/)!=null && line.match(/==$/)!=null)
					{
						html += "<h3>"+line.substring(2,line.length-2)+"</h3>";
					}
					else if (line.match(/^:+/)!=null)
					{
						// find start line and ending line
						start = i;
						while (i < lines.length && lines[i].match(/^\:+/)!=null) i++;
						i--;

						html += this.process_indent(lines,start,i);
					}
					else if (line.match(/^----+(\s*)$/)!=null)
					{
						html += "<hr/>";
					}
					else if (line.match(/^(\*+) /)!=null)
					{
						// find start line and ending line
						start = i;
						while (i < lines.length && lines[i].match(/^(\*+|\#\#+)\:? /)!=null) i++;
						i--;

						html += this.process_bullet_point(lines,start,i);
					}
					else if (line.match(/^(\#+) /)!=null)
					{
						// find start line and ending line
						start = i;
						while (i < lines.length && lines[i].match(/^(\#+|\*\*+)\:? /)!=null) i++;
						i--;

						html += this.process_bullet_point(lines,start,i);
					}
					else
					{
						html += this.process_normal(line);
					}

					//html += "<xxbr/>\n";
				}

				return html;
			}

			this.process_indent = function(lines,start,end) {
				var i = start;

				var html = "</p><dl>";

				for(var i=start;i<=end;i++) {

					html += "<dd>";

					var this_count = lines[i].match(/^(\:+)/)[1].length;

					html += this.process_normal(lines[i].substring(this_count));

					var nested_end = i;
					for (var j=i+1;j<=end;j++) {
						var nested_count = lines[j].match(/^(\:+)/)[1].length;
						if (nested_count <= this_count) break;
						else nested_end = j;
					}

					if (nested_end > i) {
						html += this.process_indent(lines,i+1,nested_end);
						i = nested_end;
					}

					html += "</dd>";
				}

				html += "</dl><p class=\"textleft\" style=\"text-align: left;\">";
				return html;
			}

			this.process_normal = function(wikitext) {


				var count_b = 0;
				var index = wikitext.indexOf("'''");
				while(index > -1) {

					if ((count_b%2)==0) wikitext = wikitext.replace(/'''/,"<b>");
					else wikitext = wikitext.replace(/'''/,"</b>");

					count_b++;

					index = wikitext.indexOf("'''",index);
				}

				var count_i = 0;
				var index = wikitext.indexOf("''");
				while(index > -1) {

					if ((count_i%2)==0) wikitext = wikitext.replace(/''/,"<i>");
					else wikitext = wikitext.replace(/''/,"</i>");

					count_i++;

					index = wikitext.indexOf("''",index);
				}

				wikitext = wikitext.replace(/<\/b><\/i>/g,"</i></b>");

				return wikitext;
			}

			this.process_bullet_point = function(lines,start,end) {
					var i = start;

				var html = (lines[start].charAt(0)=='*')?"<ul>":"<ol>";

			    html += '\n';

				for(var i=start;i<=end;i++) {

					html += "<li>";

					var this_count = lines[i].match(/^(\*+|\#+) /)[1].length;

					html += this.process_normal(lines[i].substring(this_count+1));

					// continue previous with #:
					{
						var nested_end = i;
						for (var j = i + 1; j <= end; j++) {
							var nested_count = lines[j].match(/^(\*+|\#+)\:? /)[1].length;

							if (nested_count < this_count)
								break;
							else {
								if (lines[j].charAt(nested_count) == ':') {
									html += "<br/>" + this.process_normal(lines[j].substring(nested_count + 2));
									nested_end = j;
								} else {
									break;
								}
							}

						}

						i = nested_end;
					}

					// nested bullet point
					{
						var nested_end = i;
						for (var j = i + 1; j <= end; j++) {
							var nested_count = lines[j].match(/^(\*+|\#+)\:? /)[1].length;
							if (nested_count <= this_count)
								break;
							else
								nested_end = j;
						}

						if (nested_end > i) {
							html += this.process_bullet_point(lines, i + 1, nested_end);
							i = nested_end;
						}
					}

					// continue previous with #:
					{
						var nested_end = i;
						for (var j = i + 1; j <= end; j++) {
							var nested_count = lines[j].match(/^(\*+|\#+)\:? /)[1].length;

							if (nested_count < this_count)
								break;
							else {
								if (lines[j].charAt(nested_count) == ':') {
									html += this.process_normal(lines[j].substring(nested_count + 2));
									nested_end = j;
								} else {
									break;
								}
							}

						}

						i = nested_end;
					}

					html += "</li>\n";
				}

				html += (lines[start].charAt(0)=='*')?"</ul>":"</ol>";
			    html += '\n';
				return html;
			}

			this.replaceEnumTokens = function (pWikiCode) {
			  //----Debugging------------------------------------------
			  // console.log("js/wikiconvert.js - Call: replaceEnumeration(pWikiCode:String):String");
			  // alert("js/wikiconvert.js - Call: replaceEnumeration(pWikiCode:String):String");
			  //----Create Object/Instance of WikiConvert----
			  //    var vMyInstance = new WikiConvert();
			  //    vMyInstance.replaceEnumeration(pWikiCode);
			  //-------------------------------------------------------
				pWikiCode = this.replaceString(pWikiCode,"\n* ","\n___UL1___ ");
				pWikiCode = this.replaceString(pWikiCode,"\n# ","\n___OL1___ ");
				pWikiCode = this.replaceString(pWikiCode,"\n** ","\n___UL2___ ");
				pWikiCode = this.replaceString(pWikiCode,"\n## ","\n___OL2___ ");
				pWikiCode = this.replaceString(pWikiCode,"\n:* ","\n___IND1_UL1___ ");
				pWikiCode = this.replaceString(pWikiCode,"\n:# ","\n___IND1_OL1___ ");
				pWikiCode = this.replaceString(pWikiCode,"\n*** ","\n___UL3___ ");
				pWikiCode = this.replaceString(pWikiCode,"\n### ","\n___OL3___ ");
				pWikiCode = this.replaceString(pWikiCode,"\n::* ","\n___IND2_UL1___ ");
				pWikiCode = this.replaceString(pWikiCode,"\n::# ","\n___IND2_OL1___ ");
				pWikiCode = this.replaceString(pWikiCode,"\n:** ","\n___IND1_UL2___ ");
				pWikiCode = this.replaceString(pWikiCode,"\n:*# ","\n___IND1_OL2___ ");
				//pWikiCode = pWikiCode.replace(/[|](thumbnail|mini)(\]|\|)/g,"|thumb$2");
			  pWikiCode = pWikiCode.replace(/\r/g, '');
			  return pWikiCode;

			};
			//----End of Method replaceEnumeration Definition

		//#################################################################
		//# PUBLIC Method: post_process()
		//#    used in Class: WikiConvert
		//# Parameter:
		//#    pWikiCode:String
		//# Comment:
		//#    post_process(pWikiCode) normalizes line breaks in order to have a common base string for all browsers.
		//#    post_process() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
		//#    after removing all CRs.
		//# Return: String
		//# created with JSCC  2017/03/05 18:13:28
		//# last modifications 2018/01/21 17:17:18
		//#################################################################

		this.post_process = function (pWikiCode) {
		  //----Debugging------------------------------------------
		  // console.log("js/wikiconvert.js - Call: post_process(pWikiCode:String):String");
		  // alert("js/wikiconvert.js - Call: post_process(pWikiCode:String):String");
		  //----Create Object/Instance of WikiConvert----
		  //    var vMyInstance = new WikiConvert();
		  //    vMyInstance.post_process(pWikiCode);
		  //-------------------------------------------------------
			pWikiCode = this.replaceString(pWikiCode,"___IMG_OPEN___","[[");
			pWikiCode = this.replaceString(pWikiCode,"___IMG_CLOSE___","]]");
			//pWikiCode = pWikiCode.replace(/[|](thumbnail|mini)(\]|\|)/g,"|thumb$2");
		  pWikiCode = pWikiCode.replace(/\r/g, '');
		  return pWikiCode;

		};
		//----End of Method post_process Definition

		//#################################################################
		//# PUBLIC Method: removeCategories()
		//#    used in Class: WikiConvert
		//# Parameter:
		//#    pWikiCode:String
		//# Comment:
		//#    removeCategories(pWikiCode) normalizes line breaks in order to have a common base string for all browsers.
		//#    removeCategories() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
		//#    after removing all CRs.
		//# Return: String
		//# created with JSCC  2017/03/05 18:13:28
		//# last modifications 2018/01/21 17:17:18
		//#################################################################

		this.removeCategories = function (pWikiCode) {
			//----Debugging------------------------------------------
			// console.log("js/wikiconvert.js - Call: removeCategories(pWikiCode:String):String");
			// alert("js/wikiconvert.js - Call: removeCategories(pWikiCode:String):String");
			//----Create Object/Instance of WikiConvert----
			//    var vMyInstance = new WikiConvert();
			//    vMyInstance.removeCategories(pWikiCode);
			//-------------------------------------------------------
			//var vCatRegEx = /\[\[Category:(.[^\]]*)\]\]/g;
			//while(tokens = vCatRegEx.exec(pWikiCode)) {
			//}
			pWikiCode = pWikiCode.replace(/\[\[Category:(.[^\]]*)\]\]/g, '');
			pWikiCode = pWikiCode.replace(/\[\[Kategorie:(.[^\]]*)\]\]/g, '');

			return pWikiCode;

		};
		//----End of Method removeCategories Definition
/*
	this.get_wiki_image_size = function (pLinkSplit,pDefault) {
		var vSize = pDefault || "width: 50%;";
		var vSizeRE = /[0-9]+px/;
		if (pLinkSplit) {
			for (var i = 1; i < (pLinkSplit.length); i++) {
				// vMediaParam += "|"+vLinkSplit[i];
				if (vSizeRE.test(pLinkSplit[i])) {
					vSize = "width: "+pLinkSplit[i]+";";
				};
			};

		} else {
			console.error("CALL: get_wiki_image_size() - pLinkSplit undefined");
		}
		console.log("URL:"+pLinkSplit[0]+" Size="+vSize);
		return vSize;
	}
*/

	this.check_firefox = function () {
		var vBool = false;
		var browser = navigator.userAgent.toLowerCase();
		if (browser.indexOf('firefox') > -1) {
    	console.log('Browser is Firefox');
			vBool = true;
		};
		return vBool;
	}

	this.check_chrome = function () {
		// Chrome 1 - 71
    return !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
	}

	//#################################################################
	//# PUBLIC Method: replaceImages()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//# Comment:
	//#    Convert for inline elements of the Wiki source code
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.replaceImages = function (pWikiCode) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: replaceImages(pWikiCode:String):String");
	  // alert("js/wikiconvert.js - Call: replaceImages(pWikiCode:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.replaceImages(pWikiCode);
	  //-------------------------------------------------------

		//var image = /\[\[File:(.[^\]|]*)([|]thumb|frame|mini)?([|]alt=.[^\]|]*)?([|].[^\]|]*)?\]\]/g;
		var image = /\[\[File:(.[^\]]*)\]\]/g;
		var vSizeRE = /[0-9]+px/;
		var vTitle = "";
		var vAltText = "";
		var vClass = "image";
		var vURL = "";
		var vCaption = "";
		var tokens;
		var replace_str="";
		var vAudioCount = 0;
		var vAudioID = "";
		var vAudioType = "ogg";
		var vAudioTag = " "
		var vAudioPlayPause = "";
		var isFirefox = this.check_firefox();
	  // vImgCenter centers the image directly with a style attribute
		var vImgCenter='display: block; margin-left: auto;margin-right: auto;border-width: 0px;';
		while(tokens = image.exec(pWikiCode)) {
			vTitle = "";
			vAltText = "";
			//[[File:my Image.png|thumb|alt=Alternative Text|<a href="test.html">Test Comment</a> Image Comment]]
			//tokens[0]=my Image.png|thumb|alt=Alternative Text|<a href="test.html">Test Comment</a> Image Comment
			var vLinkSplit = (tokens[0]).split("|");
			vURL = this.getWikiMediaURL(vLinkSplit[0]);
			var vFileType = this.getMediaFileType(vURL);
			//----------- MEDIATYPE: AUDIO -----------------
			if (vFileType == "audio") {
				//-------------------------
				//-----AUDIO---------------
				//-------------------------
				if (vURL.indexOf(".mp3") > 0) {
					vAudioType = "mpeg";
				} else if (vURL.indexOf(".ogg") > 0) {
					vAudioType = "ogg";
				} else {
					console.warn("Audio Type of '" + vURL + "' undefined  user 'audio/ogg' with Audio Tag: "+vAudioTag);
					vAudioType = "ogg";
				};
				//console.log("Audio Found: "+vURL+" with Type: "+vFileType);
				vAudioCount++;
				vAudioID = "audioslide"+vAudioCount;
				vAudioID += vAudioType;
				vAudioPlayPause  = '<table class="audioplayer"><tr><td> ';
				//vAudioPlayPause += '<a href="#" onclick="document.getElementById(\\"' + vAudioID + '\\").play();return false">&#9658;</a>';
				//vAudioPlayPause += '<a href="#" onclick="play_audio(\\"' + vAudioID + '\\");return false">&#9658;</a>';
				//vAudioPlayPause += '<input type="button" onclick="play_audio(\\"' + vAudioID + '\\")" value="&#9658">';
				//vAudioPlayPause += '<input type="button" onclick="play_audio(\'' + vAudioID + '\');console.log(\'Play ' + vAudioID + '\')" value="&#9658">';
				vAudioPlayPause += '<input class="buttonaudioplayer" type="button" onclick="play_audio(\'' + vAudioID + '\');" value="&#9658">';
				vAudioPlayPause += '</td><td>';
				//vAudioPlayPause += '<a href="#" onclick="document.getElementById(\\"' + vAudioID + '\\").pause();return false">&#10074;&#10074;</a> &nbsp; ';
				//vAudioPlayPause += '<a href="#" onclick="pause_audio(\\"' + vAudioID + '\\");return false">&#10074;&#10074;</a> &nbsp; ';
				vAudioPlayPause += '<input class="buttonaudioplayer" type="button" onclick="pause_audio(\'' + vAudioID + '\');" value="&#10074;&#10074;">';
				vAudioPlayPause += '</td></tr></table> ';
				if (isFirefox == true) {
					// Firefox Browser
					vAudioTag =  ' <audio id="' + vAudioID + '"><source src="' + vURL + '" type="audio/' + vAudioType+ '"></audio> &nbsp;';
					if (this.check_audio_slide(pWikiCode) == "dzslides") {
						// DZSlides with Audio
						//replace_str = vAudioTag;
						vAudioTag += "<center>" + vAudioTag + "</center>";
					} else {
						// RevealJS with Audio
						//vAudioTag = '<p class="fragment" data-audio-src="' + vURL + '"></p>';
						vAudioTag = ' <audio id="' + vAudioID + '"><source src="' + vURL + '" type="audio/' + vAudioType+ '"></audio> &nbsp;';
					}
				} else {
					// Chrome or Safari
					vAudioTag = '<audio id="' + vAudioID + '" controls ><source src="' + vURL + '" type="audio/' + vAudioType+ '"></audio> ';
					if (this.check_chrome() == true) {
						// Audio OK
						//alert("Browser is Chrome");
						vAudioTag = "<center>" + vAudioTag + "</center>";
					} else {
						//alert("Browser is Safari, ");
						//vAudioTag = "<center><a href='#' onclick=\"alert('Use Firefox or Chrome to listen to Audio Comments.'); return false;\">&#9658</a></center>";
						vAudioTag = "<center>" + vAudioTag + "</center>";
					}
					vAudioPlayPause = " ";
				}
				replace_str = " ";
				//vAudioSlide = "controls";
				//vAudioTag += ' <a href="'+ vURL + '" target="_blank" style="text-decoration:none">&#9658;</a>';
				console.log("AUDIOSLIDES: " + vAudioSlide);
				if (vAudioSlide == "yes") {
					console.log("AUDIOSLIDES: Buttons" );
					replace_str = vAudioTag + vAudioPlayPause;
				} else if (vAudioSlide == "controls") {
					console.log("AUDIOSLIDES: Use Controls" );
					vAudioTag = ' <audio id="' + vAudioID + '" controls><source src="' + vURL + '" type="audio/' + vAudioType+ '"></audio> ';
				} else {
					console.log("AUDIOSLIDES: no audio" );
					// vAudioSlide = "no"
					// replace_str = ' <a href="'+ vURL + '" target="_blank" style="text-decoration:none">&#9658;</a>';
					replace_str = " ";
					//vAudioTag = '<audio id="' + vAudioID + '" autoplay ><source src="' + vURL + '" type="audio/' + vAudioType+ '"></audio> &nbsp;';
					//replace_str = '<audio id="' + vAudioID + '"><source src="' + vURL + '" type="audio/' + vAudioType+ '"></audio> &nbsp;';

				};
				console.log("Audio Found: "+vURL+" with Type: "+vFileType + " AudioSlides='" + vAudioSlide + "' with Audio Tag: "+vAudioTag);
				pWikiCode = pWikiCode.replace(tokens[0], replace_str);
			} else if (vFileType == "video") {
				//----------------------------------------------
				//----------- MEDIATYPE: VIDEO -----------------
				//----------------------------------------------
				var vVideoTag = '<div class="videodiv">';
				vVideoTag += '<video width="80%" controls>';
				vVideoTag += '<source  src="'+vURL+'">';
				vVideoTag += '</video>'
				vVideoTag += '</div>';
				console.log("Video Found: "+vURL+" with Type: "+vFileType);
				//replace_str = '<div class="videodiv"><video width="80%" preload="auto" data-audio-controls  src="'+vURL+'"></video></div>'
				if (this.check_audio_slide(pWikiCode) == "dzslides") {
					replace_str = vVideoTag;
				} else {
					// replace_str = '<div class="videodiv"><video width="80%" preload="auto" data-audio-controls  src="'+vURL+'"></video></div>'
						replace_str = vVideoTag;
				}
				//replace_str = '<video src="'+vURL+'"></video>'
				pWikiCode = pWikiCode.replace(tokens[0], replace_str);
			//} else if ((vFileType == "svg") || (vFileType == "img")) {
			} else if ((vFileType == "img") || (vFileType == "svg")) {
				//----------------------------------------------
				//----------- MEDIATYPE: IMAGE-----------------
				//----------------------------------------------
				console.log("Image Found: "+vURL+" with Type: "+vFileType);
				//var vSize = this.get_wiki_image_size(vLinkSplit);
				var vSize = "width: 50%";
				var vWidth = this.aDefaultImageWidth;

				for (var i = 1; i < (vLinkSplit.length-1); i++) {
							// vMediaParam += "|"+vLinkSplit[i];
							/*
							if (vSizeRE.test(vLinkSplit[i])) {
								// vSize = " width='"+vLinkSplit[i]+"'";
								vSize = " width: "+vLinkSplit[i]+";";
								console.log("URL:"+vURL+" Size="+vLinkSplit[i] + " - vSize='" + vSize +"'");
							};
							*/
							console.log("vLinkSplit["+i+"]="+vLinkSplit[i]);
							if ((vLinkSplit[i]).match(/^[0-9]+px$/)) {
								//vFileSplit[i] = "350px"
								vSize = " width: "+vLinkSplit[i]+";";
								vWidth = (vLinkSplit[i]).replace(/[^0-9]/g,"");
								console.log("Image: '" + vLinkSplit[0] + "' with Width="+vWidth);
								//vFileSplit[i] = "350"
							} else if ((vLinkSplit[i] == "center") || (vLinkSplit[i] == "middle")) {
								vCenterImage = true;
							};
				};
				if (vLinkSplit.length == 1) {
					console.log("IMAGE SPLIT 1: "+vURL+" with Type: "+vFileType+ " Width="+vWidth);
					//replace_str = '___IMG_OPEN___File:' + vURL + '___IMG_CLOSE___';
					//replace_str = '<section data-background-image="'+vURL+'" data-background-size="cover"></section>\n';
					replace_str = '<img class="replaceimg1" src="' + vURL + '" style="'+vImgCenter+vSize+'" width="' + vWidth + '">';
					pWikiCode = pWikiCode.replace(tokens[0], replace_str);
				} else {
					if (vLinkSplit.length == 2) {
						console.log("IMAGE SPLIT 2: "+vURL+" with Type: "+vFileType +" Width="+vWidth);
						vCaption = this.checkCaption(vLinkSplit[1]);
						//replace_str = '___IMG_OPEN___File:' + vURL + '|' + vCaption + '___IMG_CLOSE___';
						replace_str = '<img class="replaceimg2" src="' + vURL + '" alt="'+vCaption+'"  style="'+vImgCenter+vSize+'" width="' + vWidth +  '">';
						pWikiCode = pWikiCode.replace(tokens[0], replace_str);
					} else {
						// var vMediaParam = "";
						console.log("IMAGE SPLIT 3: "+vURL+" with Type: "+vFileType +" Width="+vWidth);
						var vSize = "";
						vCaption = this.checkCaption(vLinkSplit[vLinkSplit.length-1]);
						//replace_str = '___IMG_OPEN___File:' + vURL + vMediaParam + '|' + vCaption + '___IMG_CLOSE___';
						replace_str = '<img src="' + vURL + '" alt="'+vCaption+'"  style="'+vImgCenter+vSize+'"  width="' + vWidth + "'>";
						pWikiCode = pWikiCode.replace(tokens[0], replace_str);
					}
				}; // else if vLineSplit.length
			} else {
				console.error("Uncaught MediaType (" + vFileType + "): '" + vURL + "'");
			} // else vFileType
		}; // While tokens
	  return pWikiCode;

	};
	//----End of Method replaceImages Definition


	//#################################################################
	//# PUBLIC Method: checkCaption()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pCaption:String
	//# Comment:
	//#    Correct a caption removes ]] at end
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.checkCaption = function (pCaption) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: checkCaption(pCaption:String):String");
	  // alert("js/wikiconvert.js - Call: checkCaption(pCaption:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.checkCaption(pCaption);
	  //-------------------------------------------------------
		if (pCaption) {
			pCaption = pCaption.replace(/[\]]+$/g,"");
		};
		console.log("Caption Figure: '"+pCaption+"' ");
	  return pCaption;

	};
	//----End of Method checkCaption Definition


	//#################################################################
	//# PUBLIC Method: math2jax()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//#    pFormat:String
	//# Comment:
	//#    Convert the MATH-tag to a MathJax compatible HTML enviroment dependent of the pFormat of the parameter of math2jax.
	//#    pFormat = 'reveal' 'html' are possible formats
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.math2jax = function (pWikiCode,pFormat) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: math2jax(pWikiCode:String,pFormat:String):String");
	  // alert("js/wikiconvert.js - Call: math2jax(pWikiCode:String,pFormat:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.math2jax(pWikiCode,pFormat);
	  //-------------------------------------------------------
		pWikiCode = pWikiCode.replace(/\\R /g,"\\mathbb R ");
		pWikiCode = pWikiCode.replace(/\\R\^/g,"\\mathbb R^");
		pWikiCode = pWikiCode.replace(/\\R</g,"\\mathbb R<");
		pWikiCode = pWikiCode.replace(/\\R\s/g,"\\mathbb R ");
		//pWikiCode =this.replaceString(pWikiCode,'\\','\mathbb R \\');
		return pWikiCode;

	};
	//----End of Method math2jax Definition


	//#################################################################
	//# PUBLIC Method: mathsymbols()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//#    pFormat:String
	//# Comment:
	//#    Convert math symbols for proper handling in MathJax
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.mathsymbols = function (pWikiCode) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: mathsymbols(pWikiCode:String):String");
	  // alert("js/wikiconvert.js - Call:  mathsymbols(pWikiCode:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    pWikiCode = vMyInstance.mathsymbols(pWikiCode);
	  //-------------------------------------------------------
		pWikiCode = pWikiCode.replace(/\\R /g,"\\mathbb R ");
		pWikiCode = pWikiCode.replace(/\\R\^/g,"\\mathbb R^");
		pWikiCode = pWikiCode.replace(/\\R</g,"\\mathbb R<");
		pWikiCode = pWikiCode.replace(/\\R\s/g,"\\mathbb R ");
		//pWikiCode =this.replaceString(pWikiCode,'\\','\mathbb R \\');
		return pWikiCode;

	};
	//----End of Method math2jax Definition


	//#################################################################
	//# PUBLIC Method: math2reveal()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//# Comment:
	//#    Convert math symbols for proper handling in MathJax
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.math2reveal = function (pWikiCode) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: math2reveal(pWikiCode:String):String");
	  // alert("js/wikiconvert.js - Call:  math2reveal(pWikiCode:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    pWikiCode = vMyInstance.math2reveal(pWikiCode);
	  //-------------------------------------------------------
		//pWikiCode = pWikiCode.replace(/\\R /g,"\\mathbb R ");
		//pWikiCode =this.replaceString(pWikiCode,'\\','\mathbb R \\');
		return pWikiCode;

	};
	//----End of Method math2reveal() Definition


	//#################################################################
	//# PUBLIC Method: convertWiki2Local()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pContent:String
	//# Comment:
	//#    convertWiki2Local() replaces the MediaWiki internal links to links that work in a local HTML file. The parsed vMediaWiki Links
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.convertWiki2Local = function (pContent) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: convertWiki2Local(pContent:String):String");
	  // alert("js/wikiconvert.js - Call: convertWiki2Local(pContent:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.convertWiki2Local(pContent);
	  //-------------------------------------------------------

			pContent = this.replaceWikiLinks(pContent);
			var vMediaArray = this.parseWiki4Media(pContent);
			this.createMediaParseJSON(vMediaArray);
	    this.downloadWikiMedia(vMediaArray);
	    pContent = this.convertMediaLink4Wiki(pContent,vMediaArray);
	    return pContent;

	};
	//----End of Method convertWiki2Local Definition


	//#################################################################
	//# PUBLIC Method: parseWiki4Media()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//# Comment:
	//#    parseWiki4Media() the pWikiCode and extract the Media and File links.
	//# Return: Array
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.parseWiki4Media = function (pWikiCode) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: parseWiki4Media(pWikiCode:String):Array");
	  // alert("js/wikiconvert.js - Call: parseWiki4Media(pWikiCode:String):Array");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.parseWiki4Media(pWikiCode);
	  //-------------------------------------------------------
			// the following code is performed in clean_source()
			//pWikiCode = this.replaceString(pWikiCode,"[[Image:","[[File:");
			//pWikiCode = this.replaceString(pWikiCode,"[[Datei:","[[File:");
			if (pWikiCode) {
				pWikiCode = this.replaceString(pWikiCode,"[Datei:","[File:");
			};
			var vMediaArray = [];
			// (1) find the image specs "my_image.png|330px|thumb|My Caption" in "[[File:my_image.png|330px|thumb|My Caption]]"
	    //var vSearch = /\[(File|Datei|Image):([^\|]*)/;
			// (2) find just the filename "my_image.png" in "[[File:my_image.png|330px|thumb|My Caption]]"
		    var vSearch = /\[(?:File|Image):([^\|\]]+)/g;
		    // \[            # "["
		    // (?:            # non-capturing group
		    //  File|Image|Datei        #   "File" or "Image" or "Datei"
		    // )              # end non-capturing group
		    //:             # ":"
		    //(              # group 1
		    //  [^\|\]]+      #   any character except "|" or "]" at least once
		    // )              # end group 1 - this will be the image's name
		    var vResult;
		    var vCount =0;
		    while (vResult = vSearch.exec(pWikiCode)) {
		      vCount++;
	      	vMediaArray.push(vResult[1]);
	      	console.log("Media "+vCount+": '" + vResult[1] + "' found");
	    	};

	    return vMediaArray;

	};
	//----End of Method parseWiki4Media Definition


	//#################################################################
	//# PUBLIC Method: createMediaParseJSON()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    vMediaArray:Array
	//# Comment:
	//#    createMediaParseJSON(vMediaArray:Array) creates in this.aParseJSON["media"]={} a Hash
	//#    that maps the local file path 'image/my_image.png' to the replace path
	//#    this.aParseJSON["media"]["image/my_image.png"] = "https://commons.wikimedia.org/wiki/my_image.png"
	//#
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.createMediaParseJSON = function (pMediaArray) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: createMediaParseJSON(vMediaArray:Array)");
	  // alert("js/wikiconvert.js - Call: createMediaParseJSON(vMediaArray:Array)");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.createMediaParseJSON(vMediaArray);
	  //-------------------------------------------------------

	    var vMediaFile = "";
	    var vSubDir = "";
	    var vLocalID = "";
			var vID = "";
			this.checkParseJSON("media");
			this.aParseJSON["media"] = {};
			for (var i = 0; i < pMediaArray.length; i++) {
	      vID = this.convertWikiMedia2ID(pMediaArray[i]);
	      //this.aParseJSON[vMediaArray[i]] = vLocalID;
	      this.aParseJSON["media"][vID] = this.getImageProps(pMediaArray[i]);
				// Hash contains all properties of the image
				//	"title": "Title of "+vMediaFile,
				//	"file": vMediaFile,
				//	"subdir": vSubDir + "/",
				//	"mediastring": pMediaArray[i],
				//	"url": "url-undefined",
				//	"align":"left"
		  };

	};
	//----End of Method createMediaParseJSON Definition


	//#################################################################
	//# PUBLIC Method: checkParseJSON()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pHashID:String
	//# Comment:
	//#    checkParseJSON() checks if the File Link definitions exists in the pWikiHash["media"]
	//#
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.checkParseJSON = function (pHashID) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: checkParseJSON(pHashID:String)");
	  // alert("js/wikiconvert.js - Call: checkParseJSON(pHashID:String)");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.checkParseJSON(pHashID);
	  //-------------------------------------------------------
		if (this.aParseJSON[pHashID]) {
	    console.log("ParseJSON['"+pHashID+"']  exists!");
	  } else {
	    this.aParseJSON[pHashID] = {};
	  };
	};
	//----End of Method checkParseJSON Definition


	//#################################################################
	//# PUBLIC Method: getMediaSubDir()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pMediaLink:String
	//# Comment:
	//#    getMediaSubDir(pMediaLink) return for a pMediaLink the appropriate subdirectory.
	//#
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.getMediaSubDir = function (pMediaLink) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: getMediaSubDir(pMediaLink:String)");
	  // alert("js/wikiconvert.js - Call: getMediaSubDir(pMediaLink:String)");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.getMediaSubDir(pMediaLink);
	  //-------------------------------------------------------
			var vMediaFile = "";
	    var vSubDir = "";
	    if (pMediaLink) {
	      vSubDir = this.getMediaSubDir(pMediaLink);
	      vMediaFile = this.convertWikiMedia2File(pMediaLink);
	      vSubDir  = vSubDir + "/" + vMediaFile
	    };
			return vSubDir;
	};
	//----End of Method getMediaSubDir Definition

	//#################################################################
	//# PUBLIC Method: correct_filename()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pFilename:String
	//# Return: String
	//# Comment:
	//#    convert filename to local filename
	//#
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################
	this.correct_filename = function (pFileName) {
		pFileName = pFileName.replace(/[^\/\\A-Za-z0-9\.]/g,"_");
		pFileName = pFileName.replace(/[_]+/g,"_");
		return pFileName
	}


	//#################################################################
	//# PUBLIC Method: getMediaSubDir()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pFilename:String
	//# Return: String
	//# Comment:
	//#    get Subdirectory according to file extension
	//#
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################
	this.getMediaSubDir = function (pFileName) {
		if (pFileName) {
			this.correct_filename(pFileName)
		};
		return pFileName;
	}

	//#################################################################
	//# PUBLIC Method: convertWikiMedia2File()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pMediaLink:String
	//# Comment:
	//#    convertWikiMedia2File(pMediaLink) converts the pMediaLink into an URL and returns the media link.
	//#    removes blanks at the tail and replaces blanks with and underscore "_"
	//#    and non-alpha-numerical characters with an underscore, so that finally the filename works fine on all file systems
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.convertWikiMedia2File = function (pMediaLink) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: convertWikiMedia2File(pMediaLink:String):String");
	  // alert("js/wikiconvert.js - Call: convertWikiMedia2File(pMediaLink:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.convertWikiMedia2File(pMediaLink);
	  //-------------------------------------------------------
		var vMediaFile = "";

		var vPathSplit = pMediaLink.split("/");
		if (vPathSplit.length >0) {
			vMediaFile = vPathSplit[vPathSplit.length-1];
			//vMediaFile = this.correct_filename(vMediaFile);
		} else {
			console.log("ERROR: pMediaLink='"+pMediaLink+"' is not defined");
		};
	  return vMediaFile;

	};
	//----End of Method convertWikiMedia2File Definition


	//#################################################################
	//# PUBLIC Method: convertWikiMedia2URL()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pMediaLink:String
	//# Comment:
	//#    convertWikiMedia2URL(pMediaLink) removes blanks at the tail and replaces blanks with and underscore "_"
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.convertWikiMedia2URL = function (pMediaLink) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: convertWikiMedia2URL(pMediaLink:String):String");
	  // alert("js/wikiconvert.js - Call: convertWikiMedia2URL(pMediaLink:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.convertWikiMedia2URL(pMediaLink);
	  //-------------------------------------------------------

	    pMediaLink = pMediaLink.replace(/[ \t]+$/,"");
	    pMediaLink = pMediaLink.replace(/ /g,"_");
	    //console.log("MediaLink: '"+pMediaLink+"'");
	    return pMediaLink;

	};
	//----End of Method convertWikiMedia2URL Definition

	//#################################################################
	//# PUBLIC Method: convertWikiMedia2ID()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pMediaLink:String
	//# Comment:
	//#    convertWikiMedia2ID(pMediaLink) removes blanks at the tail and replaces blanks with and underscore "_"
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.convertWikiMedia2ID = function (pMediaLink) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: convertWikiMedia2ID(pMediaLink:String):String");
	  // alert("js/wikiconvert.js - Call: convertWikiMedia2ID(pMediaLink:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.convertWikiMedia2ID(pMediaLink);
	  //-------------------------------------------------------

	    pMediaLink = this.convertWikiMedia2URL(pMediaLink);
	    pMediaLink = pMediaLink.replace(/[^A-Za-z0-9_]/g,"_");
			pMediaLink = pMediaLink.replace(/[_]+/g,"_");
	    //console.log("MediaLink: '"+pMediaLink+"'");
	    return pMediaLink;

	};
	//----End of Method convertWikiMedia2ID Definition

	//#################################################################
	//# PUBLIC Method: downloadWikiMedia()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pMediaArray:Array
	//# Comment:
	//#    downloadWikiMedia(pMediaArray:Array) download the images to level-fs
	//#    that can be exported as ZIP-file with archiver NPM module
	//#
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.downloadWikiMedia = function (pMediaArray) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: downloadWikiMedia(pMediaArray:Array)");
	  // alert("js/wikiconvert.js - Call: downloadWikiMedia(pMediaArray:Array)");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.downloadWikiMedia(pMediaArray);
	  //-------------------------------------------------------

	    for (var i = 0; i < pMediaArray.length; i++) {
	      this.downloadMediaFile(pMediaArray[i]);
	    };

	};
	//----End of Method downloadWikiMedia Definition


	//#################################################################
	//# PUBLIC Method: downloadMediaFile()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pMediaLink:String
	//# Comment:
	//#    downloadMediaFile(pMediaFile) from WikiMedia Commons to the local filesystem emulated with level-fs
	//#
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.downloadMediaFile = function (pMediaLink) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: downloadMediaFile(pMediaLink:String)");
	  // alert("js/wikiconvert.js - Call: downloadMediaFile(pMediaLink:String)");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.downloadMediaFile(pMediaLink);
	  //-------------------------------------------------------
		var vSubDir = this.getMediaSubDir(pMediaLink);
		// convertWikiMedia2File "http://www,srv.org/img/my_image.png" to  "my_image.png"
		var vMediaFile = this.convertWikiMedia2File(pMediaLink);
		// add a subdirectory according to file type
		// e.g."my_image.png" to "img/my_image.png"
		// or  "my_music.mp3" to "audio/my_music.mp3"
		// or  "my_video.webm" to "video/my_video.webm"
		var vLocalLink = vSubDir + "/" + vMediaFile;
		var vWGET_CMD = "wget -O " + this.aProjectDir + "/" + vLocalLink + " "+ pMediaLink;
		console.log("CALL WGET: "+vWGET_CMD+" (e.g. in NodeJS)");
		//
	  console.log("Download Media File '"+pMediaLink+"' to folder '"+this.aProjectDir+"' not implemented yet");

	};
	//----End of Method downloadMediaFile Definition


	//#################################################################
	//# PUBLIC Method: convertMediaLink4Wiki()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pContent:String
	//#    pMediaArray:Array
	//# Comment:
	//#    convertMediaLink4Wiki(pContent,pMediaWiki) convert the link
	//#    - [[File:MyFile.png....   with
	//#    - [File:https://commons.wikimedia.org/.../MyFile.png
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.convertMediaLink4Wiki = function (pWikiCode,pMediaArray) {
	  //----Debugging------------------------------------------
	  console.log("js/wikiconvert.js - Call: convertMediaLink4Wiki(pWikiCode:String,pMediaArray:Array):String");
	  // alert("js/wikiconvert.js - Call: convertMediaLink4Wiki(pContent:String,pMediaArray:Array):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.convertMediaLink4Wiki(pContent,pMediaArray);
	  //-------------------------------------------------------

	    var vReplaceLink;
	    var vMediaFile;
	    var vSubDir;
			var vLinkHTML;

	    pWikiCode = pWikiCode.replace(/\[(File|Image|Datei):/gi,"[File:");

	    for (var i = 0; i < pMediaArray.length; i++) {
	      vSubDir = this.getMediaSubDir(pMediaArray[i]);
				// convertWikiMedia2File "http://www,srv.org/img/my_image.png" to  "my_image.png"
	      vMediaFile = this.convertWikiMedia2File(pMediaArray[i]);
				// add a subdirectory according to file type
				// e.g."my_image.png" to "img/my_image.png"
				// or  "my_music.mp3" to "audio/my_music.mp3"
				// or  "my_video.webm" to "video/my_video.webm"
	      vReplaceLink = vSubDir + "/" + vMediaFile;

				pWikiCode = this.replaceString(pWikiCode,"File:"+pMediaArray[i],"File:"+vReplaceLink);
	    };
	    return pWikiCode;

	};
	//----End of Method convertMediaLink4Wiki Definition


	//#################################################################
	//# PUBLIC Method: replaceString()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pString:String
	//#    pSearch:String
	//#    pReplace:String
	//# Comment:
	//#    replaceString(pString,pSearch,pReplace) replaces globally pSearch by pReplace and returns the modified string
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.replaceString = function (pString,pSearch,pReplace) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: replaceString(pString:String,pSearch:String,pReplace:String):String");
	  // alert("js/wikiconvert.js - Call: replaceString(pString:String,pSearch:String,pReplace:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.replaceString(pString,pSearch,pReplace);
	  //-------------------------------------------------------

	  	//alert("cstring.js - replaceString() "+pString);
	  	if (!pString) {
	  		alert("replaceString()-Call - pString not defined!");
	  	} else if (pString != '') {
				//alert("cstring.js - replaceString() "+pString);
				var vHelpString = '';
				var vN = pString.indexOf(pSearch);
				var vReturnString = '';
				while (vN >= 0) {
					if (vN > 0)
						vReturnString += pString.substring(0, vN);
						vReturnString += pReplace;
									if (vN + pSearch.length < pString.length) {
							pString = pString.substring(vN+pSearch.length, pString.length);
					} else {
							pString = ''
					};
					vN = pString.indexOf(pSearch);
				};
				return vReturnString + pString;
			};
	};
	//----End of Method replaceString Definition


	//#################################################################
	//# PUBLIC Method: convertWiki2Online()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pContent:String
	//# Comment:
	//#    convertWiki2Online(pContent) converts the Links and Media in way so that media and links
	//#    are referenced to online resource to the server
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.convertWiki2Online = function (pContent) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: convertWiki2Online(pContent:String):String");
	  // alert("js/wikiconvert.js - Call: convertWiki2Online(pContent:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.convertWiki2Online(pContent);
	  //-------------------------------------------------------

	    var vMediaArray = this.parseWiki4Media(pContent);
	    // this.downloadWikiMedia(vMediaArray);
	    pContent = this.convertMediaLink4WikiOnline(pContent,vMediaArray);
	    pContent = this.replaceWikiLinks(pContent);
	    return pContent;

	};
	//----End of Method convertWiki2Online Definition


	//#################################################################
	//# PUBLIC Method: replaceWikiLinks()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//# Comment:
	//#    Comment for replaceWikiLinks
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.replaceWikiLinks = function (pWikiCode) {
	  //----Debugging------------------------------------------
	  console.log("js/wikiconvert.js - Call: replaceWikiLinks(pWikiCode:String):String");
	  // alert("js/wikiconvert.js - Call: replaceWikiLinks(pWikiCode:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.replaceWikiLinks(pWikiCode);
	  //-------------------------------------------------------

	    var vLinkArray = this.getWikiLinks(pWikiCode);
	    var vURL,Title,vLink,vLocalLink;
	    var vPipePos = 0;
			var vColonPos = 0;
			this.aMediaArray = [];
	    this.checkParseJSON("links");
			var vCount = 0;
	    for (var i = 0; i < vLinkArray.length; i++) {
	      vLink = vLinkArray[i];
	      vPipePos = vLink.indexOf("|");
				if (vPipePos>0) {
					//Wiki-Link 1: '/Birds/|Swarm of Birds' found
					//Wiki-Link 2: 'Water|Water Learning Resource' found
					//Wiki-Link 3: 'w:Water|Water Wikipedia' found
					//Wiki-Link 4: 'v:Water|Water Wikiversity' found
					vURL = vLink.substr(0,vPipePos);
					vTitle = vLink.substr(vPipePos+1,vLink.length);
	      } else {
					//Wiki-Link 1: 'Swarm Intelligence' found
					//Wiki-Link 2: 'Water' found
					//Wiki-Link 3: '/Birds/' found
				  vURL = vLink;
	        vTitle = vLink.replace(/\//g,"");
	      };
				//Wiki-Link 1: 'w:Water|Water Wikipedia' found
				//Wiki-Link 4: 'Wikiversity:Water|Water Wikiversity' found
				vColonPos = vURL.indexOf(":");
				if (vColonPos > 0) {
					//for Wikipedia:Water vLinkSplit[0]= "Wikipedia" -> is a not interwikilink
					// link contains colon ":"
					var vColonPrefix = vURL.substr(0,vColonPos);
					//vColonPrefix w,v,Wikipedia,wikiversity Interwiki Link
					if (vColonPrefix.toLowerCase() == "category") {
						// [[Category:Risk management]]
						console.log("Category with Local Wiki Link '"+vURL+"' found");
						vURL = this.getWikiDisplayURL(vURL);
						vLocalLink = this.createLink4Output(vURL,vTitle);
			      //pWikiCode = this.replaceString(pWikiCode,"[["+vLink+"]]",vLocalLink);
					  // for reverse replacement to online Wikipedia or Wikiversity store replacement in ParseJSON
						pWikiCode = this.replaceString(pWikiCode,"[["+vLink+"]]",vLocalLink);
			      this.aParseJSON["links"][vLocalLink] = "["+vLink+"]";
				 	} else if (this.aFilePrefix.hasOwnProperty(vColonPrefix)) {
						console.log("URL: '"+vURL+"' is an image, do not replace by URL text reference.");
						this.aMediaArray.push(vURL);
					} else if (this.aMap.hasOwnProperty(vColonPrefix)) {
						// do something for interwiki links
						console.log("Inter Wiki Link '"+vURL+"' found");
						vURL = this.getWikiDisplayURL(vURL);
						vLocalLink = this.createLink4Output(vURL,vTitle);
			      pWikiCode = this.replaceString(pWikiCode,"[["+vLink+"]]",vLocalLink);
			      // for reverse replacement to online Wikipedia or Wikiversity store replacement in ParseJSON
			      this.aParseJSON["links"][vLocalLink] = "["+vLink+"]";
					}
				} else {
					console.log("Local Wiki Link '"+vURL+"' found");
					vURL = this.getWikiDisplayURL(vURL);
		      vLocalLink = this.createLink4Output(vURL,vTitle);
		      pWikiCode = this.replaceString(pWikiCode,"[["+vLink+"]]",vLocalLink);
		      // for reverse replacement to online Wikipedia or Wikiversity store replacement in ParseJSON
		      this.aParseJSON["links"][vLocalLink] = "["+vLink+"]";
				};
		  };
			// Replace External Links: [http://www.example.com Example Server]
			// var external_links = /\[(https:\/\/|http:\/\/)([a-zA-Z0-9].[^\s]*) ([a-zA-Z0-9].[^\]]*)\]/g;
			// pWikiCode = pWikiCode.replace(external_links, '<a href="$1$2" target="_blank">$3</a>');

	    return pWikiCode;
	};
	//----End of Method replaceWikiLinks Definition

	//#################################################################
	//# PUBLIC Method: replaceWikiLinks()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//# Comment:
	//#    Comment for replaceWikiLinks
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.replaceExternalLinks = function (pWikiCode) {
		//----Debugging------------------------------------------
		console.log("js/wikiconvert.js - Call: replaceExternalLinks(pWikiCode:String):String");
		// alert("js/wikiconvert.js - Call: replaceWikiLinks(pWikiCode:String):String");
		//----Create Object/Instance of WikiConvert----
		//    var vMyInstance = new WikiConvert();
		//    vMyInstance.replaceExternalLinks(pWikiCode);
		//-------------------------------------------------------

			// Wiki Links are open with ""
			var vLinkArray = [];
			//var vSearch = /\[(File|Datei|Image):([^\|]*)/;
			var vSearch = /\[(http[^\[\]]+)\]/g;
			// \[\[         # "[["
			//(             # group 1
			//  [^\[\]]+    #   any character except "[" and "]" ":" at least once
			// )            # end group 1 - this will be the image's name
			// \]\]         # "]]"
			var vResult;
			var vCount =0;
			var vLink = "";
			var vLinkSplit;
			var vType = "";
			var vFoundBlank = 0;
			while (vResult = vSearch.exec(pWikiCode)) {
				vCount++;
				vFoundBlank = vResult[1].indexOf(" ");
				if (vFoundBlank > 0) {
					vLinkSplit = [vResult[1].substr(0,vFoundBlank),vResult[1].substr(vFoundBlank+1)]
				} else {
					vLinkSplit = [vResult[1],vResult[1]]
				};
				vLink = "<a href=\"" + vLinkSplit[0] +"\" target=\"blank\">" + vLinkSplit[1] + "</a>";
				pWikiCode = this.replaceString(pWikiCode,"["+vResult[1]+"]",vLink);
			};
			return pWikiCode;
	}
	//#################################################################
	//# PUBLIC Method: createLink4Output()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//# Comment:
	//#    expand a local link for Wiki Markdown or HTML
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.createLink4Output= function (pLink,pTitle) {
		var vLanguage = this.aLanguage;
		var vServer  = this.aLanguage+"."+this.aDomain+".org";
		console.log("createLink4Ouptut('"+pLink+"','"+pTitle+"') vServer='"+vServer+"'");
		var vLinkOut = "";
		switch (this.aOutFormat) {
			case "latex":
			 	// \href{./Open_Community_Approach}{Open Community Approach}
				vLinkOut = "\\href{"+pLink+"}{"+pTitle+"}";
			break;
			case "reveal":
				//pTitle = pTitle.replace(/:/g," ");
				vLinkOut = "<a href=\""+pLink+"\" target=\"_blank\" class=\"external\" >"+pTitle+"</a>";
			case "html":
				vLinkOut = "<a href=\""+pLink+"\" target=\"_blank\" class=\"external\" >"+pTitle+"</a>";
			break;
			default:
				vLinkOut = "["+pLink+" "+pTitle+"]";
		};
		console.log("Link: "+vLinkOut);
		return vLinkOut
	};


	//#################################################################
	//# PUBLIC Method: getWikiDisplayURL()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//# Comment:
	//#    expand a local link to the full Wiki Display URL
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.getWikiDisplayURL= function (pLink) {
		var vLanguage = this.aLanguage;
		var vServer  = this.aLanguage+"."+this.aDomain+".org";
		console.log("getWikiDisplayURL('"+pLink+"') vServer='"+vServer+"'");
		var vMap = this.aMap;
		pLink = pLink || "undefined link";
		pLink = this.replaceString(pLink," ","_");
		var vLinkArr = pLink.split(":");
		// pLink = "Wikipedia:Water"
		var vArticle = pLink;
		// vArticle = "Water"
		if (vLinkArr.length == 2) {
			// Wikipedia:Swarm_intelligence
			// w:Swarm_intelligence
			// /Slime_mold/
			// Category:Risk Management
			if ((vLinkArr[0]).toLowerCase() == "category") {
				// Category:Risk Management
				vArticle = pLink || "undefined_wiki_link";
			} else {
				// w:Swarm_intelligence
				vServer = vLanguage + "." + vMap[vLinkArr[0]]+".org";
				vArticle = vLinkArr[1] || "undefined_wiki_link";
			};

		} else if (vLinkArr.length == 3) {
			// w:en:Swarm_intelligence
			// [[Wikipedia:Category:Risk Management]]
			var vLinkLanguage = this.aLanguage;
			var vLinkDomain = this.aDomain;
			if ((vLinkArr[1]).toLowerCase() == "category") {
				// [[Wikipedia:Category:Risk Management]]
				vArticle = vLinkArr[1]+":"+vLinkArr[2] || "undefined_category";
				// vArticle = "Category:Risk Management"
			} else {
				vArticle = vLinkArr[2] || "undefined_wiki_link";
				// w:en:Swarm_intelligence
				vLinkLanguage = vLinkArr[1];     // vLinkArr[1] = "en"
				vLinkDomain = vMap[vLinkArr[0]]; // map "w" to "wikipedia"
			};
			vServer = vLinkLanguage + "." + vLinkDomain +".org";
		} else if (vArticle.indexOf("/")==0) {
			// Link: "/Slime mold/"
			vArticle = this.aWikiTitle+vArticle;
			// Link: "Swarm intelligence/Slime mold/ "
			vArticle = vArticle.replace(/[\/\s]+$/i,"");
			// Link: "Swarm intelligence/Slime mold"
		};
		vArticle = this.replaceString(vArticle," ","_");
		// Link: "Swarm_intelligence/Slime_mold"
		return "https://"+vServer+"/wiki/"+vArticle;
	};

	//#################################################################
	//# PUBLIC Method: getWikiMediaURL()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pFileName:String
	//# Comment:
	//#
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################
	this.getWikiMediaURL = function(pFileName) {
		//console.log("getWikiMediaURL('"+pFileName+"')");
		pFileName = pFileName.replace(/^\[\[(File|Image|Datei):/gi,"");
		pFileName = pFileName.replace(/[\]]+$/gi,"");
		pFileName = pFileName.replace(/\s/g,"_");
		return this.aMediaPath+pFileName;
	};

	//#################################################################
	//# PUBLIC Method: getWikiDisplayURL()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pFilename:String
	//# Comment:
	//#
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.getMediaFileType = function (pFileName) {
		var vType = "none";
		if ( /\.(jpe?g|png|gif|bmp)$/i.test(pFileName) ) {
			vType = "img";
		};
		if ( /\.(svg)$/i.test(pFileName) ) {
			vType = "svg";
		};
		if ( /\.(mp4|webm|mov|avi|mpe?g|ogv)$/i.test(pFileName) ) {
			vType = "video";
		};
		if ( /\.(mp3|wav|ogg|mid)$/i.test(pFileName) ) {
			vType = "audio";
		};
		return vType
	}

	//#################################################################
	//# PUBLIC Method: getWikiLinks()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pWikiCode:String
	//# Comment:
	//#    getWikiLinks(pWikiCode) extract Double-Bracket [[...]] link in pWikiCode
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.getWikiLinks = function (pWikiCode) {
	  //----Debugging------------------------------------------
	  // console.log("js/wikiconvert.js - Call: getWikiLinks(pWikiCode:String):String");
	  // alert("js/wikiconvert.js - Call: getWikiLinks(pWikiCode:String):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.getWikiLinks(pWikiCode);
	  //-------------------------------------------------------

	    // Wiki Links are open with ""
	    var vLinkArray = [];
	    //var vSearch = /\[(File|Datei|Image):([^\|]*)/;
	    var vSearch = /\[\[([^\[\]]+)\]\]/g;
	    // \[\[         # "[["
	    //(             # group 1
	    //  [^\[\]]+    #   any character except "[" and "]" ":" at least once
	    // )            # end group 1 - this will be the image's name
	    // \]\]         # "]]"
	    var vResult;
	    var vCount =0;
			var vLink = "";
			var vLinkSplit;
			var vType = "";
			while (vResult = vSearch.exec(pWikiCode)) {
	      vCount++;
				vLinkSplit = vResult[1].split(":");
				if (vLinkSplit.length == 1) {
					// link contains no colon ":"
					vLinkArray.push(vResult[1]);
				} else if (this.aMap.hasOwnProperty(vLinkSplit[0])) {
					//for Wikipedia:Water vLinkSplit[0]= "Wikipedia" -> is a wikilink
					vLinkArray.push(vResult[1]);
					console.log("Wiki-Link ('"+vLinkSplit[0]+"') "+vCount+": '" + vResult[1] + "' found");
				} else if ((vLinkSplit[0]).toLowerCase() == "category") {
					//for Wikipedia:Water vLinkSplit[0]= "Wikipedia" -> is a wikilink
					vLinkArray.push(vResult[1]);
					console.log("Wiki-Category-Link ('"+vLinkSplit[0]+"') "+vCount+": '" + vResult[1] + "' found");
				} else {
					console.log("Wiki-File "+vCount+": '" + vResult[1] + "' found");
					//for File:Water.png vLinkSplit[0]= "File" not an own property of aMap -> not a Link
				};
	    };
	    return vLinkArray;

	};
	//----End of Method getWikiLinks Definition


	//#################################################################
	//# PUBLIC Method: convertMediaLink4WikiOnline()
	//#    used in Class: WikiConvert
	//# Parameter:
	//#    pContent:String
	//#    pMediaArray:Array
	//# Comment:
	//#    convertMediaLink4WikiOnline(pWikiCode,pMediaArray) converts Media Links to WikiMedia Commons
	//#    to a remote link for local files
	//# Return: String
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2018/01/21 17:17:18
	//#################################################################

	this.convertMediaLink4WikiOnline = function (pWikiCode,pMediaArray) {
	  //----Debugging------------------------------------------
	  console.log("js/wikiconvert.js - Call: convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String");
	  // alert("js/wikiconvert.js - Call: convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String");
	  //----Create Object/Instance of WikiConvert----
	  //    var vMyInstance = new WikiConvert();
	  //    vMyInstance.convertMediaLink4WikiOnline(pContent,pMediaArray);
	  //-------------------------------------------------------

	    var vReplaceLink;
	    var vMediaFile;
	    var vPathArray;

			// "File:" "Image:" "Datei:" will be replaced "File:" by clean_source()
			//pWikiCode = pWikiCode.replace(/\[\[(File|Image|Datei):/gi,"[[File:");

			//var vSearch = /\[(File|Datei|Image):([^\|]*)/;
	    var vSearch = /(\[\[File:[^\]]+\]\])/g;
			// (              # begin capturing group
	    // \[\[           # "[["
	    //  File:         #   "File:"
			//  [^\]]+        #   any character except  "]" at least once
			// \]\]           # "]]"
	    // )              # end capturing group
	    var vResult;
	    var vCount =0;
			var vReplaceArray = [];
	    while (vResult = vSearch.exec(pWikiCode)) {
	      vCount++;
	      console.log("Media "+vCount+": '" + vResult[1] + "' replace into IMG-tag");
				vReplaceArray.push(vResult[1]);
	    };
			if (vReplaceArray.length == pMediaArray.length) {
				for (var i = 0; i < pMediaArray.length; i++) {
					//vPathArray = (pMediaArray[i]).split("/");
					//vMediaFile = vPathArray[vPathArray.length-1];
					vMediaFile = pMediaArray[i];
					var vFileSplit = vMediaFile.split("|");
					vMediaFile = vFileSplit[0];
					var vWidth = this.aDefaultImageWidth;
					var vCenterImage = false;
					for (var i = 1; i < vFileSplit.length; i++) {
						if ((vFileSplit[i]).match(/^[0-9]+px$/)) {
							//vFileSplit[i] = "350px"
							vWidth = (vFileSplit[i]).replace(/[^0-9]/g,"");
							console.log("Image: '" + vMediaFile + "' with Width="+vWidth);
							//vFileSplit[i] = "350"
						} else if ((vFileSplit[i] == "center") || (vFileSplit[i] == "middle")) {
							vCenterImage = true;
						};
					};
					var vCaption = "";
					if (vFileSplit.length >1) {
						//[[File:My File.png|center|400px|My Caption "Title"]]
						vCaption = this.checkCaption(vFileSplit[vFileSplit.length-1]);
						// vCaption ="My Caption \"Title\""
						vCaption = this.replaceString(vCaption,"\"","'");
						// vCaption ="My Caption 'Title'
					};
					// ReplaceLink created as image-tag
					vReplaceLink = "<img src=\""+this.getWikiMediaURL(vMediaFile) + "\" width=\""+vWidth+"\" ";
					if (vCaption != "") {
						vReplaceLink += " alt=\""+vCaption+"\" title=\""+vCaption+"\"";
					};
					if (vCenterImage == true) {
						vReplaceLink += " align=\"middle\" ";
					};
					vReplaceLink += ">";
					// add figcaption if aAddFigCaption as attribute is true
					if (this.aAddFigCaption == true) {
						vCaption = this.checkCaption(vCaption);
						vReplaceLink += "\n<figcaption>"+vCaption+"</figcaption>";
					};
					// wrap image into <figure>-tag
					vReplaceLink = "<figure>\n   "+vReplaceLink+"</figure>";
					//pWikiCode = this.replaceString(pWikiCode,vReplaceArray[i],vReplaceLink);
				};
			} else {
				console.log("ERROR: Replace Link for MediaLinks do not have the same length");
			};
		  return pWikiCode;

	};
	//----End of Method convertMediaLink4WikiOnline Definition

	this.getImageProps = function (pMediaLink) {
		var vImgProps = {
			"title": "",
			"file": "",
			"url": "",
			"mediastring": pMediaLink,
			"subdir": "images/",
			"width":this.aDefaultImageWidth,
			"align":"center",
			"thumb":true,
			"frame":false
		};

		var vFileSplit = pMediaLink.split("|");
		vMediaFile = vFileSplit[0];
		var vWidth = this.aDefaultImageWidth;
		var vCenterImage = false;
		for (var i = 1; i < vFileSplit.length; i++) {
			if ((vFileSplit[i]).match(/^[0-9]+px$/)) {
				//vFileSplit[i] = "350px"
				vImgProps["width"] = (vFileSplit[i]).replace(/[^0-9]/g,"");
				//vFileSplit[i] = "350"
			} else if (vFileSplit[i] == "center") {
				vImgProps["align"] = "center";
			} else if (vFileSplit[i] == "left") {
				vImgProps["align"] = "left";
			} else if (vFileSplit[i] == "right") {
				vImgProps["align"] = "right";
			} else if ((vFileSplit[i] == "thumb") && (vFileSplit[i] == "thumbnail") && (vFileSplit[i] == "mini")) {
				vImgProps["thumb"] = true;
			};
		};
		// Determine Caption of Image/Figure
		if (vFileSplit.length >1) {
			//[[File:My File.png|center|400px|My Caption "Title"]]
			vImgProps["title"] = vFileSplit[vFileSplit.length-1];
			// Caption ="My Caption \"Title\""
			vImgProps["title"] = this.replaceString(vImgProps["caption"],"\"","'");
			// Caption ="My Caption 'Title' ""
		};
		// Determine Media URL from WikiMedia Commons with this.aDocJSON["images"] Array
		console.log("IMAGE PROPS: Find '"+pMediaLink+"'");
		//getImageIndexDocJSON()
		return vImgProps;
	}

}
//-------------------------------------------------------------------------
//---END Constructor of Class "WikiConvert()"
//-------------------------------------------------------------------------

//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: WikiConvert
//-------------------------------------------
// module.exports = WikiConvert;



// Library: js/wiki2reveal_generator.js 

function getWiki2Reveal(pMarkdown,pTitle, pAuthor, pLanguage, pDomain, pOptions) {
  console.log("getWiki2Reveal()-Call");
  if (!pMarkdown) {
    console.error("ERROR: pMarkdown undefined in getWiki2Reveal()-Call ");
  }
  if (document.location.href.indexOf("dzslides") >= 0) {
    pOptions.slidetype = "dzslides";
    console.log("Set slidetype to 'dzslides'");
  } else {
    pOptions.slidetype = "reveal";
  }
  var vWikiID = pLanguage+pDomain;
  var page_identifier = pTitle.replace(/ /g,"_");
  var vDocJSON = {}; // vDocJSON stores parsed content
  // init "wikiconvert" the Wiki Source - necessary for expanding relative URLs for images and local links
  wtf.wikiconvert.init(pLanguage,pDomain,vDocJSON,"reveal");
  // init the article name with the page_identifier, also necessary for handling relative links
  wtf.wikiconvert.initArticle(page_identifier,pOptions);
  pMarkdown = wtf.wikiconvert.clean_source(pMarkdown,pOptions);
  pMarkdown = wtf.wikiconvert.content_before_section(pMarkdown,pOptions);
  // console.log("Remove Categories");
  pMarkdown = tokenizeCitation(pMarkdown, vDocJSON, pOptions)
  pMarkdown = wtf.wikiconvert.remove_categories(pMarkdown,pOptions);
  // console.log("Remove math newlines");
  //pMarkdown = wtf.wikiconvert.removeMathNewlines(pMarkdown,pOptions);
  // replace local image urls (e.g. [[File:my_image.png]])
  // by a remote image url [[File:https://en.wikipedia.org/wiki/Special:Redirect/file/my_image.png]]
  var data = {
    "mathexpr": []
  };
  pMarkdown = tokenizeMath(pMarkdown,data,pOptions);
  console.log("tokenizeMath(pMarkdown,data,pOptions) DONE");
  // replace the Math-Tags for Reveal output
  pMarkdown = wtf.wikiconvert.removeMathNewlines(pMarkdown);
  pMarkdown = wtf.wikiconvert.replaceImages(pMarkdown,pOptions);
  pMarkdown = wtf.wikiconvert.replaceSections(pMarkdown,pOptions);
  console.log("wiki2reveal.js:28 - Sections replaced!");
  // pMarkdown = replaceMath4Reveal(pMarkdown,pOptions);
  console.log("wiki2reveal.js:30 - execute Math4Reveal replaced!");
  //console.log("JSON data:"+JSON.stringify(data,null,4));
  // store pMarkdown result in textarea
  //document.getElementById("wikimarkup").value = pMarkdown;
  // replace local  urls (e.g. [[Other Article]])
  // by a remote url to the Wiki article e.g. [https://en.wikipedia.org/wiki/Other_Article Other Article]
  pMarkdown = pMarkdown.replace(/\[\[Kurs:/gi,"[[c_o_u_r_s_e");
  pMarkdown = wtf.wikiconvert.replaceWikiLinks(pMarkdown,pOptions);
  //pMarkdown = external_links2href(pMarkdown);
  //pMarkdown = pMarkdown.replace(/<img[\s]+/g,"<imgXXX ");
  // perform the post processing after pMarkdown compilation
  pMarkdown = wtf.wikiconvert.replaceEnumeration(pMarkdown,pOptions);
  console.log("Slide Type: "+ wtf.wikiconvert.check_audio_slide(pMarkdown,pOptions));
  pMarkdown = wtf.wikiconvert.post_process(pMarkdown,pOptions);
  pMarkdown = wtf.wikiconvert.clean_unsupported_wiki(pMarkdown,pOptions);
  // create a Title slide and place the slide before output
  pMarkdown = replaceToken2Math(pMarkdown,data,pOptions);
  console.log("wiki2reveal.js:30 - Math4Reveal replaced!");
  pMarkdown = createTitleSlide(pTitle,pAuthor,pOptions) + "\n" + pMarkdown;
  // generate Reveal html output
  console.log("Call: wtf.reveal(pMarkdown)");
  //var vDoc = wtf(pMarkdown);
  //var htmlout =  vDoc.html(pMarkdown)
  pMarkdown = wtf.wikiconvert.replaceExternalLinks(pMarkdown);
  var htmlout =  pMarkdown;

  htmlout = addSectionReveal(htmlout,pOptions);
  htmlout = postprocessMath4Reveal(htmlout,pOptions);
  htmlout = htmlout.replace(/<imgXXX /g,"<img ");
  htmlout = htmlout.replace(/___aXXX___ /g,"<a ");
  htmlout = htmlout.replace(/___aXXXC___/g,">"); // closing ">" of openening <a ..
  htmlout = htmlout.replace(/___\/aXXX___/g,"</a>");
  htmlout = htmlout.replace(/c_o_u_r_s_e/g,"Kurs:");
  return htmlout;
}

function link2title(pArticle,pOptions) {
  if (pArticle) {
    //pArticle = pArticle.substr()
    pArticle = pArticle.replace(/\//g," - ");
    pArticle = pArticle.replace(/:/g,": ");
    pArticle = pArticle.replace(/_/g," ");
  } else {
    pArticle = "Undefined Title";
  }
  return pArticle;
}

function external_links2href(pMarkdown,pOptions) {
  var RE_ext_link = /\[([^\s\]]+)[[\s]+?([^\]]+)\]/gm;
  pMarkdown = pMarkdown.replace(RE_ext_link, '___aXXX___ href="$1" target="_blank"___aXXXC___$2 ___/aXXX___');

  return pMarkdown
}

function callRevealInit(pOptions) {
  console.log("callRevealInit()");
    // Full list of configuration options available at:
    // https://github.com/hakimel/reveal.js#configuration
    var vConfigReveal = {
      math: {
        mathjax: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js',
        //mathjax: 'mathjax/MathJax.js',
        config: 'TeX-AMS_HTML-full'
      },
      // Optional reveal.js plugins
      dependencies: [
        { src: 'reveal/lib/js/classList.js', condition: function() { return !document.body.classList; } },
        { src: 'reveal/plugin/zoom-js/zoom.js', async: true },
        { src: 'reveal/plugin/notes/notes.js', async: true },
        { src: 'reveal/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'reveal/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'reveal/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
        { src: 'reveal/plugin/zoom-js/zoom.js', async: true },
        { src: 'reveal/plugin/notes/notes.js', async: true },
        { src: 'reveal/plugin/math/math.js', async: true },
        { src: 'reveal/plugin/chalkboard/chalkboard.js', async: true },
        { src: 'reveal/plugin/menu/menu.js', async: true }
      ],
      audio: {
        prefix: 'chalkboard/',
        suffix: '.ogg',
        defaultDuration: 5,
//					textToSpeechURL: "http://api.voicerss.org/?key=[YOUR_KEY]&hl=en-gb&c=ogg&src=",
        advance: 500,
        autoplay: false,
        defaultText: true,
        playerOpacity: 0.2,
      },
      chalkboard: { // font-awesome.min.css must be available
        //src: "../../reveal/plugin/chalkboard/chalkboard.json",
        //src: "chalkboard/chalkboard.json",
        toggleChalkboardButton: { left: "80px" },
        toggleNotesButton: { left: "130px" },
        theme: "whiteboard",
        background: [ 'rgba(127,127,127,.1)' , 'reveal/plugin/chalkboard/img/whiteboard.png' ],
        pen: [ 'reveal/plugin/chalkboard/img/boardmarker.png' , 'reveal/plugin/chalkboard/img/boardmarker.png' ],
//				        color: [ 'rgba(0,0,255,1)', 'rgba(0,0,255,0.5)' ],
//				        draw: [ (RevealChalkboard) ?  RevealChalkboard.drawWithPen : null , (RevealChalkboard) ? RevealChalkboard.drawWithPen : null ],
      },
      keyboard: {
          67: function() { RevealChalkboard.toggleNotesCanvas() },	// toggle chalkboard when 'c' is pressed
          66: function() { RevealChalkboard.toggleChalkboard() },	// toggle chalkboard when 'b' is pressed
          46: function() { RevealChalkboard.clear() },	// clear chalkboard when 'DEL' is pressed
           8: function() { RevealChalkboard.reset() },	// reset all chalkboard data when 'BACKSPACE' is pressed
          68: function() { RevealChalkboard.download() },	// download chalkboard drawing when 'd' is pressed
        90: function() { Recorder.downloadZip(); }, 	// press 'z' to download zip containing audio files
        84: function() { Recorder.fetchTTS(); } 	// press 't' to fetch TTS audio files
      }
    };
    if (vAudioSlide == "yes4reveal") {
      vConfigReveal.dependencies.push({ src: 'reveal/plugin/audio-slideshow/slideshow-recorder.js'});
      vConfigReveal.dependencies.push({ src: 'reveal/plugin/audio-slideshow/audio-slideshow.js'});
    };
    Reveal.initialize(vConfigReveal)
}


function addSectionReveal(pMarkdown,pOptions) {
    var vSearch = /(<section[^>]*>)/i;
    var vResult;
    var vCount = 0;
    var vTagInsert = "";
    while (vResult = vSearch.exec(pMarkdown)) {
        if (vCount == 0) {
          vTagInsert = " class=\"titleslide\" id=\"slide"+vCount+"\" ";
        } else {
          vTagInsert = " class=\"level2\" id=\"slide"+vCount+"\" ";
        }
        pMarkdown = pMarkdown.replace(vResult[1],"<XXXXX "+vTagInsert+">");
        console.log("Section Tag "+vCount+" inserted: '"+vResult[1]+"'");
        vCount++;
    };
    pMarkdown = pMarkdown.replace(/<XXXXX/g,"<section");
    return pMarkdown;
};

function replaceMathNewLines(pMath) {
  var vMath = " undefined mathematical expression in replaceMathNewLines()-call";
  if (pMath) {
    vMath = pMath.replace(/\n/g," ");
  }
  return vMath;
}

function replaceMath4Reveal(pMarkdown,pOptions) {
  if (pMarkdown) {
    pMarkdown = replaceMathBlock4Reveal(pMarkdown,pOptions);
    pMarkdown = replaceMathInline4Reveal(pMarkdown,pOptions);
  } else {
    pMarkdown = "undefined pMarkdown"
  }
  return pMarkdown;
}

function postprocessMath4Reveal(pMarkdown,pOptions) {
  pMarkdown = pMarkdown.replace(/XXXspan/g,"span");
  //pMarkdown = pMarkdown.replace(/___MATH_END_BLOCK___/g,"</p><p class=\"textleft\" style=\"text-align: left;\">");

  return pMarkdown;
}

function replaceMathInline4Reveal(pMarkdown,pOptions) {
   // <math>(.*?)<\/math>
    var vSearch = /(<math>)(.*?)(<\/math>)/i;
    var vResult;
    var vCount = 0;
    var vTagInsert = "";
    var vSearchStr = "";
    while (vResult = vSearch.exec(pMarkdown)) {
      vCount++;
      vSearchStr = vResult[1]+vResult[2]+vResult[3];
      pMarkdown = pMarkdown.replace(vSearchStr,'<XXXspan id="math'+vCount+'inline" class="math inline">\\(' +vResult[2]+'\\)</XXXspan>');
      console.log("Math Inline Expression "+vCount+" found: '"+vResult[2]+"'");
    };
    return pMarkdown;
};

function replaceMathBlock4Reveal(pMarkdown,pOptions) {
   // <math>(.*?)<\/math>
   var vSearch = /(\n[:]+[\s]*?<math[^>]*?>)(.*?)(<\/math>)/i;
   var vResult;
    var vCount = 0;
    var vTagInsert = "";
    var vSearchStr = "";
    while (vResult = vSearch.exec(pMarkdown)) {
      vCount++;
      var vMathBlock = vResult[2];
      vMathBlock = replaceMathNewLines(vMathBlock);
      //vMathBlock = vMathBlock.replace(/\n/g," ");
      vSearchStr = vResult[1]+vMathBlock+vResult[3];
      pMarkdown = pMarkdown.replace(vSearchStr,'\n<center><XXXspan id="math'+vCount+'block" class="math inline"> \\( \\displaystyle ' + vResult[2] +'\\)</XXXspan></center>');
      console.log("Math Block Expression "+vCount+" found: '"+vResult[2]+"'");
      vCount++;
    };
    return pMarkdown;
};

function getMathBlockTag4Reveal(pCount,pMath) {
  pMath = replaceMathNewLines(pMath);
  var vTag = '\n<center><XXXspan id="math' + pCount +
            'block" class="math inline"> \\( \\displaystyle ' +
            pMath +'\\)</XXXspan></center>';
  return vTag;
}

function getMathInlineTag4Reveal(pCount,pMath) {
  pMath = replaceMathNewLines(pMath);
  var vTag = '<XXXspan id="math'+pCount+'inline" class="math inline">\\(' +pMath+'\\)</XXXspan>';
  return vTag;
}


function replaceToken2Math(pMarkdown,data,pOptions) {
  var vSearch = "";
  var vReplace = "";
  var vType = "inline";
  var vCount = 0;
  console.log("replace tokens back to mathematical expression for RevealJS");
  for (var i = 0; i < data.mathexpr.length; i++) {
    vCount++;
    vSearch = data.mathexpr[i].label;
    vType = data.mathexpr[i].type || "inline";
    vMath = data.mathexpr[i].math || " ";
    switch (vType) {
      case "inline":
        vReplace = getMathInlineTag4Reveal(vCount,vMath);
      break;
      case "block":
        vReplace = getMathBlockTag4Reveal(vCount,vMath);
      break;
      default:
        vReplace = getMathInlineTag4Reveal(vCount,vMath);
        console.warn("Undefined Math Expression Type '" + vType + "' for '" + vMath + "'");
    }
    pMarkdown = replaceString(pMarkdown,vSearch,vReplace);
  }
  return pMarkdown;
}


function tokenizeMath (wikicode, data, pOptions) {
  var vNow = new Date();
  data.timeid = data.timeid || vNow.getTime();
  var timeid = data.timeid;
  var vFound = "";
  var vMathExpr = "";
  console.log("tokenizeMathBlock() Time ID="+data.timeid);
  if (wikicode) {
    // create the mathexpr array if
    //var vSearch = /(<math[^>]*?>)(.*?)(<\/math>)/gi;
    data = data || {};
    data.mathexpr = data.mathexpr || {};
    var vResult;
    var vCount =0;
    var vLabel = "";
    console.log("wikicode defined");
    //----- MATH BLOCK TOKENIZE -----
    var vSearchBlock = new RegExp("\n([:]+[\s]*?<math[^>]*?>)(.*?)(<\/math>)","i");
    //var vSearch = /\n[:]+[\s]*?(<math>)(.*?)(<\/math>)/gi;
    // \n            # newline
    // [:]+          # one or more colons
    // [\s]*?        # (optional) tabs and white space
    // <math[^>]*?>  # opening <math> tag
    // (.*?)         # enclosed math expression
    //(<\/math>)     # closing </math> tag
    //
    // gi            # g global, i ignore caps
    while (vResult = vSearchBlock.exec(wikicode)) {
      vCount++;
      vLabel = "___MATH_BLOCK_"+data.timeid+"_ID_"+vCount+"___";
      vFound = vResult[1] + vResult[2] + vResult[3];
      vMathExpr = vResult[2];
      console.log("Tokenize Math Expression Block"+vCount+": '" + vFound + "' found");
      //console.log("Push Block Data JSON="+JSON.stringify(data,null,4));
      data.mathexpr.push({
        "type":"block",
        "label":vLabel,
        "math": vMathExpr
      });
      console.log("Push Block Data" + vCount + " - done");
      //wikicode = replaceString(wikicode,vResult[0],vLabel);
      //wikicode = replaceString(wikicode,vFound,vLabel);
      //console.log("Execute replace on wikicode for '" + vFound + "'");
      //wikicode = wikicode.replace(vFound,vLabel);
      wikicode = replaceString(wikicode,vFound,vLabel);
      //console.log("Replace on wikicode executed for '" + vFound + "'");
    };
    //----- MATH INLINE TOKENIZE -----
    // console.log("Tokenize Inline Math JSON:" + JSON.stringify(data,null,4));
    var vSearchInline = new RegExp("(<math[^>]*?>)(.*?)(<\/math>)","i");
    //var vSearch = /\n[:]+[\s]*?(<math>)(.*?)(<\/math>)/gi;
    // <math[^>]*?>  # opening <math> tag
    // (.*?)         # enclosed math expression
    //(<\/math>)     # closing </math> tag
    //
    // i            #  i ignore caps, g global
    //console.log("Tokenize Inline Math - RegExp defined");
    while (vResult = vSearchInline.exec(wikicode)) {
      vCount++;
      vLabel = "___MATH_INLINE_"+data.timeid+"_ID_"+vCount+"___";
      //console.log("Tokenize Inline Math - Label: '" + vLabel + "'");

      vFound = vResult[1] + vResult[2] + vResult[3];
      vMathExpr = vResult[2];
      console.log("Tokenize Math Expression Inline"+vCount+": '" + vFound + "' found");
      //console.log("Push Data JSON="+JSON.stringify(data,null,4));
      data.mathexpr.push({
        "type":"inline",
        "label":vLabel,
        "math": vMathExpr
      });
      // console.log("Tokenize Math Expression - Push Inline Data" + vCount + "  - done");
      //wikicode = replaceString(wikicode,vResult[0],vLabel);
      //wikicode = replaceString(wikicode,vFound,vLabel);
     //  console.log("Execute replace on wikicode for '" + vFound + "'");
      wikicode = wikicode.replace(vFound,vLabel);
      //console.log("Replace on wikicode executed for '" + vFound + "'");
    };
    //console.log("DONE Tokenize Inline Math JSON:" + JSON.stringify(data,null,4));

  }
  return wikicode;
}

function tokenizeCitation (wiki, data, options) {
  var references = [];
  if (options && options.parse && options.parse.citations && options.parse.citations == false) {
    console.log("tokenize citations was not performed - options.parse.citations=false");
    //wiki = tokenizeRefs(wiki, data, options);
    // (1) References without a citation label
    wiki = wiki.replace(/<ref>([\s\S]{0,1000}?)<\/ref>/gi, function(a, tmpl){
      // getCiteLabel(data,pid) returns  ___CITE_8234987294_5___
      var vLabel = getCiteLabel(data,references.length);
      return vLabel;
    });
    // (2) Cite a reference by a label WITHOUT reference
    // replace <ref name="my book label"/> by "___CITE_7238234792_my_book_label___"
    wiki = wiki.replace(/<ref[\s]+name=["']([^"']+)["'][^>]{0,200}?\/>/gi,function(a, tmpl) {
      var vLabel = getCiteLabel(data,references.length);
      return vLabel;
    });
    // (3) Reference with citation label that is used multiple time in a document by (2)
    //wiki = wiki.replace(/<ref [\s]+name=["']([^"'])["'][^>]{0,200}?>([\s\S]{0,3000}?)<\/ref>/gi, function(a, name, tmpl) {
    wiki = wiki.replace(/<ref[\s]+name=["']([^"']+)["'][^>]{0,200}?>([^<]{0,3000}?)<\/ref>/gi, function(a, name, tmpl) {
        //let vLabel = getCiteLabel(data,name2label(tmpl));
      var vLabel = name2label(name);
      if (vLabel) {
        console.log("tokenizeRefs() created cite label='"+vLabel+"' from name='"+name+"'");
        vLabel = getCiteLabel(data,vLabel);
      } else {
        // convert a standard label with the reference length of the array as unique ID generator
        vLabel = getCiteLabel(data,references.length);
      }
      return vLabel;
    });

  } else {
    console.log("tokenize citations performed");
    wiki = tokenizeRefs(wiki, data, options,references);
  }
  return wiki
}


function tokenizeRefs (wiki, data, options, preferences) {
  var references = [];
  // (1) References without a citaion label
  wiki = wiki.replace(/ ?<ref>([\s\S]{0,1000}?)<\/ref> ?/gi, function(a, tmpl){
    // getCiteLabel(data,pid) returns  ___CITE_8234987294_5___
    var vLabel = getCiteLabel(data,references.length);
    wiki = storeReference(wiki,data,references,tmpl,vLabel);
    return vLabel;
  });
  // (2) Cite a reference by a label WITHOUT reference
  // replace <ref name="my book label"/> by "___CITE_7238234792_my_book_label___"
  wiki = wiki.replace(/ ?<ref[\s]+name=["']([^"'])["'][^>]{0,200}?\/> ?/gi,function(a, tmpl) {
    let vLabel = getCiteLabel(data,name2label(tmpl));
    return vLabel;
  });
  // (3) Reference with citation label that is used multiple time in a document by (2)
  wiki = wiki.replace(/ ?<ref [\s]+name=["']([^"'])["'][^>]{0,200}?>([\s\S]{0,1000}?)<\/ref> ?/gi, function(a, name, tmpl) {
    /* difference between name, label and cite label
       (3a) name='my book name#2012'
       (3b) label='my_book_name_2012'
       (3c) cite_label='___CITE_7238234792_my_book_label_2012___' is the unique marker in the text
     the citation label is a marker in the text with a unique time stamp and defined syntax
     which is very unlikely to have a text element in an article.
    */
    // Convert e.g. name='my book name#2012' to 'my_book_name_2012'
    var vLabel = name2label(name);
    if (vLabel) {
      console.log("tokenizeRefs() created cite label='"+vLabel+"' from name='"+name+"'");
      vLabel = getCiteLabel(data,vLabel);
    } else {
      // convert a standard label with the reference length of the array as unique ID generator
      vLabel = getCiteLabel(data,references.length);
    };
    wiki = storeReference(wiki,data,references,tmpl,vLabel);
    return vLabel;
  });
  data.refs4token = references;
  //data.references = references.map(r => new Reference(r));
  //now that we're done with xml, do a generic
  return wiki;
}

function hasCitation(str) {
  return /^ *?\{\{ *?(cite|citation)/i.test(str) && /\}\} *?$/.test(str) && /citation needed/i.test(str) === false;
};
function getCiteLabel (data,pid) {
  //replace blank and non characters or digits by underscore "_"
  //return "___CITE_"+data.timeid+"_"+pid+"___";
  return "<sup>("+pid+")</sup>";
}

function parseInline (str) {
  let obj = parseSentence(str) || {};
  return {
    template: 'citation',
    type: 'inline',
    data: {},
    inline: obj
  };
};


function parseSentence(str) {
  let obj = {
    text: postprocess(str)
  };
  //pull-out the [[links]]
  // parseLinks() - 04-sentence/links.js
  let links = parseLinks(str);
  if (links) {
    obj.links = links;
  }
  //pull-out the bolds and ''italics''
  obj = parseFmt(obj);
  //pull-out things like {{start date|...}}
  // obj = templates(obj);
  return new Sentence(obj);
}

function postprocess(line) {
  //fix links
  line = resolve_links(line);
  //remove empty parentheses (sometimes caused by removing templates)
  line = line.replace(/\([,;: ]*\)/g, '');
  //these semi-colons in parentheses are particularly troublesome
  line = line.replace(/\( *(; ?)+/g, '(');
  //dangling punctuation
  line = helpers.trim_whitespace(line);
  line = line.replace(/ +\.$/, '.');
  return line;
}

function parseSentence(str) {
  return {
    "sentence": str
  };
};

function name2label(pname) {
  //replace blank and non characters or digits by underscore "_"
  var vLabel = str.replace(/[^A-Za-z0-9]/g,"_");
  vLabel = vLabel.replace(/[_]+/g,"_");
  vLabel = vLabel.replace(/^_/g,"");
  vLabel = vLabel.replace(/_$/g,"");
  if (vLabel == "") {
    vLabel = null;
  }
  return vLabel;
}
function storeReference (wiki,data,references,tmpl,pLabel) {
  if (hasCitation(tmpl)) {
    let obj = parseCitation(tmpl);
    if (obj) {
      obj.label = pLabel;
      references.push(obj);
    };
    // Remove Citation from Wiki Source ???
    //wiki = wiki.replace(tmpl, '');
  } else {
    let obj = parseInline(tmpl);
    obj.label = pLabel;
    references.push(obj);
  };
  return wiki;
}

function parseCitation (tmpl) {
  let obj = parseGeneric(tmpl);
  if (obj) {
    return obj;
  }
  //support {{cite gnis|98734}} format
  return parsePipe(tmpl);
};

function parseGeneric(tmpl) {
  // dummy parseGeneric replace by wtf_wikipedia.js function
  if (tmpl) {
    return tmpl;
  } else {
    return {};
  }
}

function createTitleSlide(pTitle,pAuthor,pOptions) {
  console.log("CALL: createTitleSlide()");
  var vWikiLink = pTitle;
  pTitle = link2title(pTitle);
  var vSearch = link2title(pAuthor) + " - ";
  if (pTitle.indexOf(vSearch) >= 0) {
    pTitle = replaceString(pTitle,vSearch," ");
    console.log("Prefix: '"+vSearch+"' removed!");
  } else {
    console.log("Prefix: '"+vSearch+"' not found!");
  }
  var slide0 = "\n<section id=\"titleslide\">";
  slide0 += "\n  <h1 class=\"title\"><a href='https://" + pOptions.language+ "." + pOptions.domain + ".org/wiki/" + encodeURIComponent(vWikiLink) + "' target='_blank'>"+pTitle+"</a></h1>";
  slide0 += "\n  <h2 class=\"author\">"+pAuthor+"</h2>";
  //if (document.location.href.indexOf("reveal") >= 0) {
  //  slide0 += '<p class="fragment" data-audio-src="audio/silence.ogg">';
  //}
  if (pOptions) {
    if (pOptions.slidetype) {
      if (pOptions.slidetype == "dzslides") {
        console.log("CALL: createTitleSlide() - Slide Type: '"+ pOptions.slidetype+ "' - Title generated for DZSlides");
        slide0 += "\n  <center><img class=\"titlelogo\" width='150' src=\"img/Wiki2Reveal_Logo.png\"></center>";
      } else {
        console.log("CALL: createTitleSlide()  - Slide Type: '"+ pOptions.slidetype+ "' - Title generated for RevealJS");
      }
    } else {
      console.warn("CALL: createTitleSlide() - pOptions.slidetype undefined");
    }
  } else {
    console.warn("CALL: createTitleSlide() - pOptions undefined");
  }
  slide0 += "\n<center>"
  slide0 += "\n  <a href=\"https://niebert.github.io/Wiki2Reveal/index.html?language=" + pOptions.language + "&domain=" + pOptions.domain+ "&article=" + encodeURIComponent(vWikiLink) + "&author=" + pAuthor + "&audioslide=" + pOptions.audioslide + "\" target='_blank'>Wiki2Reveal</a>";
  slide0 += " - ";
  slide0 += "\n  <a href=\"https://" + pOptions.language + "." + pOptions.domain+ ".org/wiki/" + encodeURIComponent(vWikiLink) + "\" target='_blank'>Wiki Source</a>";
  slide0 += "\n</center>\n";
  //if (document.location.href.indexOf("reveal") >= 0) {
  //  slide0 += "</p>";
  //}
  slide0 += "\n</section>\n";
  return slide0;
}

function replaceString(pString,pSearch,pReplace) {
// replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
  var vReturnString = "undefined string for replaceString-call!";
  //alert("cstring.js - replaceString() "+pString);
  if (!pString) {
    console.log("replaceString()-Call - pString not defined!");
  } else if (pString != '') {
    {
    //alert("cstring.js - replaceString() "+pString);
      var vHelpString = '';
      var vN = pString.indexOf(pSearch);
      vReturnString = '';
      while (vN >= 0)
      {
        if (vN > 0)
          vReturnString += pString.substring(0, vN);
        vReturnString += pReplace;
              if (vN + pSearch.length < pString.length) {
          pString = pString.substring(vN+pSearch.length, pString.length);
        } else {
          pString = '';
        }
        vN = pString.indexOf(pSearch);
      }
    }
     vReturnString += pString;
  }
  //console.log("replaceString() finalized for '"+pString+"'");
  return vReturnString;
}

