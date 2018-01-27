//#################################################################
//# Javascript Class: WikiJSON2HTML()
//#       SuperClass:
//#   Class Filename: wiki2html.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               21.1.2018
//# last modifications    2018/01/21 9:54:13
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

  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/wiki2html.js"
//---------------------------------------------------------------------
//---Constructor of Class WikiJSON2HTML()
// Call the constructor for creating an instance of class WikiJSON2HTML
// by the following command in HTML-file that imports this class
// var vMyInstance = new WikiJSON2HTML();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of WikiJSON2HTML, use
// the attribute name with a leading "this." in the definition of method of WikiJSON2HTML, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'WikiJSON2HTML'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'WikiJSON2HTML' will be set by
// use the method's name and extend it with 'WikiJSON2HTML'.
//    WikiJSON2HTML.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

	// no superclass defined


function WikiJSON2HTML () {
	// no superclass defined

    //---------------------------------------------------------------------
    //---Attributes of Class "WikiJSON2HTML()"
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    //---Attributes of Class "Wiki2HTML()"
    //---------------------------------------------------------------------
    //---PUBLIC: aProjectDir (String): the attribute 'aProjectDir' stores in 'String' the relative path in the PanDoc root directory
    this.aWikiArticle = "Swarm_intelligence";
    //---PUBLIC: aProjectDir (String): the attribute 'aProjectDir' stores in 'String' the relative path in the PanDoc root directory
    this.aProjectDir = "demo/my_article";
    //---PUBLIC: aRemoteMedia (Boolean): the attribute 'aRemoteMedia' stores in 'Boolean' variable if the MediaLinks are stored in the local file system of referenced to remote Media Server
    this.aRemoteMedia = true;
    //---PUBLIC: aLanguage ID (String): defines the Language of the MediaWiki
    this.aLanguage = "en";
    //---PUBLIC: aDomain(String): defines the MediaWiki product of Wiki Foundation "wikiversity", "wikipedia", ..
    this.aDomain = "wikiversity";
    //---PUBLIC: aTOC stored the TOC Table of Contents parsed from the section structure of the Wiki/HMTL file
    this.aTOC = {"level":0,"header":"","sections":[]}
    //---PUBLIC: aServer is set with the init(pLanguage,pDomain) together with aLanguage and aDomain
    this.aServer = "https://en.wikiversity.org/wiki/";
    //---PUBLIC: aMediaPath is used for downloading the embedded image resp. the referencing the images in the HTML
    this.aMediaPath = "https://en.wikiversity.org/wiki/Special:Redirect/file/";
    //---PUBLIC: aWikiJSON is a Hash that collects the data while parsing the vWikiCode
    this.aWikiJSON = {};
    //---PUBLIC: aDefaultImageWidth is used if width of the image in not defined
    this.aDefaultImageWidth = 300;

    //---------------------------------------------------------------------
    //---Methods of Class "WikiJSON2HTML()"
    //---------------------------------------------------------------------
	//----PUBLIC Method: WikiJSON2HTML.parse(wikicode):String-----
	// parse()  Return: String
	//	parses the MediaWiki code in argument and returns a HTML string
	//----PUBLIC Method: WikiJSON2HTML.deleteCR(wikicode:String):String-----
	// deleteCR(wikicode)  Return: String
	//	deleteCR(wikicode) normalizes line breaks in order to have a common base string for all browsers.
	//	deleteCR() uses the MediaWiki source code `wikicode` from the parameter of the function and returns a HTML string
	//	after removing all CRs.
	//----PUBLIC Method: WikiJSON2HTML.headers(wikicode:String):String-----
	// headers(wikicode)  Return: String
	//	Convert all headers in Wiki source code
	//----PUBLIC Method: WikiJSON2HTML.horizontalRule(wikicode:String):String-----
	// horizontalRule(wikicode)  Return: String
	//	Convert the  horizontal rules in Wiki source code
	//----PUBLIC Method: WikiJSON2HTML.inlineElement(wikicode:String):String-----
	// inlineElement(wikicode)  Return: String
	//	Convert for inline elements of the Wiki source code
	//----PUBLIC Method: WikiJSON2HTML.list(wikicode:String):String-----
	// list(wikicode)  Return: String
	//	Convert orderd and unorderd list in the Wiki Source code
	//----PUBLIC Method: WikiJSON2HTML.table(wikicode:String):String-----
	// table(wikicode)  Return: String
	//	Convert the table from WikiSource code in HTML
	//----PUBLIC Method: WikiJSON2HTML.paragraph(wikicode:String):String-----
	// paragraph(wikicode)  Return: String
	//	Convert all paragraphs in the Wiki source code
	//----PUBLIC Method: WikiJSON2HTML.math2jax(wikicode:String,pFormat:String):String-----
	// math2jax(wikicode,pFormat)  Return: String
	//	Convert the MATH-tag to a MathJax compatible HTML enviroment dependent of the pFormat of the parameter of math2jax.
	//	pFormat = 'reveal' 'html' are possible formats
	//----PUBLIC Method: WikiJSON2HTML.toc(wikicode:String):String-----
	// toc(wikicode)  Return: String
	//	Convert the table of contents from Wiki source code into HTML



}
//-------------------------------------------------------------------------
//---END Constructor of Class "WikiJSON2HTML()"
//-------------------------------------------------------------------------

