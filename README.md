# Wiki2Reveal
Convert a MediaWiki source document e.g. in Wikiversity into a Reveal Presentation.

## Call of MediaWiki API
The following URL is an example call for retrieving the source of an MediaWiki article:

 http://en.wikiversity.org/w/index.php?title=Swarm_intelligence&action=raw

The call retrieves the article about ___Swarm intelligence___ from the english  Wikiversity.

* The abbreviation ___en___ is the language
* ___wikiversity.org___ defines the Wiki product by the domain name. This can be replaced e.g. by ___wikipedia.org___, to download the corresponding article in Wikipedia instead of the learning resource in Wikiversity.
* addessing the API is performed by  ___/w/index.php___. To read the corresponding article in the browser the users will use the URL
 https://en.wikiversity.org/wiki/Swarm_intelligence
* The API call above has to parameters with key-value pairs.
  * ___title=Swarm_intelligence___ for the definition of the title
  * ___action=raw___ to get the raw sources of the article in the Wiki syntax

## Images Download wget

* The link ___https://en.wikipedia.org/wiki/Special:Redirect/file/Annweiler_Rathaus.JPG___ refers to the current version of the image ___Annweiler_Rathaus.JPG___.
* Size of image can be determined by ___http://en.wikipedia.org/wiki/Special:FilePath/Annweiler_Rathaus.JPG?width=300___ (here resize the width to 300 pixels.


## Generate an AJAX Call in HTML5 Environment
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

## Use Tools for the repository
* [Grunt](https://gruntjs.com/getting-started) to automate code generation from modular javascript libraries to a WebApp in the folder ___/docs___. The folder ___/docs___ is used to access the WebApp directly in your browser by the URL
 https://niebert.github.io/Wiki2Reveal
 * [Browserify] to combine modular Javascript libraries for use in a browser. This is necessary because the browser does not understand the ___require(...)___ of NodeJS. Browserify parses the libraries and library dependencies and replaces the ___require___-command by an aggregated script call of used javascript sources for the WebApp.  
