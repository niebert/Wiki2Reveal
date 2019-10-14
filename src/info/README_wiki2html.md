## Javascript Class: Wiki2HTML
created Javascript Class Creator JSCC 2018/01/21 9:24:24
https://niebert.github.io/JavascriptClassCreator
File: js/wiki2html.js

### Attributes: Wiki2HTML

### Methods: Wiki2HTML

#### parse(wikicode):String
* Return Type: :String
* Visibility: public
parses the MediaWiki code in argument and returns a HTML string):String 

#### deleteCR(wikicode:String):String
* Return Type: :String
* Visibility: public
deleteCR(wikicode) normalizes line breaks in order to have a common base string for all browsers.
deleteCR() uses the MediaWiki source code `wikicode` from the parameter of the function and returns a HTML string 
after removing all CRs.):String 

#### headers(wikicode:String):String
* Return Type: :String
* Visibility: public
Convert all headers in Wiki source code):String 

#### horizontalRule(wikicode:String):String
* Return Type: :String
* Visibility: public
Convert the  horizontal rules in Wiki source code):String 

#### inlineElement(wikicode:String):String
* Return Type: :String
* Visibility: public
Convert for inline elements of the Wiki source code):String 

#### list(wikicode:String):String
* Return Type: :String
* Visibility: public
Convert orderd and unorderd list in the Wiki Source code):String 

#### table(wikicode:String):String
* Return Type: :String
* Visibility: public
Convert the table from WikiSource code in HTML):String 

#### paragraph(wikicode:String):String
* Return Type: :String
* Visibility: public
Convert all paragraphs in the Wiki source code):String 

#### math2jax(wikicode:String,pFormat:String):String
* Return Type: :String
* Visibility: public
Convert the MATH-tag to a MathJax compatible HTML enviroment dependent of the pFormat of the parameter of math2jax.
pFormat = 'reveal' 'html' are possible formats):String 

#### toc(wikicode:String):String
* Return Type: :String
* Visibility: public
Convert the table of contents from Wiki source code into HTML):String 