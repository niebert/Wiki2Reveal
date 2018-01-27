//#################################################################
//# Javascript Class: TemplateEngine()
//#       SuperClass:
//#   Class Filename: templateengine.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               24.1.2018
//# last modifications    2018/01/24 10:41:40
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

// require("handlebars");

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/templateengine.js"
//---------------------------------------------------------------------
//---Constructor of Class TemplateEngine()
// Call the constructor for creating an instance of class TemplateEngine
// by the following command in HTML-file that imports this class
// var vMyInstance = new TemplateEngine();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of TemplateEngine, use
// the attribute name with a leading "this." in the definition of method of TemplateEngine, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'TemplateEngine'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'TemplateEngine' will be set by
// use the method's name and extend it with 'TemplateEngine'.
//    TemplateEngine.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

// no superclass defined


function TemplateEngine () {
	// no superclass defined

    //---------------------------------------------------------------------
    //---Attributes of Class "TemplateEngine()"
    //---------------------------------------------------------------------

    //---------------------------------------------------------------------
    //---Methods of Class "TemplateEngine()"
    //---------------------------------------------------------------------
	//----PUBLIC Method: TemplateEngine.section(pData:Hash):String-----
	// section(pData)  Return: String
	//	Comment for section
	//----PUBLIC Method: TemplateEngine.url(pData:Hash):String-----
	// url(pData)  Return: String
	//	Comment for url
	//----PUBLIC Method: TemplateEngine.table(pData:Hash):String-----
	// table(pData)  Return: String
	//	Comment for table
	//----PUBLIC Method: TemplateEngine.math(pData:Hash):String-----
	// math(pData)  Return: String
	//	Comment for math
	//----PUBLIC Method: TemplateEngine.horizontal_line(pData:Hash):String-----
	// horizontal_line(pData)  Return: String
	//	Comment for horizontal_line
	//----PUBLIC Method: TemplateEngine.images(pData:Hash):String-----
	// images(pData)  Return: String
	//	Comment for images
	//----PUBLIC Method: TemplateEngine.inline_elements(pData:Hash):String-----
	// inline_elements(pData)  Return: String
	//	Comment for inline_elements
	//----PUBLIC Method: TemplateEngine.toc(pData:Hash):String-----
	// toc(pData)  Return: String
	//	Comment for toc
	//----PUBLIC Method: TemplateEngine.init(pTplHash:Hash)-----
	// init(pTplHash)
	//	Init the template engine with a template hash. And create the replace functions of the Class TemplateEngine dynamically.
	//	Overwrite the defined methods like 'sections(pData)'



}
//-------------------------------------------------------------------------
//---END Constructor of Class "TemplateEngine()"
//-------------------------------------------------------------------------


//#################################################################
//# PUBLIC Method: init()
//#    used in Class: TemplateEngine
//# Parameter:
//#    pTplHash:Hash
//# Comment:
//#    Init the template engine with a template hash. And create the replace functions of the Class TemplateEngine dynamically.
//#    Overwrite the defined methods like 'sections(pData)'
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/24 10:41:40
//#################################################################

TemplateEngine.prototype.init = function (pTplHash) {
  //----Debugging------------------------------------------
  // console.log("js/templateengine.js - Call: init(pTplHash:Hash)");
  // alert("js/templateengine.js - Call: init(pTplHash:Hash)");
  //----Create Object/Instance of TemplateEngine----
  //    var vMyInstance = new TemplateEngine();
  //    vMyInstance.init(pTplHash);
  //-------------------------------------------------------

  // Code for init
  this.aTplHash = pTplHash;

  for (var vKey in pTplHash) {
    if (pTplHash.hasOwnProperty(vKey)) {
      // with vKey = "sections" the replacement can be called vTplEngine.sections(pContextHash)
      this[vKey] = Handlebars.compile(pTplHash[vKey]);
    }
  };

};
//----End of Method init Definition


//#################################################################
//# PUBLIC Method: add_template()
//#    used in Class: TemplateEngine
//# Parameter:
//#    pID:String
//#    pTemplate:String
//# Comment:
//#    add_template(pID:String,pTemplate:String) adds a template compiler with Handlebars to the methods of the template engine.
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/24 10:51:07
//#################################################################

TemplateEngine.prototype.add_template = function (pID,pTemplate) {
  //----Debugging------------------------------------------
  // console.log("js/templateengine.js - Call: add_template(pID:String,pTemplate:String)");
  // alert("js/templateengine.js - Call: add_template(pID:String,pTemplate:String)");
  //----Create Object/Instance of TemplateEngine----
  //    var vMyInstance = new TemplateEngine();
  //    vMyInstance.add_template(pID,pTemplate);
  //-------------------------------------------------------

  // with pID = "sections" the replacement can be called vTplEngine.sections(pContextHash)
  this[pID] = Handlebars.compile(pTemplate);
};
//----End of Method add_template Definition


//#################################################################
//# PUBLIC Method: section()
//#    used in Class: TemplateEngine
//# Parameter:
//#    pData:Hash
//# Comment:
//#    Comment for section
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/24 10:41:40
//#################################################################

