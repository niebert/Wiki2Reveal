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
	this.aProjectDir = "demo/my_article";
	//---PUBLIC: aRemoteMedia (Boolean): the attribute 'aRemoteMedia' stores in 'Boolean' variable if the MediaLinks are stored in the local file system of referenced to remote Media Server
	this.aRemoteMedia = true;
	
    //---------------------------------------------------------------------
    //---Methods of Class "Wiki2HTML()"
    //---------------------------------------------------------------------
	//----PUBLIC Method: Wiki2HTML.parse(wikicode:String):String-----
	// parse(wikicode)  Return: String
	//	parses the MediaWiki code in argument and returns a HTML string
	//----PUBLIC Method: Wiki2HTML.deleteCR(wikicode:String):String-----
	// deleteCR(wikicode)  Return: String
	//	deleteCR(wikicode) normalizes line breaks in order to have a common base string for all browsers.
	//	deleteCR() uses the MediaWiki source code `wikicode` from the parameter of the function and returns a HTML string 
	//	after removing all CRs.
	//----PUBLIC Method: Wiki2HTML.headers(wikicode:String):String-----
	// headers(wikicode)  Return: String
	//	Convert all headers in Wiki source code
	//----PUBLIC Method: Wiki2HTML.horizontalRule(wikicode:String):String-----
	// horizontalRule(wikicode)  Return: String
	//	Convert the  horizontal rules in Wiki source code
	//----PUBLIC Method: Wiki2HTML.inlineElement(wikicode:String):String-----
	// inlineElement(wikicode)  Return: String
	//	Convert for inline elements of the Wiki source code
	//----PUBLIC Method: Wiki2HTML.list(wikicode:String):String-----
	// list(wikicode)  Return: String
	//	Convert orderd and unorderd list in the Wiki Source code
	//----PUBLIC Method: Wiki2HTML.table(wikicode:String):String-----
	// table(wikicode)  Return: String
	//	Convert the table from WikiSource code in HTML
	//----PUBLIC Method: Wiki2HTML.paragraph(wikicode:String):String-----
	// paragraph(wikicode)  Return: String
	//	Convert all paragraphs in the Wiki source code
	//----PUBLIC Method: Wiki2HTML.math2jax(wikicode:String,pFormat:String):String-----
	// math2jax(wikicode,pFormat)  Return: String
	//	Convert the MATH-tag to a MathJax compatible HTML enviroment dependent of the pFormat of the parameter of math2jax.
	//	pFormat = 'reveal' 'html' are possible formats
	//----PUBLIC Method: Wiki2HTML.toc(wikicode:String):String-----
	// toc(wikicode)  Return: String
	//	Convert the table of contents from Wiki source code into HTML
	//----PUBLIC Method: Wiki2HTML.convertWiki2Local(pContent:String,pWikiJSON:Hash):String-----
	// convertWiki2Local(pContent,pWikiJSON)  Return: String
	//	convertWiki2Local() replaces the MediaWiki internal links to links that work in a local HTML file. The parsed vMediaWiki Links 
	//----PUBLIC Method: Wiki2HTML.parseWiki4Media(pWikiText:String):Array-----
	// parseWiki4Media(pWikiText)  Return: Array
	//	parseWiki4Media() the pWikiText and extract the Media and File links.
	//----PUBLIC Method: Wiki2HTML.createMediaWikiJSON(vMediaArray:Array,pWikiJSON:Hash)-----
	// createMediaWikiJSON(vMediaArray,pWikiJSON)  
	//	createMediaWikiJSON(vMediaArray:Array,pWikiJSON:Hash) creates in pWikiJSON["media"]={} a Hash 
	//	that maps the local file path 'image/my_image.png' to the replace path 
	//	pWikiJSON["media"]["image/my_image.png"] = "https://commons.wikimedia.org/wiki/my_image.png" 
	//----PUBLIC Method: Wiki2HTML.checkWikiJSON(pWikiJSON:Hash,pHashID:String)-----
	// checkWikiJSON(pWikiJSON,pHashID)  
	//	checkWikiJSON() checks if the File Link definitions exists in the pWikiHash["media"]
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
	//----PUBLIC Method: Wiki2HTML.replaceWikiLinks(pWikiText:String,pWikiJSON:Hash):String-----
	// replaceWikiLinks(pWikiText,pWikiJSON)  Return: String
	//	Comment for replaceWikiLinks
	//----PUBLIC Method: Wiki2HTML.getWikiLinks(pWikiText:String):String-----
	// getWikiLinks(pWikiText)  Return: String
	//	getWikiLinks(pWikiText) extract Double-Bracket [[...]] link in pWikiText
	//----PUBLIC Method: Wiki2HTML.convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String-----
	// convertMediaLink4WikiOnline(pContent,pMediaArray)  Return: String
	//	convertMediaLink4WikiOnline(pWikiText,pMediaArray) converts Media Links to WikiMedia Commons 
	//	to a remote link for local files
	


}
//-------------------------------------------------------------------------
//---END Constructor of Class "Wiki2HTML()"
//-------------------------------------------------------------------------

