//#################################################################
//# Javascript Class: WikiConverter()
//#       SuperClass:
//#   Class Filename: wikiconverter.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               23.10.2017
//# last modifications    2017/10/26 17:47:09
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/wikiconverter.js"
//---------------------------------------------------------------------
//---Constructor of Class WikiConverter()
// Call the constructor for creating an instance of class WikiConverter
// by the following command in HTML-file that imports this class
// var vMyInstance = new WikiConverter();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of WikiConverter, use
// the attribute name with a leading "this." in the definition of method of WikiConverter, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'WikiConverter'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'WikiConverter' will be set by
// use the method's name and extend it with 'WikiConverter'.
//    WikiConverter.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

	// no superclass defined


function WikiConverter () {
	// no superclass defined

    //---------------------------------------------------------------------
    //---Attributes of Class "WikiConverter()"
    //---------------------------------------------------------------------
	//---PUBLIC: aInput (String): Input Text for the Converter
	this.aInput = "";
	//---PUBLIC: aOutput (String): Output Text for the Converter
	this.aOutput = "";

    //---------------------------------------------------------------------
    //---Methods of Class "WikiConverter()"
    //---------------------------------------------------------------------
	//----PUBLIC Method: WikiConverter.setInput(pText:String)-----
	// setInput(pText)
	//	Comment for setInput
	//----PUBLIC Method: WikiConverter.getOutput():String-----
	// getOutput()  Return: String
	//	Comment for getOutput
	//----PUBLIC Method: WikiConverter.compile()-----
	// compile()
	//	Compiles the text in aInput into aOutput



}
//-------------------------------------------------------------------------
//---END Constructor of Class "WikiConverter()"
//-------------------------------------------------------------------------

//
//#################################################################
//# PUBLIC Method: setInput()
//#    used in Class: WikiConverter
//# Parameter:
//#    pText:String
//# Comment:
//#    Comment for setInput
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/10/26 17:47:09
//#################################################################

WikiConverter.prototype.setInput = function (pText) {
  //----Debugging------------------------------------------
  // console.log("js/wikiconverter.js - Call: setInput(pText:String)");
  // alert("js/wikiconverter.js - Call: setInput(pText:String)");
  //----Create Object/Instance of WikiConverter----
  //    var vMyInstance = new WikiConverter();
  //    vMyInstance.setInput(pText);
  //-------------------------------------------------------

  //----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method setInput Definition


//#################################################################
//# PUBLIC Method: getOutput()
//#    used in Class: WikiConverter
//# Parameter:
//#
//# Comment:
//#    Comment for getOutput
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/10/26 17:47:09
//#################################################################

WikiConverter.prototype.getOutput = function () {
  //----Debugging------------------------------------------
  // console.log("js/wikiconverter.js - Call: getOutput():String");
  // alert("js/wikiconverter.js - Call: getOutput():String");
  //----Create Object/Instance of WikiConverter----
  //    var vMyInstance = new WikiConverter();
  //    vMyInstance.getOutput();
  //-------------------------------------------------------

  return this.aOutput

};
//----End of Method getOutput Definition


//#################################################################
//# PUBLIC Method: compile()
//#    used in Class: WikiConverter
//# Parameter:
//#
//# Comment:
//#    Compiles the text in aInput into aOutput
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/10/26 17:47:09
//#################################################################

WikiConverter.prototype.compile = function () {
  //----Debugging------------------------------------------
  // console.log("js/wikiconverter.js - Call: compile()");
  // alert("js/wikiconverter.js - Call: compile()");
  //----Create Object/Instance of WikiConverter----
  //    var vMyInstance = new WikiConverter();
  //    vMyInstance.compile();
  //-------------------------------------------------------

  this.aOutput = this.aInput;
  // this dummy compile does nothing but copying input to output, classes will overwrite this method,

};
//----End of Method compile Definition



//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: WikiConverter
//-------------------------------------------
