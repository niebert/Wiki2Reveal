# Wiki2Reveal
Convert a MediaWiki source document e.g. in Wikiversity into a Reveal Presentation. The main challenges is the cross-origine call to retrieve the wiki source text of an article in the MediaWiki. Transcoding of the wiki syntax to other formats like [PanDoc](https://pandoc.org/try)

***Table of Contents***
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Call of MediaWiki API](#call-of-mediawiki-api)
- [Images Download wget](#images-download-wget)
- [Retrieve MediaWiki Content in a Browser](#retrieve-mediawiki-content-in-a-browser)
  - [NodeJS Module: nodemw](#nodejs-module-nodemw)
  - [Alternative Javascript MediaWiki libraries](#alternative-javascript-mediawiki-libraries)
  - [Generate an AJAX Call in HTML5 Environment](#generate-an-ajax-call-in-html5-environment)
- [Browserify and Watchify](#browserify-and-watchify)
  - [Global Installation of Browserify, Watchify, UglifyJS and DocToc](#global-installation-of-browserify-watchify-uglifyjs-and-doctoc)
  - [Package Installation of Browserify and Watchify - Alternative](#package-installation-of-browserify-and-watchify---alternative)
  - [Start Watching the Files with Watchify](#start-watching-the-files-with-watchify)
- [Main Library for Handling Testing Wiki2Reveal](#main-library-for-handling-testing-wiki2reveal)
- [Use Tools for the repository](#use-tools-for-the-repository)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Call of MediaWiki API
The following URL is an example call for retrieving the source of an MediaWiki article:

 http://en.wikiversity.org/w/index.php?title=Swarm_intelligence&action=raw

The call retrieves the article about `Swarm intelligence` from the english  Wikiversity.

* The abbreviation `en` is the language
* `wikiversity.org` defines the Wiki product by the domain name. This can be replaced e.g. by `wikipedia.org`, to download the corresponding article in Wikipedia instead of the learning resource in Wikiversity.
* addessing the API is performed by  `/w/index.php`. To read the corresponding article in the browser the users will use the URL
 https://en.wikiversity.org/wiki/Swarm_intelligence
* The API call above has to parameters with key-value pairs.
  * `title=Swarm_intelligence` for the definition of the title
  * `action=raw` to get the raw sources of the article in the Wiki syntax

## Images Download wget

* The link `https://en.wikipedia.org/wiki/Special:Redirect/file/Annweiler_Rathaus.JPG` refers to the current version of the image `Annweiler_Rathaus.JPG`.
* Size of image can be determined by `http://en.wikipedia.org/wiki/Special:FilePath/Annweiler_Rathaus.JPG?width=300` (here resize the width to 300 pixels.


## Retrieve MediaWiki Content in a Browser
The following approaches have be tested and compared. So that other programmers can follow the decision making process for designing the module for retrieving MediaWiki content in  a `browserified` library and convert PanDocElectron in pure browser application. See [Alternative MediaWiki Parsers](https://www.mediawiki.org/wiki/Alternative_parsers) for other programming languages as well.

### NodeJS Module: nodemw
Node module `nodemw` is able to handle MediaWiki calls as shown in [PanDocElectron](https://en.wikiversity.org/wiki/PanDocElectron). Seems to be a good solution, but `nodemw` has the `fs` module as dependencies and browsers cannot write to the local file system in comparison to `NodeJS` applications.
* Look at `browser-filesystem` or `browser-fs` as replacement in JS-file `src/api.js` and `src/bot.js`.
* remove dependencies to `fs` and check the use of `fs` in the `winston` logger
* check if `request` module can be browserified (DONE with `npm run buildrequest`) and check the browserified module `dist/request4browser.js`.
The objective here is, to transform the NodeJS modules `nodemw` so that `src/api.js` and `src/bot.js` run in browser.

See the following modules:
* ***[browserify-fs](https://github.com/mafintosh/browserify-fs)***  to replace `fs` by `browserify-fs`.

### Alternative Javascript MediaWiki libraries
* ***[wtf_wikipedia](https://github.com/spencermountain/wtf_wikipedia)*** extracts citations, images, ... from the MediaWiki, helpful to access meta information for PanDoc processing in a browser. Downside switching to other Wikis than Wikipedia is not well documented (code analysis necessary). API should be documented, so that is runs with any MediaWiki server (even local) for Page retrieval from the server to the browser client.
* ***[wikipedia.js](http://okfnlabs.org/wikipediajs/)*** developed by the [Open Knowledge Foundation](https://okfn.org/). Constraints of building on this libraries are similar to `[wtf_wikipedia](https://github.com/spencermountain/wtf_wikipedia)` because it only return the first part of the Wikipedia source file, due to size limitation of the call back `JSON`. Furthermore it is dependent on [DBpedia](http://wiki.dbpedia.org/) request. Check if the library can work with arbitrary servers (even local MediaWiki installation) cross origin.
* ***[wiki2html.js]()***
Used the non-working example on http://download.remysharp.com/wiki2html.html as a starting point and created a test HTML in `test/wiki2html.html` to check the features in a sandbox. It converts some markup syntax but especially links are not parsed properly. Adaptation of regular expressions is necessary.

### Generate an AJAX Call in HTML5 Environment
* use JQuery for AJAX call
* size limitation of retrieved data existing libraries seem to support for the very beginning of the Wiki article due to the limited size of the returned JSON. The used module needs violates the cross-origin policy when you call AJAX from a different server on which the MediaWiki is installed. So it cannot be used directly and workload for programming seems to be very time consuming decision.

```
$.ajax({
        // request type ( GET or POST )
	type: "GET",

        // the URL to which the request is sent
    // http://en.wikiversity.org/w/index.php?title=Swarm_intelligence&action=raw
	url:  "http://en.wikiversity.org/w/index.php",

        // data to be sent to the server
	//data: { action:'query', format:'json', lgname:'foo', lgpassword:'foobar' },
  data: { action:'raw',title:'Swarm_intelligence' },

        // The type of data that you're expecting back from the server
        // e.g. 'json','text','script','html','xml',...
        dataType: 'text',

        // Function to be called if the request succeeds
	success: function( jsondata ){
		alert( jsondata.result );
	}
});
```
### WikiDownloader
`wtf_wikipedia.js` seems to be the an appropriate library to download the MediaWiki markup source from any Wiki Product from the Wiki Foundation:

#### Download Example HTML
The following in example is stored in `test/wtf_wikipedia.html` that uses the library `test/js/wtf_wikipedia.js`.
```html
<html>
  <head>
    <title>wtf_wikipedia</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script src="js/wtf_wikipedia.js"></script>
  </head>
  <body style="margin:10px;">
    <script>
      wtf.from_api("Swarm intelligence", "enwikiversity", function(markup){// Callback function after success
        console.log("LOG (PlainText result): "+wtf.plaintext(markup));
        // store result in textarea
        document.getElementById("wikimarkup").value = markup;
      })
    </script>
    <b>Download Wiki-Markup:</b></br>
    <textarea id="wikimarkup" rows="35" cols="120">
    </textarea>
  </body>
</html>
```

## Browserify and Watchify
Browserify and Watchify are used in this repository to control the WebApp-javascript development with the required Javascript libraries installed with [NPM Node.js](https://docs.npmjs.com/getting-started/installing-node) and similar framework world that greatly improve your javascript workflow: Using them, you no longer need to micro-manage your script tags but instead you just declare the libraries each of your client-side modules is using - or you can even create your own reusable modules! Also, installing (or updating) javascript libraries is as easy as running a single command!
* [Additional Information about Browserify and Watchify on GitHub](https://spapas.github.io/2015/05/27/using-browserify-watchify/)
* [Youtube Video about Browserify and Watchify by Kyle Robinson Young 2015/04/16](https://www.youtube.com/watch?v=CTAa8IcQh1U)
In this repository Browserify and Watchify are used for javascript code development with [NPM Node.js](https://docs.npmjs.com/getting-started/installing-node).

### Global Installation of Browserify, Watchify, UglifyJS and DocToc
Requirement: [NPM](https://docs.npmjs.com/getting-started/installing-node) is intalled. Now call for global installation of Browserfy, Watchify, UglifyJS and DocToc by:

`npm install -g browserify watchify uglify-js doctoc node-lint`

This is recommended because your will not install Browserfy, Watchify and UglifyJS for all your repositories separately.
* ***Browserfy*** converts `node_modules` in a single library, that can be imported in WebApp. Browserify resolves dependencies and included the required libraries into the bundled javascript code.
* ***Watchify*** watches changes in the source code and runs the build process whenever it detects changes in the your source code.
* ***UglifyJS*** compresses the source code of ```class_editor_uml.js``` into ```class_editor_uml.min.js``` to reduce download time and WebApp performance during load.
* ***DocToc*** is used to create a helpful table of contents in the README (see [DocToc-Installation]https://github.com/thlorenz/doctoc#installation) for further details on [NPM DocToc](https://www.npmjs.com/package/doctoc) ). Run `doctoc README.md` for updating the table of contents.
* ***jsLint*** is used to check the Javascript code, quality of code can be improved by application of jsLint

### Package Installation of Browserify and Watchify - Alternative
If your prefer that  browserify and watchify is installed with your `npm install` command, save these to modules to your dev-dependecies in your `package.json` by calling

* (Install Browsersify) `npm install browserify --save-dev`
* (Install Watchify) `npm install watchify --save-dev`
* (Install UglifyJS) `npm install uglify-js --save-dev`
* (Install DocToc) `npm install doctoc --save-dev`
* (Install jslint) `npm install node-lint --save-dev`

The difference between `--save` and `--save-dev` is, that development dependencies are installed with `npm install` because they are required for the development process of the code but they are not added to the generated Javascript-bundle that are used in the WebApp ClassEditorUML. The `--save-dev` commands for `browserify` and `watchify` will install the two modules with all the the dependencies in `node_modules` and add the dev-dependencies to your `package.json`.
```json
"devDependencies": {
  "browserify": "^14.5.0",
  "watchify": "^3.9.0",
  "uglify-js": "^2.6.2",
  "doctoc":"^1.3.0"
}
```
In the current repository `Browserfy` and `Watchify` are expected to be installed globally, because the `package.json` does not contain the dev-dependencies mentioned above.

### Start Watching the Files with Watchify
Watchify will trigger the `npm run build` process if files were change due to alteration of code. To start watching the files, run the npm-watch script by `npm run watch`, which is defined in `package.json`

## Main Library for Handling Testing Wiki2Reveal

Main library to handle large arrays is `docs/js/editor4json.js`
https://github.com/niebert/Wiki2Reveal/tree/master/docs


## Use Tools for the repository
* [Grunt](https://gruntjs.com/getting-started) to automate code generation from modular javascript libraries to a WebApp in the folder `/docs`. The folder `/docs` is used to access the WebApp directly in your browser by the URL
 https://niebert.github.io/Wiki2Reveal
* [Browserify and Watchify](https://spapas.github.io/2015/05/27/using-browserify-watchify/) to combine modular Javascript libraries for use in a browser. This is necessary because the browser does not understand the `require(...)` of NodeJS. Browserify parses the libraries and library dependencies and replaces the `require`-command by an aggregated script call of used javascript sources for the WebApp.  