//
//#################################################################
//# PUBLIC Method: parse()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    parses the MediaWiki code in argument and returns a HTML string
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.parse = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: parse(wikicode:String):String");
  // alert("js/wiki2html.js - Call: parse(wikicode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.parse(wikicode);
  //-------------------------------------------------------

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
  
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
  
  		var html = '<p>function wiki2html(wikicode): an error occurs</p>';
  		
  		wikicode = this.deleteCR(wikicode);
  		wikicode = this.math2jax(wikicode,"reveal");
  		wikicode = this.headers(wikicode);
  		wikicode = this.horizontalRule(wikicode);
  		wikicode = this.inlineElement(wikicode);
  		wikicode = this.list(wikicode);
  		wikicode = this.table(wikicode);
  		wikicode = this.paragraph(wikicode);
  		wikicode = this.toc(wikicode);
  		
  		html = wikicode;
  		
  		return html;

};
//----End of Method parse Definition


//#################################################################
//# PUBLIC Method: deleteCR()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    deleteCR(wikicode) normalizes line breaks in order to have a common base string for all browsers.
//#    deleteCR() uses the MediaWiki source code `wikicode` from the parameter of the function and returns a HTML string 
//#    after removing all CRs.
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.deleteCR = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: deleteCR(wikicode:String):String");
  // alert("js/wiki2html.js - Call: deleteCR(wikicode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.deleteCR(wikicode);
  //-------------------------------------------------------

  wikicode = wikicode.replace(/\r/g, '');
  return wikicode;

};
//----End of Method deleteCR Definition


//#################################################################
//# PUBLIC Method: headers()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert all headers in Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.headers = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: headers(wikicode:String):String");
  // alert("js/wiki2html.js - Call: headers(wikicode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.headers(wikicode);
  //-------------------------------------------------------

  	    var heading_1_regEx = /^=[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?=/gm;
  		var heading_2_regEx = /^==[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?==/gm;
  		var heading_3_regEx = /^===[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?===/gm;
  		var heading_4_regEx = /^====[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?====/gm;
  		var heading_5_regEx = /^=====[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?=====/gm;
  		var heading_6_regEx = /^======[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?======/gm;
  		
  		wikicode = wikicode.replace(heading_6_regEx, '<h6>$1</h6>');
  		wikicode = wikicode.replace(heading_5_regEx, '<h5>$1</h5>');
  		wikicode = wikicode.replace(heading_4_regEx, '<h4>$1</h4>');
  		wikicode = wikicode.replace(heading_3_regEx, '<h3>$1</h3>');
  		wikicode = wikicode.replace(heading_2_regEx, '<h2>$1</h2>');
  		wikicode = wikicode.replace(heading_1_regEx, '<h1>$1</h1>');
  		
  		return wikicode;

};
//----End of Method headers Definition


//#################################################################
//# PUBLIC Method: horizontalRule()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert the  horizontal rules in Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.horizontalRule = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: horizontalRule(wikicode:String):String");
  // alert("js/wiki2html.js - Call: horizontalRule(wikicode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.horizontalRule(wikicode);
  //-------------------------------------------------------

  	var horizontalLine = /----/g;
  		
  	wikicode = wikicode.replace(horizontalLine, '<hr>');
  		
  	return wikicode;

};
//----End of Method horizontalRule Definition


//#################################################################
//# PUBLIC Method: inlineElement()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert for inline elements of the Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.inlineElement = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: inlineElement(wikicode:String):String");
  // alert("js/wiki2html.js - Call: inlineElement(wikicode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.inlineElement(wikicode);
  //-------------------------------------------------------

  		var strongEm = /'''''([0-9A-Za-z].*)'''''/g;
  		var strong = /'''([0-9A-Za-z].*)'''/g;
  		var em = /''([0-9A-Za-z].*)''/g;
  		var image = /\[\[File:(.[^\]|]*)([|]thumb|frame)?([|]alt=.[^\]|]*)?([|].[^\]|]*)?\]\]/g;
  		var anchor = /\[([a-zA-Z0-9].[^\s]*) ([a-zA-Z0-9].[^\]]*)\]/g;
  	
  		wikicode = wikicode.replace(strongEm, '<strong><em>$1</em></strong>');
  		wikicode = wikicode.replace(strong, '<strong>$1</strong>');
  		wikicode = wikicode.replace(em, '<em>$1</em>');
  	
  		while(tokens = image.exec(wikicode)) {
  			if(tokens.length == 5 &&
  				typeof(tokens[2]) != 'undefined' &&
  				typeof(tokens[3]) != 'undefined' &&
  				typeof(tokens[4]) != 'undefined') {
  				tokens[2] = tokens[2].replace('|', '');
  				tokens[3] = tokens[3].replace('|alt=', '');
  				tokens[4] = tokens[4].replace('|', '');
  				wikicode = wikicode.replace(tokens[0], '<figure class="' + tokens[2] + '"><img src="' + tokens[1] + '" class="' + tokens[2] + '" alt="' + tokens[3] + '"><figcaption>' + tokens[4] + '</figcaption></figure>');
  			}
  			else
  				wikicode = wikicode.replace(tokens[0], '<div class="warning">WARNING: your image code is incomplete. Good practices for images impose to specify an alternative text, a caption and if the image is a frame or a thumbnail. For example, <code>&#091;&#091;File:anImage.png|thumb|alt=Alternative text|Caption text&#093;&#093;</code></div>');
  		}
  	
  		wikicode = wikicode.replace(anchor, '<a href="$1">$2</a>');
  		
  		return wikicode;

};
//----End of Method inlineElement Definition