//
//#################################################################
//# PUBLIC Method: parse()
//#    used in Class: WikiJSON2HTML
//# Parameter:
//#    wikicode
//# Comment:
//#    parses the MediaWiki code in argument and returns a HTML string
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 9:54:13
//#################################################################

WikiJSON2HTML.prototype.parse = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: parse(wikicode):String");
  // alert("js/wiki2html.js - Call: parse(wikicode):String");
  //----Create Object/Instance of WikiJSON2HTML----
  //    var vMyInstance = new WikiJSON2HTML();
  //    vMyInstance.parse();
  //-------------------------------------------------------

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
//#    used in Class: WikiJSON2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    deleteCR(wikicode) normalizes line breaks in order to have a common base string for all browsers.
//#    deleteCR() uses the MediaWiki source code `wikicode` from the parameter of the function and returns a HTML string
//#    after removing all CRs.
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 9:54:13
//#################################################################

WikiJSON2HTML.prototype.deleteCR = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: deleteCR(wikicode:String):String");
  // alert("js/wiki2html.js - Call: deleteCR(wikicode:String):String");
  //----Create Object/Instance of WikiJSON2HTML----
  //    var vMyInstance = new WikiJSON2HTML();
  //    vMyInstance.deleteCR(wikicode);
  //-------------------------------------------------------

  wikicode = wikicode.replace(/\r/g, '');
  return wikicode;

};
//----End of Method deleteCR Definition


//#################################################################
//# PUBLIC Method: headers()
//#    used in Class: WikiJSON2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert all headers in Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 9:54:13
//#################################################################

WikiJSON2HTML.prototype.headers = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: headers(wikicode:String):String");
  // alert("js/wiki2html.js - Call: headers(wikicode:String):String");
  //----Create Object/Instance of WikiJSON2HTML----
  //    var vMyInstance = new WikiJSON2HTML();
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
//#    used in Class: WikiJSON2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert the  horizontal rules in Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 9:54:13
//#################################################################

WikiJSON2HTML.prototype.horizontalRule = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: horizontalRule(wikicode:String):String");
  // alert("js/wiki2html.js - Call: horizontalRule(wikicode:String):String");
  //----Create Object/Instance of WikiJSON2HTML----
  //    var vMyInstance = new WikiJSON2HTML();
  //    vMyInstance.horizontalRule(wikicode);
  //-------------------------------------------------------

  	var horizontalLine = /----/g;

  	wikicode = wikicode.replace(horizontalLine, '<hr>');

  	return wikicode;

};
//----End of Method horizontalRule Definition


