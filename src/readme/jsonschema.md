<!-- BEGIN: src/readme/jsonschema.md -->

## JSON2Schema for JSON Editor
The user interface of the JSON Editor (https://www.github.com/niebert/json-editor) is defined by a JSON schema. JSON Editor takes a JSON Schema and uses it to generate an HTML form.  
It has full support for JSON Schema version 3 and 4 and can integrate with several popular CSS frameworks (bootstrap, foundation, and jQueryUI).

Check out an interactive demo (demo.html):  

https://json-editor.github.io/json-editor/

JSON Editor has no dependencies. It only needs a modern browser (tested in Chrome and Firefox).

### Optional Requirements

The following are not required, but can improve the style and usability of JSON Editor when present.

*  A compatible JS template engine (Mustache, Underscore, Hogan, Handlebars, Swig, Markup, or EJS)
*  A compatible CSS framework for styling (bootstrap 2/3, foundation 3/4/5, or jqueryui)
*  A compatible icon library (bootstrap 2/3 glyphicons, foundation icons 2/3, jqueryui, or font awesome 3/4)
*  [SCEditor](http://www.sceditor.com/) for WYSIWYG editing of HTML or BBCode content
*  [SimpleMDE](https://simplemde.com/) for editing of Markdown content
*  [Ace Editor](http://ace.c9.io/) for editing code
*  [Select2](http://ivaynberg.github.io/select2/) for nicer Select boxes
*  [Selectize](https://selectize.github.io/selectize.js/) for nicer Select & Array boxes
*  [math.js](http://mathjs.org/) for more accurate floating point math (multipleOf, divisibleBy, etc.)

If you learn best by example, check these out to understand the basic prinples of using a JSON editor:

*  Basic Usage Example - http://rawgithub.com/jdorn/json-editor/master/examples/basic.html
*  Advanced Usage Example - http://rawgithub.com/jdorn/json-editor/master/examples/advanced.html
*  CSS Integration Example - http://rawgithub.com/jdorn/json-editor/master/examples/css_integration.html

If you want to alter the provided example of https://___PKG_GITHUBUSER___.github.io/___PKG_EXPORTVAR___ just make a copy of the `docs/`-folder in this repository `___PKG_EXPORTVAR___` and adapt the JSON-schema `docs/schema` and the JSON data in the folder `docs/db/` to the schema for your requirements. If you want to create your own JSON schema use the [JSON2Schema tool](https://niebert/github.io/JSON2Schema).
<!-- END:   src/readme/jsonschema.md -->