//#################################################################
//# PUBLIC Method: list()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert orderd and unorderd list in the Wiki Source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.list = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: list(wikicode:String):String");
  // alert("js/wiki2html.js - Call: list(wikicode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.list(wikicode);
  //-------------------------------------------------------

  	// unordered
  		var unorderedStartList = /\n\n<li>/gm; //|\r\n\r\n<li>
  		var unorderedListItem = /^\*(.*)/gm;
  		var unorderedEndList = /<\/li>\n(?!<li>)/gm; // |<\/li>\r\n(?!<li>)
  		
  		wikicode = wikicode.replace(unorderedListItem, '<li>$1</li>');	
  		wikicode = wikicode.replace(unorderedStartList, "\n<ul>\n<li>");
  		wikicode = wikicode.replace(unorderedEndList, "</li>\n</ul>\n\n");
  		
  		// ordered
  		var orderedStartList = /\n\n<li>/gm; // |\r\n\r\n<li> ///([^<\/li>][>]?[\n])<li>/g;
  		var orderedListItem = /^#[:]?[#]* (.*)/gm;
  		var orderedEndList = /<\/li>\n(?!<li>|<\/ul>)/gm; // |<\/li>\r\n(?!<li>|<\/ul>) ///<\/li>\n(?!<li>)/gm;
  		
  		wikicode = wikicode.replace(orderedListItem, '<li>$1</li>');
  		wikicode = wikicode.replace(orderedStartList, "\n<ol>\n<li>");
  		wikicode = wikicode.replace(orderedEndList, "</li>\n</ol>\n\n");
  		
  		return wikicode;

};
//----End of Method list Definition


//#################################################################
//# PUBLIC Method: table()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert the table from WikiSource code in HTML
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.table = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: table(wikicode:String):String");
  // alert("js/wiki2html.js - Call: table(wikicode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.table(wikicode);
  //-------------------------------------------------------

  		// http://www.mediawiki.org/wiki/Help:Tables
  		var tableStart = /^\{\|/gm;
  		var tableRow = /^\|-/gm;
  		var tableHeader = /^!\s(.*)/gm;
  		var tableData = /^\|\s(.*)/gm;
  		var tableEnd = /^\|\}/gm;
  	
  		wikicode = wikicode.replace(tableStart, '<table><tr>');
  		wikicode = wikicode.replace(tableRow, '</tr><tr>');
  		wikicode = wikicode.replace(tableHeader, '<th>$1</th>');
  		wikicode = wikicode.replace(tableData, '<td>$1</td>');
  		wikicode = wikicode.replace(tableEnd, '</tr></table>');
  		
  		return wikicode;

};
//----End of Method table Definition


