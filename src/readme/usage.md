<!-- BEGIN: src/readme/usage.md -->

## Quick Start for Library-Users
Just copy the `docs/`-folder or rename to `myloadfile4dom` and adapt the examples to your needs.
Check out the examples:
* [Load file into textarea](https://niehausbert.gitlab.io/loadfile4dom/loadtextarea.html)
* [Load files into ZIP](https://niehausbert.gitlab.io/loadfile4dom/upload2zip.html)
* [Load Images into DOM and into ZIP](https://niehausbert.gitlab.io/loadfile4dom/loadimages.html)
* [Load JSON into Template Engine Handlebars4Code](https://niehausbert.gitlab.io/loadfile4dom/handlebars4code.html)
Check the javascript source in HTML file. [Download ZIP file of LoadFile4DOM](https://gitlab.com/niehausbert/loadfile4dom/-/archive/master/loadfile4dom-master.zip)

## Usage
You can have one or more `LoadFile4DOM` nodes in your webbased application. The following code shows how to create `LoadFile4DOM` node (see [Demos Examples](https://niehausbert.gitlab.io/loadfile4dom))
```javascript
var lf4d = new LoadFile4DOM();
var options = {
  "id4loadfile": "allmyloaddialogs"
};
lf4d.init(document,options);
var txtfile = lf4dom.get_options("mytxtfile","all");
// set the onload handler for the loaded files
//txtfile.returntype = "file" and not "filehash" so data contains the textstring
txtfile.onload = function (data,err) {
  if (err) {
    console.error(err);
  } else {
    // do something with the file content in data e.g. store  in a HTML textarea (e.g. <textarea id="mytextarea" ...>
    document.getElementById("mytextarea").value = data.file;
  }
}
lf4d.create_load_dialog(txtfile);
```
The Load Dialogs are created with the `onload` event handler in the body tag of your HTML file.

```html
   <body onload="lf4d.create()">
```

Now you can define an `onclick` event in a button to open the load menu similar to the upload feature of web sites.
```html
<input type="button" onclick="lf4d.open_dialog('mytxtfile')" value="Load TXT File">
```
or with a `button`-tag with
```html
<button onclick="lf4d.open_dialog('myhtmlfile')"> Load HTML File</button>
```
Furthermore you can open the menu with an `onclick` event on a link by
```html
This is a <a href="#" onclick="lf4d.open_dialog('myhtmlfile')">link to open the menu</a> in a HTML file.
```

### File Extensions
It is possible to set a mandatory file extension for the loaded files. This mandatory file extension will be checked for all loaded files. The following code creates a `DIV` tag in the DOM with the ID `allmyloaddialogs`. This ID can be used for debugging and learning about `LoadFile4DOM`, because by `document.getElementById('allmyloaddialogs')`  programmers can analyse what is injected in the DOM tree for the generated loaders (see [Demos Examples](https://niehausbert.gitlab.io/loadfile4dom)).

In this example the file extensions can be set with `txtfile.file_extension = ".txt"` after generating the default options for a new text file loader with the ID `mytextfile`.

```javascript
//--- Create a LoadFile4DOM instance ---
// you need one instance for all loaders
var lf4d = new LoadFile4DOM();
var options = {
  "id4loadfile": "allmyloaddialogs"
};
lf4d.init(document,options);

//-----------------------------------------------
//----- Create a new Loader "mytxtfile" ---------
//-----------------------------------------------
var txtfile = lf4d.get_loader_options("mytxtfile","text");
// set mandatory file extensions
txtfile.file_extension = ".txt";
// set the onload handler for the loaded files
txtfile.onload = function (data,err) {
  // define file handler

}
lf4d.create_load_dialog(txtfile);
```
Mandatory file extensions are helpful especially for `zip`-files:
* [Geogebra files](https://www.geogebra.org) are `zip`-files and they have the file extension `.ggb`. The corresponding [MIME](https://en.wikipedia.org/wiki/Media_type) type for `ggb`-files is `application/vnd.geogebra.file`
* [LibreOffice Writer files](https://www.libreoffice.org/discover/writer/) are `zip`-files and they have the file extension `.odt`. The corresponding [MIME](https://en.wikipedia.org/wiki/Media_type) type for `ODT` is
`application/vnd.oasis.opendocument.text`

The file extension check is implemented in the method `LoadFile4DOM.error_file_type()`.

### Return Types
The onload handler could get different processed JSON objects as return types.
* `file` is
  * just the text for file type `text`
  * the parsed JSON for file type `json`
  * binary version (blob) of loaded file
* `filehash` contains also the filename if browser return the name of the file. This is not standard and might result in an unexpected behavior if not used in Firefox or Chrome. `filehash` return a hash with
```javascript
   data = {
     "name": "myloadedfile.txt",
     "file": "the content of the loaded text file",
     "mime_type":"text/plain"
   }
```
  * here the attribute `data.file` contains the text of file, or
  * **Loader Type: `json`** `data.file` contains the parsed JSON for the loader file type `json`
  * `data.file` contains the base64 content of loaded file
  * `mime_type` contain the [MIME type of the file](https://en.wikipedia.org/wiki/Media_type)
* `tag` as return type creates an image tag as string for the DOM that contain the image. This is applicable for filetype `image_thumb`.

### Image Thumb
The loader type `image_thumb` is appropriate for loading thumbnail images and return an image tag with the thumbnail size that can be appended to the DOM. Append the image tag to DOM uses the returned a string for the tag to append to the `innerHTML` of a DIV element (see [Demos Examples](https://niehausbert.gitlab.io/loadfile4dom)).

For the following example we assume that the following `div` element with the id `outlist` is located somewhere in the document body of the DOM (Document Object Model) of the browser document (i.e. loaded HTML page).
```html
<div id="outlist"></div>
```
The following Loader of the type `image_thumb`. The default image size of the thumbnail is defined by `file2image.width = 200` to a width of 200 pixel.
```javascript
//--- Create a LoadFile4DOM instance ---
// you need one instance for all loaders
var lf4d = new LoadFile4DOM();
var options = {
  "debug": false // if true, it will show the hidden <input type="file" ...> loaders in DOM
};
lf4d.init(document,options);
//-----------------------------------------------
//----- Create a new Loader "file2image" --------
//-----------------------------------------------
var file2image = lf4d.get_loader_options("addfile2image","imagethumb");
file2image.returntype = "tag";
file2image.width = 200;
// Define what to do with the loaded data
file2image.onload = function (data,err) {
  if (err) {
    // do something on error, err contains error message
    console.error(err);
  } else {
    // do something with the file content in data e.g. store  in a HTML textarea (e.g. <textarea id="mytextarea" ...>
    console.log("CALL: file2image.onload()");
    var vNode = document.getElementById("outlist");
    if (vNode) {
      vNode.innerHTML = vNode.innerHTML + "<br>" + data.tag + " ";
    } else {
      console.error("ERROR: DOM Element 'outlist' does not exist!");
    }

  }
};
// create the load dialog 'file2image'
lf4d.create_load_dialog(file2image);
```

### Format of the Returned Filehash
The `data` hash contains the following properties:
```javascript
data = {
  "name": "myimage.png",
  "file": "uASo3hSODBFl9fsdf...",
  "mime_type": "image/png",
  "tag": "<img src='....' width='200'>"
};
```
The `data.file` attribute can be used to store the images into ZIP. The main property to display the image is the `data.tag` attribute.   
* The property `data.name` contains the filename of the loaded file if the browser provides the filename (without path) of the loaded file.
* The property `data.file` contains the base64 encoded content of the image
* The property `data.mime_type` contains the [MIME](https://en.wikipedia.org/wiki/Media_type) type of the image.
* The property `data.tag` contains the HTML tag of the thumbnail image.

### Load Images
The loader of type `image` create an `new Image()` object and populates the attributes `width`, `height` (see [Demos Examples](https://niehausbert.gitlab.io/loadfile4dom)).

```javascript
img = new Image();
// populate i...

data = {
  "name": "myimage1.png",
  "file": "base64,uASo3hSODBFl9fsdf...",,
  "mime_type": "image/png",
  "img": "<img src='....' width='640'>"
};
```

### Load Files into JSON/Javascript
If you want to create digital product that is dependent on binary data, you can check the example [Load Files into JSON](https://niehausbert.gitlab.io/loadfile4dom/files2jslib.html). The [Demo](https://niehausbert.gitlab.io/loadfile4dom/files2jslib.html) creates a JSON file or Javascript file with all the loaded files the filenames and the MIME types.

E.g. if you want to create a LibreOffice document and populate the content of the generated content of the WebApp then you need a ZIP file of the Office document in which the file `content.xml` is replaced. Due to security limitations the browser cannot access binary content from the filesystem without permission (standard application on your operating system have permissions to write to the filesystem). By storing only required files in a JSON file or Javascript files an arbitrary access to the filesystem is still not available (good for privacy) and only the binary files need for the WebApp are stored in a JSON or a Javascript library.

The following JSON can be created with the [Load to JSON Demo](https://niehausbert.gitlab.io/loadfile4dom/files2jslib.html).  To create a [JSON with an array of files](https://niehausbert.gitlab.io/loadfile4dom/files2json.html) the resulting JSON could look like this.
All file have a MIME-type and a file name for the file. This is helpful for saving file from the WebApp by application of the library `filesaver.js`. Even binary files can be stored in this JSON file by base64 encoding. This assures that no binary data gets lost, because every byte of the binary data is encode in two characters. Finally the binary data is represented by `base64` encoded string, which consumes more memory but can be summitted and stored in data structures that are designed for strings (see [Demos Examples](https://niehausbert.gitlab.io/loadfile4dom)).

The results of the demo is e.g. the following JSON for 2 added files:
* the first file is a LibreOffice-ODT document `my_office_doc.odt`, which is in fact a ZIP-file with a special file and folder structure, that can be handled and modified with `JSZip`. The binary data was `base64` encoded.
* the second file is a standard text file with a new line `\n` and tab character `\t`. The text file is not encoded in `base64`, so that the file content can be used directly in the WebApp resp. DOM tree, e.g. by storing the content in a HTML textarea for further editing by the user of the WebApp.

```json
[
    {
        "name": "my_office_doc.odt",
        "file": "bW96THo0MAAGDwAA8....",
        "mime_type": "application/vnd.oasis.opendocument.text"
    },
    {
        "name": "my_comments.txt",
        "file": "this are \t my comment\nloaded from a file",
        "mime_type": "text/plain"
    }
]
```
If you want to store the JSON listed above as a Javascript library and load the data in the main HTML document e.g. `index.html`, you can add the following lines in `index.html`.
```html
<script>
   var vDataJSON = {
     "files" : null
   };
</script>
<script src="myfiles.js"></script>
```
In the library `myfiles.js` is just a slightly modified JSON file, that looks like this.
```javascript
// this is a content of 'myfiles.js'
var  vDataJSON.files = [
    {
        "name": "my_office_doc.odt",
        "file": "bW96THo0MAAGDwAA8....",
        "mime_type": "application/vnd.oasis.opendocument.text"
    },
    {
        "name": "my_comments.txt",
        "file": "this are \t my comment\nloaded from a file",
        "mime_type": "text/plain"
    }
]
```
**Remark:** Please keep in mind, that the content of file attribute `file` for the LibreOffice document is actually a very long string. The displayed content `bW96THo0MAAGDwAA8....` in this tutorial is not a real ODT-file. To create usable Javascript libraries with stored binary and text files use the demo WebApp (see [AppLSAC](https://en.wikiversity.org/wiki/WebApps_with_LocalStorage_and_AppCache)).

### Load LibreOffice Files in WebApp
Assume we store LibreOffice file `libreoffice_template.odt` in a JSON and load the JSON data as library in WebApp. The stored ODT `libreoffice_template.odt` has the MIME type `application/vnd.oasis.opendocument.text` but it is in fact a ZIP file. So creating a LibreOffice file with a WebApp can use a stored ZIP file as template and add user defined content from an editor to the LibreOffice file `my_office_doc.odt`, add images to the document by using the stored  just needs `my_office_doc.odt` as template for the layout of generated LibreOffice document in the WebApp. `JSZip` can be used to process `libreoffice_template.odt` and replace the file `content.xml` in the ZIP.

```javascript
zip.file("content.xml", my_new_content);
```

When you upload files to a JSON the

### ZIP-Files
Saving binary data into a zip-file with `JSZip` the first conclusion is to use
```javascript
zip.file("myimage.png", imgData); // NOT WORKING
```
where `imgData` is a `base64` encoded string. `JSZip` reads `imgData` as string and this implies that the file get corrupted. It is necessary to provide an option to `JSZip` that you want to save an (unicode) string. The example above will not work, because `imgData` is a binary and not a textual content. To avoid that the `zip`-file receives a corrupted content, it is necessary to pass the binary option to the zip handler (see [Demos Examples](https://niehausbert.gitlab.io/loadfile4dom)).

```javascript
zip.file("myimage.png", imgData, {base64: true})
```
See [ZIP-Example](https://niehausbert.gitlab.io/loadfile4dom/upload2zip.html)



<!-- JSON-schema `docs/schema` and the JSON data in the folder `docs/db/` to the schema for your requirements. If you want to create your own JSON schema use the [JSON2Schema tool](https://niebert.github.io/JSON2Schema).

-->

<!-- END:   src/readme/usage.md -->