TemplateEngine.prototype.section = function (pData) {
  //----Debugging------------------------------------------
  // console.log("js/templateengine.js - Call: section(pData:Hash):String");
  // alert("js/templateengine.js - Call: section(pData:Hash):String");
  //----Create Object/Instance of TemplateEngine----
  //    var vMyInstance = new TemplateEngine();
  //    vMyInstance.section(pData);
  //-------------------------------------------------------

  //----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method section Definition


//#################################################################
//# PUBLIC Method: url()
//#    used in Class: TemplateEngine
//# Parameter:
//#    pData:Hash
//# Comment:
//#    Comment for url
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/24 10:41:40
//#################################################################

TemplateEngine.prototype.url = function (pData) {
  //----Debugging------------------------------------------
  // console.log("js/templateengine.js - Call: url(pData:Hash):String");
  // alert("js/templateengine.js - Call: url(pData:Hash):String");
  //----Create Object/Instance of TemplateEngine----
  //    var vMyInstance = new TemplateEngine();
  //    vMyInstance.url(pData);
  //-------------------------------------------------------

  //----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method url Definition


//#################################################################
//# PUBLIC Method: table()
//#    used in Class: TemplateEngine
//# Parameter:
//#    pData:Hash
//# Comment:
//#    Comment for table
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/24 10:41:40
//#################################################################

TemplateEngine.prototype.table = function (pData) {
  //----Debugging------------------------------------------
  // console.log("js/templateengine.js - Call: table(pData:Hash):String");
  // alert("js/templateengine.js - Call: table(pData:Hash):String");
  //----Create Object/Instance of TemplateEngine----
  //    var vMyInstance = new TemplateEngine();
  //    vMyInstance.table(pData);
  //-------------------------------------------------------

  //----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method table Definition


//#################################################################
//# PUBLIC Method: math()
//#    used in Class: TemplateEngine
//# Parameter:
//#    pData:Hash
//# Comment:
//#    Comment for math
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/24 10:41:40
//#################################################################

TemplateEngine.prototype.math = function (pData) {
  //----Debugging------------------------------------------
  // console.log("js/templateengine.js - Call: math(pData:Hash):String");
  // alert("js/templateengine.js - Call: math(pData:Hash):String");
  //----Create Object/Instance of TemplateEngine----
  //    var vMyInstance = new TemplateEngine();
  //    vMyInstance.math(pData);
  //-------------------------------------------------------

  //----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method math Definition


//#################################################################
//# PUBLIC Method: horizontal_line()
//#    used in Class: TemplateEngine
//# Parameter:
//#    pData:Hash
//# Comment:
//#    Comment for horizontal_line
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/24 10:41:40
//#################################################################

TemplateEngine.prototype.horizontal_line = function (pData) {
  //----Debugging------------------------------------------
  // console.log("js/templateengine.js - Call: horizontal_line(pData:Hash):String");
  // alert("js/templateengine.js - Call: horizontal_line(pData:Hash):String");
  //----Create Object/Instance of TemplateEngine----
  //    var vMyInstance = new TemplateEngine();
  //    vMyInstance.horizontal_line(pData);
  //-------------------------------------------------------

  //----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method horizontal_line Definition


//#################################################################
//# PUBLIC Method: images()
//#    used in Class: TemplateEngine
//# Parameter:
//#    pData:Hash
//# Comment:
//#    Comment for images
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/24 10:41:40
//#################################################################

TemplateEngine.prototype.images = function (pData) {
  //----Debugging------------------------------------------
  // console.log("js/templateengine.js - Call: images(pData:Hash):String");
  // alert("js/templateengine.js - Call: images(pData:Hash):String");
  //----Create Object/Instance of TemplateEngine----
  //    var vMyInstance = new TemplateEngine();
  //    vMyInstance.images(pData);
  //-------------------------------------------------------

  //----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method images Definition


//#################################################################
//# PUBLIC Method: inline_elements()
//#    used in Class: TemplateEngine
//# Parameter:
//#    pData:Hash
//# Comment:
//#    Comment for inline_elements
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/24 10:41:40
//#################################################################

TemplateEngine.prototype.inline_elements = function (pData) {
  //----Debugging------------------------------------------
  // console.log("js/templateengine.js - Call: inline_elements(pData:Hash):String");
  // alert("js/templateengine.js - Call: inline_elements(pData:Hash):String");
  //----Create Object/Instance of TemplateEngine----
  //    var vMyInstance = new TemplateEngine();
  //    vMyInstance.inline_elements(pData);
  //-------------------------------------------------------

  //----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method inline_elements Definition


//#################################################################
//# PUBLIC Method: toc()
//#    used in Class: TemplateEngine
//# Parameter:
//#    pData:Hash
//# Comment:
//#    Comment for toc
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/24 10:41:40
//#################################################################

TemplateEngine.prototype.toc = function (pData) {
  //----Debugging------------------------------------------
  // console.log("js/templateengine.js - Call: toc(pData:Hash):String");
  // alert("js/templateengine.js - Call: toc(pData:Hash):String");
  //----Create Object/Instance of TemplateEngine----
  //    var vMyInstance = new TemplateEngine();
  //    vMyInstance.toc(pData);
  //-------------------------------------------------------

  //----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method toc Definition




//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: TemplateEngine
//-------------------------------------------