//#################################################################
//# PUBLIC Method: paragraph()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert all paragraphs in the Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.paragraph = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: paragraph(wikicode:String):String");
  // alert("js/wiki2html.js - Call: paragraph(wikicode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.paragraph(wikicode);
  //-------------------------------------------------------

  		var paragraph = /\n\n([^#\*=].*)/gm; //|\r\n\r\n([^#\*=].*)
  		
  		wikicode = wikicode.replace(paragraph, "\n<p>$1</p>\n");
  		
  		return wikicode;

};
//----End of Method paragraph Definition


//#################################################################
//# PUBLIC Method: math2jax()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    wikicode:String
//#    pFormat:String
//# Comment:
//#    Convert the MATH-tag to a MathJax compatible HTML enviroment dependent of the pFormat of the parameter of math2jax.
//#    pFormat = 'reveal' 'html' are possible formats
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.math2jax = function (wikicode,pFormat) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: math2jax(wikicode:String,pFormat:String):String");
  // alert("js/wiki2html.js - Call: math2jax(wikicode:String,pFormat:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.math2jax(wikicode,pFormat);
  //-------------------------------------------------------

  return wikicode;

};
//----End of Method math2jax Definition


//#################################################################
//# PUBLIC Method: toc()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert the table of contents from Wiki source code into HTML
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.toc = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: toc(wikicode:String):String");
  // alert("js/wiki2html.js - Call: toc(wikicode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.toc(wikicode);
  //-------------------------------------------------------

  	var toc = /^__TOC__/g;
  		
  	wikicode = wikicode.replace(toc, '');
  		
  	return wikicode;

};
//----End of Method toc Definition


//#################################################################
//# PUBLIC Method: convertWiki2Local()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pContent:String
//#    pWikiJSON:Hash
//# Comment:
//#    convertWiki2Local() replaces the MediaWiki internal links to links that work in a local HTML file. The parsed vMediaWiki Links 
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertWiki2Local = function (pContent,pWikiJSON) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertWiki2Local(pContent:String,pWikiJSON:Hash):String");
  // alert("js/wiki2html.js - Call: convertWiki2Local(pContent:String,pWikiJSON:Hash):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertWiki2Local(pContent,pWikiJSON);
  //-------------------------------------------------------

    var vMediaArray = this.parseWiki4Media(pContent);
    this.createMediaWikiJSON(vMediaArray,pWikiJSON);
    this.downloadWikiMedia(vMediaArray);
    pContent = this.convertMediaLink4Wiki(pContent,vMediaArray);
    pContent = this.replaceWikiLinks(pContent,pWikiJSON);
    return pContent;

};
//----End of Method convertWiki2Local Definition


//#################################################################
//# PUBLIC Method: parseWiki4Media()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiText:String
//# Comment:
//#    parseWiki4Media() the pWikiText and extract the Media and File links.
//# Return: Array
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.parseWiki4Media = function (pWikiText) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: parseWiki4Media(pWikiText:String):Array");
  // alert("js/wiki2html.js - Call: parseWiki4Media(pWikiText:String):Array");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.parseWiki4Media(pWikiText);
  //-------------------------------------------------------

    var vMediaArray = [];
    //var vSearch = /\[(File|Datei|Image):([^\|]*)/;
    var vSearch = /\[(?:File|Image|Datei):([^\|\]]+)/g;
    // \[            # "["
    // (?:            # non-capturing group
    //  File|Image|Datei        #   "File" or "Image" or "Datei"
    // )              # end non-capturing group
    //:             # ":"
    //(              # group 1
    //  [^\|]+      #   any character except "|" or "]" at least once
    // )              # end group 1 - this will be the image's name
    var vResult;
    var vCount =0;
    while (vResult = vSearch.exec(pWikiText)) {
      vCount++;
      vMediaArray.push(vResult[1]);
      console.log("Media "+vCount+": '" + vResult[1] + "' found");
    };
    return vMediaArray;

};
//----End of Method parseWiki4Media Definition


