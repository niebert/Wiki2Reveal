
## Technical Background for Developers
The following sections explains the technical backgroud of the package `LoadFile4DOM` for developers, who want to fork and extend the module.

### Main File for Editing
The main file for editing is `src/loadfile4dom.js`.
Run `npm run build` will create 
* `dist/loadfile4dom.js`
* `dist/loadfile4dom.min.js`
* `docs/js/loadfile4dom.js`
* `README.md` from sources in `src/readme`

### Create a DOM Node
LoadFile4DOM will inject a file loader tag into the DOM (Document Object Model) of the browser to create a load menu similar to upload feature of web sites. The same feature will be used to load data into the browser without submitting the data to a server.

## Use JSDOM (NPM package `jdsom`)
The module `loadfile4dom` is designed to be used in a browser to create a dialog for loading a file into the browser (same as upload dialog, but here not uploading to server but upload the file JUST INTO the browser locally). This is necessary to create a privacy friendly webbased application that
* needs not installation, just the browser on the client computer and
* performs a certain task on a file (e.g. convert the file into another format).
In general the module `loadfile4dom` will be used in conjunction with the module `file-saver` to save the file e.g with a dialog back to the file system of the client computer or just like downloading a file in the `Download` folder of your local computer.

Both modules `loadfile4dom` and `file-saver` are designed in way that the processed file will **[not leave your computer](https://en.wikiversity.org/wiki/AppLSAC)** for processing. It stays in the browser.

### Testing with JSDOM
`jsdom` is a pure-JavaScript implementation of the DOM (Document Object Modell) and of many web standards:
* [DOM](https://dom.spec.whatwg.org/) and
* [HTML](https://html.spec.whatwg.org/multipage/)

In the module `loadfile4dom` DOM nodes are create dynamically to create an `<input>`-tag for the upload file dialog of browsers.
This used especially a method of the `document` object (i.e. `document.createElement('input')`). This method `createElement(...)` is not available in  Node.js. `jsdom` provides an emulation all relevant methods in Node.js for testing of the module for later use in a web browser.

### Create JSDOM Constructor

The following code is used in the
```js
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
```

To use jsdom, you will primarily use the `JSDOM` constructor, which is a named export of the jsdom main module. Pass the constructor a string. You will get back a `JSDOM` object, which has a number of useful properties, notably `window`:

```js
const dom = new JSDOM(`<!DOCTYPE html>
<html>
  <body>
    <p id="hello">Hello world</p>
    <div id="id4loadfile" style="display:none"></div>
  <body>
</html>`);
var doc = dom.window.document;
var body = doc.querySelector("body")
var d = doc.getElementById("id4loadfile"); // "Hello world"
d.innerHTML("insert the injected HTML code here")
```

`JSDOM` will parse the HTML like a browser does and create a DOM tree according to the nested nodes `<head>`, `<body>` or any  `<div>` tags..

The resulting object is an instance of the `JSDOM` class, which contains a number of useful properties and methods besides `window`. In this case we inject the `<input type="file" ...>` tag in the hidden `<div ...>` node with the ID `id4loadfile`. `LoadFile4DOM` will append `<div ...>` node with a random non-existing ID at the end of the body. Testing the `LoadFile4DOM` implementation will create the tags in the `JSDOM` from the "outside", and later the test script `test.js` will output the HTML code of the emulated DOM with a `console.log()` call to check if the implementation works as expected.

### Adding more Test Cases
For testing the `LoadFile4DOM` implementation we will just need the methods of the `document` object to create DOM elements. For adding more test cases in `test.js` it might be helpful to use also the following calls of the constructor
```js
const { window } = new JSDOM(`...`);
// or even
const { document } = (new JSDOM(`...`)).window;
```

## Technical Background for `LoadFile4DOM`
The library `LoadFile4DOM` creates a holder `div` element which contains all  `<input type="file" ...>` for all types of loaders in the HTML page (e.g. loaders for images, text files, ZIP files, ...) different types of files need different types of load handlers (e.g. a canvas, a textarea or a JSZip instance)

### Initialize LoadFile4DOM with JavaScript
Setting an attribute without value with JavaScript can be performed with:
```javascript
var body = document.getElementsByTagName('body')[0];
body.setAttribute("onload","vLoadFile4DOM.onload()");
```

### Setting Attributes
### With JavaScript
Setting an attribute without value with JavaScript can be performed with:
```javascript
// Before <input id="dialogtext" type="button">
var node = document.getElementsById('dialogtxt');
node.setAttribute("type","file");
// After <input id="dialogtext" type="file">
```
### With JQuery
Setting the attribute is performed e.g. after an `<input>` element was created and the required attributes must be set
```javascript
$('#dialogtxt').attr('type','file');
```
This results in an input tag with  `<input type="file">`

## Hook up Event Listener
The `<input type="file" ...>` tag need an event listener, that is called when the a file was uploaded. The event listeners are hooked to the DOM node with JavaScript or JQuery.

### Event listener with JavaScript
The event listen is called on file selected:
```
// Hook up the submit button to log to the console
document.getElementById('submit').addEventListener('click',function(evt) {
  // insert your code here
})  
```
The event handler gets the event object `evt` as parameter.

### Event listener with JQuery
The event listen is called on file selected:
```
// Hook up the submit button to log to the console
$('#submit').on('click',function(evt) {
  // insert your code here
})  
```
The event handler gets the event object `evt` as parameter.

### Create Click Event of Loader
In the module `LoadFile4DOM` the input nodes `<input type="file" ...>` are child nodes of in the `div`-node holder in which all created loaders appended in the DOM with a `create_load_dialog()` call. JavaScript can create a `click` event for the button with.

#### with Javascript
The click event is created with JavaScript because the `<input type="file" ...>` element in the DOM is hidden, which will store the reference to the uploaded file.
```javascript
document.getElementById('loader4json').click();
```
#### with Jquery
The click event can also be generated via JQuery for the hidden
```javascript
$('#loader4json').trigger("click");
```


Full documentation on everything you can do with the `JSDOM` class is below, in the section "`JSDOM` Object API" on [GitHub](https://github.com/jsdom/jsdom).