//#################################################################
//# PUBLIC Method: inlineElement()
//#    used in Class: WikiJSON2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert for inline elements of the Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 9:54:13
//#################################################################

WikiJSON2HTML.prototype.inlineElement = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: inlineElement(wikicode:String):String");
  // alert("js/wiki2html.js - Call: inlineElement(wikicode:String):String");
  //----Create Object/Instance of WikiJSON2HTML----
  //    var vMyInstance = new WikiJSON2HTML();
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
//#    used in Class: WikiJSON2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert orderd and unorderd list in the Wiki Source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 9:54:13
//#################################################################

WikiJSON2HTML.prototype.list = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: list(wikicode:String):String");
  // alert("js/wiki2html.js - Call: list(wikicode:String):String");
  //----Create Object/Instance of WikiJSON2HTML----
  //    var vMyInstance = new WikiJSON2HTML();
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
//#    used in Class: WikiJSON2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert the table from WikiSource code in HTML
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 9:54:13
//#################################################################

WikiJSON2HTML.prototype.table = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: table(wikicode:String):String");
  // alert("js/wiki2html.js - Call: table(wikicode:String):String");
  //----Create Object/Instance of WikiJSON2HTML----
  //    var vMyInstance = new WikiJSON2HTML();
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
//#    used in Class: WikiJSON2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert all paragraphs in the Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 9:54:13
//#################################################################

WikiJSON2HTML.prototype.paragraph = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: paragraph(wikicode:String):String");
  // alert("js/wiki2html.js - Call: paragraph(wikicode:String):String");
  //----Create Object/Instance of WikiJSON2HTML----
  //    var vMyInstance = new WikiJSON2HTML();
  //    vMyInstance.paragraph(wikicode);
  //-------------------------------------------------------

  		var paragraph = /\n\n([^#\*=].*)/gm; //|\r\n\r\n([^#\*=].*)

  		wikicode = wikicode.replace(paragraph, "\n<p>$1</p>\n");

  		return wikicode;

};
//----End of Method paragraph Definition


//#################################################################
//# PUBLIC Method: math2jax()
//#    used in Class: WikiJSON2HTML
//# Parameter:
//#    wikicode:String
//#    pFormat:String
//# Comment:
//#    Convert the MATH-tag to a MathJax compatible HTML enviroment dependent of the pFormat of the parameter of math2jax.
//#    pFormat = 'reveal' 'html' are possible formats
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 9:54:13
//#################################################################

WikiJSON2HTML.prototype.math2jax = function (wikicode,pFormat) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: math2jax(wikicode:String,pFormat:String):String");
  // alert("js/wiki2html.js - Call: math2jax(wikicode:String,pFormat:String):String");
  //----Create Object/Instance of WikiJSON2HTML----
  //    var vMyInstance = new WikiJSON2HTML();
  //    vMyInstance.math2jax(wikicode,pFormat);
  //-------------------------------------------------------

   return wikicode;
};
//----End of Method math2jax Definition


//#################################################################
//# PUBLIC Method: toc()
//#    used in Class: WikiJSON2HTML
//# Parameter:
//#    wikicode:String
//# Comment:
//#    Convert the table of contents from Wiki source code into HTML
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 9:54:13
//#################################################################

WikiJSON2HTML.prototype.toc = function (wikicode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: toc(wikicode:String):String");
  // alert("js/wiki2html.js - Call: toc(wikicode:String):String");
  //----Create Object/Instance of WikiJSON2HTML----
  //    var vMyInstance = new WikiJSON2HTML();
  //    vMyInstance.toc(wikicode);
  //-------------------------------------------------------

  	var toc = /^__TOC__/g;

  	wikicode = wikicode.replace(toc, '');

  	return wikicode;

};
//----End of Method toc Definition



//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: WikiJSON2HTML
//-------------------------------------------