//#################################################################
//# PUBLIC Method: createMediaWikiJSON()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    vMediaArray:Array
//#    pWikiJSON:Hash
//# Comment:
//#    createMediaWikiJSON(vMediaArray:Array,pWikiJSON:Hash) creates in pWikiJSON["media"]={} a Hash 
//#    that maps the local file path 'image/my_image.png' to the replace path 
//#    pWikiJSON["media"]["image/my_image.png"] = "https://commons.wikimedia.org/wiki/my_image.png" 
//# 
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.createMediaWikiJSON = function (vMediaArray,pWikiJSON) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: createMediaWikiJSON(vMediaArray:Array,pWikiJSON:Hash)");
  // alert("js/wiki2html.js - Call: createMediaWikiJSON(vMediaArray:Array,pWikiJSON:Hash)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.createMediaWikiJSON(vMediaArray,pWikiJSON);
  //-------------------------------------------------------

    var vMediaFile = "";
    var vSubDir = "";
    var vLocalID = "";
    this.checkWikiJSON(pWikiJSON,"media");
    for (var i = 0; i < pMediaArray.length; i++) {
      vSubDir = this.getMediaSubDir(pMediaArray[i]);
      vMediaFile = this.convertWikiMedia2File(pMediaArray[i]);
      vLocalID = vSubDir + "/" + vMediaFile
      //pWikiJSON[vMediaArray[i]] = vLocalID;
      pWikiJSON["media"][vLocalID] = pMediaArray[i];
    };

};
//----End of Method createMediaWikiJSON Definition


//#################################################################
//# PUBLIC Method: checkWikiJSON()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiJSON:Hash
//#    pHashID:String
//# Comment:
//#    checkWikiJSON() checks if the File Link definitions exists in the pWikiHash["media"]
//# 
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.checkWikiJSON = function (pWikiJSON,pHashID) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: checkWikiJSON(pWikiJSON:Hash,pHashID:String)");
  // alert("js/wiki2html.js - Call: checkWikiJSON(pWikiJSON:Hash,pHashID:String)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.checkWikiJSON(pWikiJSON,pHashID);
  //-------------------------------------------------------

    var vMediaFile = "";
    var vSubDir = "";
    var vLocalID = "";
    this.checkWikiJSON(pWikiJSON,"media");
    for (var i = 0; i < pMediaArray.length; i++) {
      vSubDir = this.getMediaSubDir(pMediaArray[i]);
      vMediaFile = convertWikiMedia2File(pMediaArray[i]);
      vLocalID = vSubDir + "/" + vMediaFile
      //pWikiJSON[vMediaArray[i]] = vLocalID;
      pWikiJSON["media"][vLocalID] = pMediaArray[i];
    };

};
//----End of Method checkWikiJSON Definition


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
    var vLocalID = "";
    this.checkWikiJSON(pWikiJSON,"media");
    for (var i = 0; i < pMediaArray.length; i++) {
      vSubDir = this.getMediaSubDir(pMediaArray[i]);
      vMediaFile = this.convertWikiMedia2File(pMediaArray[i]);
      vLocalID = vSubDir + "/" + vMediaFile
      //pWikiJSON[vMediaArray[i]] = vLocalID;
      pWikiJSON["media"][vLocalID] = pMediaArray[i];
    };

};
//----End of Method getMediaSubDir Definition


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

    var vMediaArray = this.parseWiki4Media(pContent);
    this.createMediaWikiJSON(vMediaArray,pWikiJSON);
    this.downloadWikiMedia(vMediaArray);
    pContent = convertMediaLink4Wiki(pContent,vMediaArray);
    pContent = replaceWikiLinks(pContent,pWikiJSON);
    return pContent;

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
      this.downloadkMediaFile(pMediaArray[i]);
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

Wiki2HTML.prototype.convertMediaLink4Wiki = function (pContent,pMediaArray) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertMediaLink4Wiki(pContent:String,pMediaArray:Array):String");
  // alert("js/wiki2html.js - Call: convertMediaLink4Wiki(pContent:String,pMediaArray:Array):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertMediaLink4Wiki(pContent,pMediaArray);
  //-------------------------------------------------------

    var vReplaceLink;
    var vMediaFile;
    var vSubDir;
  
    pWikiText = pWikiText.replace(/\[(File|Image|Datei):/gi,"[File:");
  
    for (var i = 0; i < pMediaArray.length; i++) {
      vSubDir = this.getMediaSubDir(pMediaArray[i]);
      vMediaFile = this.convertWikiMedia2File(pMediaArray[i]);
      vReplaceLink = vSubDir + "/" + vMediaFile;
      pWikiText = this.replaceString(pWikiText,"File:"+pMediaArray[i],"File:"+vReplaceLink);
    };
    return pWikiText;

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
      {
    	//alert("cstring.js - replaceString() "+pString);
    		var vHelpString = '';
        var vN = pString.indexOf(pSearch);
    		var vReturnString = '';
    		while (vN >= 0)
    		{
    			if (vN > 0)
    				vReturnString += pString.substring(0, vN);
    			vReturnString += pReplace;
                if (vN + pSearch.length < pString.length) {
    				pString = pString.substring(vN+pSearch.length, pString.length);
    			} else {
    				pString = ''
    			}
    			vN = pString.indexOf(pSearch);
    		};
    	};
    	return vReturnString + pString;

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
//#    pWikiText:String
//#    pWikiJSON:Hash
//# Comment:
//#    Comment for replaceWikiLinks
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.replaceWikiLinks = function (pWikiText,pWikiJSON) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: replaceWikiLinks(pWikiText:String,pWikiJSON:Hash):String");
  // alert("js/wiki2html.js - Call: replaceWikiLinks(pWikiText:String,pWikiJSON:Hash):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.replaceWikiLinks(pWikiText,pWikiJSON);
  //-------------------------------------------------------

    var vLinkArray = this.getWikiLinks(pWikiText);
    var vURL,Title,vLink,vLocalLink;
    var vPipePos = 0;
    this.checkWikiJSON(pWikiJSON,"links");
    for (var i = 0; i < vLinkArray.length; i++) {
      vLink = vLinkArray[i];
      vPipePos = vLink.indexOf("|");
      if (vPipePos>0) {
        vURL = vLink.substr(0,vPipePos);
        vTitle = vLink.substr(vPipePos+1,vLink.length);
      } else {
        vURL = vLink;
        vTitle = vLink;
      };
      vURL = this.getWikiDisplayURL(vURL);
      vLocalLink = vURL+" "+vTitle;
      pWikiText = this.replaceString(pWikiText,"[["+vLink+"]]","["+vLocalLink+"]");
      // for reverse replacement to online Wikipedia or Wikiversity store replacement in WikiJSON
      pWikiJSON["links"][vLocalLink] = "["+vLink+"]";
    };
    return pWikiText

};
//----End of Method replaceWikiLinks Definition


//#################################################################
//# PUBLIC Method: getWikiLinks()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiText:String
//# Comment:
//#    getWikiLinks(pWikiText) extract Double-Bracket [[...]] link in pWikiText
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.getWikiLinks = function (pWikiText) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: getWikiLinks(pWikiText:String):String");
  // alert("js/wiki2html.js - Call: getWikiLinks(pWikiText:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.getWikiLinks(pWikiText);
  //-------------------------------------------------------

    // Wiki Links are open with ""
    var vLinkArray = [];
    //var vSearch = /\[(File|Datei|Image):([^\|]*)/;
    var vSearch = /\[\[([^\[\]\:]+)\]\]/g;
    // \[\[         # "[["
    //(             # group 1
    //  [^\[\]]+    #   any character except "[" and "]" ":" at least once
    // )            # end group 1 - this will be the image's name
    // \]\]         # "]]"
    var vResult;
    var vCount =0;
    while (vResult = vSearch.exec(pWikiText)) {
      vCount++;
      vLinkArray.push(vResult[1]);
      console.log("Wiki-Link "+vCount+": '" + vResult[1] + "' found");
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
//#    convertMediaLink4WikiOnline(pWikiText,pMediaArray) converts Media Links to WikiMedia Commons 
//#    to a remote link for local files
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertMediaLink4WikiOnline = function (pContent,pMediaArray) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String");
  // alert("js/wiki2html.js - Call: convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertMediaLink4WikiOnline(pContent,pMediaArray);
  //-------------------------------------------------------

    var vReplaceLink;
    var vMediaFile;
    var vPathArray;
  
    pWikiText = pWikiText.replace(/\[(File|Image|Datei):/gi,"[File:");
  
    for (var i = 0; i < pMediaArray.length; i++) {
      vPathArray = (pMediaArray[i]).split("/");
      vMediaFile = vPathArray[vPathArray.length-1];
      var vFileSplit = vMediaFile.split("|");
      vMediaFile = vFileSplit[0];
      vReplaceLink = vMediaFile + "|mini|" + vMediaFile;
      pWikiText = this.replaceString(pWikiText,"File:"+pMediaArray[i],"File:"+vReplaceLink);
    };
    return pWikiText;

};
//----End of Method convertMediaLink4WikiOnline Definition


    
//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: Wiki2HTML
//-------------------------------------------
