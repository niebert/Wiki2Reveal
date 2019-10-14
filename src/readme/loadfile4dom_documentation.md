
### APIJavascript Class: `LoadFile4DOM`
The

* created with [ClassEditorUML](https://niebert.github.io/ClassEditorUML) - Date: 2018/12/12 14:49:10
* last modifications at 2018/12/28 7:30:40
* URL Class Editor for UML: https://niebert.github.io/ClassEditorUML
* File: `js/loadfile4dom.js`
* UML-File: `jscc/loadfile4dom_uml.json` - load with [ClassEditorUML](https://niebert.github.io/ClassEditorUML)

### Diagram

|  LoadFile4DOM               |
| ---------------------------- |
|  + `aDoc:Document`<br> + `aOptions:Hash`<br> + `aFileLoader:Hash`<br> + `aLoadFileHolder:Object`<br> + `defaults_options:Hash`<br> + `type2accept:Hash` <br> + `defaults_loader:Hash` <br> + `aLoaderCount:Integer`  |
|  + `init(pDoc:Document,pOptions:Hash)` <br> + `create()` <br> + `getTimeStamp():String`<br> + `create_holder()` <br> + `get_holder():Object`<br> + `create_load_dialog(pOptions:Hash)` <br> + `open_dialog(pID:String)` <br> + `create_input_tags()` <br> + `get_input_attributes(pID:String,pType:String):Hash` <br> + `set_defaults(options: , defaults: )` <br> + `get_loader_options(pID: String,pType: String,pOptions: Hash):Hash`<br> + `handle_file_type(pLoader:Hash ,pFileReader:FileReader ,pFileToLoad:File )` <br> + `handle_single_file(pLoader:Hash)` <br> + `handle_multiple_files(pLoader:Hash)` <br> + `handle_file(pID:String)` <br> + `log(pMessage:String)` <br> + `set_onload()`     |

### Create Instance of Class
Instances of the class `LoadFile4DOM` can be generated with:
```javascript
    var vLoadFile4DOM = new LoadFile4DOM();
```

### Definition Methods - 2 Approaches
* If you want to assign definitions of methods for single instances individually, defined the method the following way. This approach allows to overwrite the method definition of single instances dynamically.
```javascript
    this.my_method = function (pPar1,pPar2)
```
* A prototype definition of methods for `LoadFile4DOM` will be set the definition as prototye for all instances of the class. Alteration of the prototye definition with change the method definition of all instances of  `LoadFile4DOM`. Use the following prototype definition for methods name for 'LoadFile4DOM'.
```javascript
    LoadFile4DOM.prototype.my_method = function (pPar1,pPar2)
```
The prototype definition for methods consumes less memory for instances.

### Attributes: `LoadFile4DOM`
For class `LoadFile4DOM` the following attributes are defined:

#### Attribute `aDoc : Document`
This attribute stores a reference to the document object of the browser. Reference provided with the init-method
* Visibility: `public`
* Class: `Document`
* Default Init: `null` set by `my_instance.aDoc = null;`
* Access of attribute in the code of methods by `this.aDoc = null;`

#### Attribute `aOptions : Hash`
This hash stores the options of the init method - e.g. "id4loadfile" as DIV container for the input elements in the DOM that holds all created file loaders i.e. holding the input-file-tags for load a JSON file
* Visibility: `public`
* Class: `Hash`
* Default Init: `null` set by `my_instance.aOptions = null;`
* Access of attribute in the code of methods by `this.aOptions = null;`

#### Attribute `aFileLoader : Hash`
This attribute stores the number of file loaders created with instance
* Visibility: `public`
* Class: `Hash`
* Default Init: `{}` set by `my_instance.aFileLoader = {};`
* Access of attribute in the code of methods by `this.aFileLoader = {};`

#### Attribute `aLoadFileHolder : Object`
This attribute stores the reference to the DIV node of the file holder node in the DOM that is created by `this.create_holder()
* Visibility: `public`
* Class: `Object`
* Default Init:
```javascript
  this.aLoadFileHolder = {
      "id": "div_id", // id of DIV element - can be set via options.id4loadfile in init(doc,options)
      "dom": null,
      "timeout": 0, // timeout until the input-file tags are injected into DOM (1000 = 1sec)
      "var4dom":"undef_call_var",
      "debug":false
    };   //  Class: Object
```
* Access of attribute in the code of methods by `this.aLoadFileHolder`

#### Attribute `defaults_options :  `
the attribute stores the default options for LoadFile4DOM
* Visibility: `public`
* Class: ` `
* Default Init:
```javascript
    this.defaults_options = {
      "id": "loadfile_holder_div", // id of DIV element - can be set via options.id4loadfile in init(doc,options)
      "dom": null,
      "setonload": false, // set onload="lf4d.create()" in body tag, be careful with this options because it will overwrite other onload functions
      "timeout": 1000, // timeout until the input-file tags are injected into DOM (1000 = 1sec)
      "debug":false
    };   //  Class: Object
```
* Access of attribute in the code of methods e.g. by `this.defaults_options.dom`

#### Attribute `type2accept :  `
the attribute maps the type to the accept tag of files of the input-file-tag
* Visibility: `public`
* Class: ` `
* Default Init:
* Access of attribute in the code of methods by `this.type2accept['text']`

#### Attribute `defaults_loader :  `
the attribute stores the default loader tags if not options are provided
* Visibility: `public`
* Class: ` `
* Default Init:
```javascript
	// ---------------------------------------------------------------------
    // Defaults for each File Loader
    // ---------------------------------------------------------------------
    this.defaults_loader = {
      "type": "text",  // image, audio, video, zip
      "id": "loader123456789",
      "name": "defaultloader",
      "value": "Dialog Loader Button",
      "accept": "text/*", // image/*, audio/*, video/*, application/zip
      "onload":"console.log('open dialog click on 'defaultloader')",
      "multiple": true
    };
```

* Access of attribute in the code of methods by `this.defaults_loader.id`

#### Attribute `aLoaderCount :  `
the attribute stores the number of created loaders to create unique loader IDs in the DOM together with the method getTimeStamp()
* Visibility: `public`
* Class: ` `
* Default Init: `0` set by `my_instance.aLoaderCount = 0;`
* Access of attribute in the code of methods by `this.aLoaderCount = 0;`

### Methods: `LoadFile4DOM`
For class `LoadFile4DOM` the following methods are defined:

#### Method `init(pDoc,pOptions)`
the method performs the initialization of the instance of LoadFile4DOM. pOptions contains the ID for the LoadFile4DOM holder, it is in general a DIV element with the HTML-input-tags for uploading a files.
* Visibility: `public`
* Call: `vLoadFile4DOM.init(pDoc,pOptions);` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:
   * `pDoc:Document` the parameter contains a reference to the document object of the browser
   * `pOptions:Hash` the parameter stores options

#### Method `create()`
the method creates a DOM node for the file in the `window.document` of the browser and  adds an object in `this.aFileLoader` the each constructed file loader with the appropriate ID.
* Visibility: `public`
* Call: `vLoadFile4DOM.create();` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:

#### Method `getTimeStamp()`
the method performs ...
* Visibility: `public`
* Returns: `Integer`
* Call: `var vIntegerRet = vLoadFile4DOM.getTimeStamp();` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `= LoadFile4DOM`.
* Parameter List:

#### Method `create_holder()`
the method creates a hidden holder DIV element for the input-tags of the load file instance. The loader ID of the DIV element is stored in this.aOptions.id4loadfile
* Visibility: `public`
* Call: `vLoadFile4DOM.create_holder();` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:

#### Method `get_holder()`
the method returns the LoadFile4DOM holder as DOM node. The id of the LoadFile4DOM holder is stored in this.aOptions.id4loadfile. The holder is an existing DIV node in the DOM (Document Object Model) or it will be created by the `create_holder()`
* Visibility: `public`
* Returns: `Object`
* Call: `var vObjectRet = vLoadFile4DOM.get_holder();` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `= LoadFile4DOM`.
* Parameter List:

#### Method `create_load_dialog(pOptions)`
the method performs ...
* Visibility: `public`
* Call: `vLoadFile4DOM.create_load_dialog(pOptions);` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:
   * `pOptions: ` the parameter provides ...

#### Method `open_dialog(pID)`
the method performs ...
* Visibility: `public`
* Call: `vLoadFile4DOM.open_dialog(pID);` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:
   * `pID:String` the parameter provides the ID of the FileLoader input tag in the DOM

#### Method `create_input_tags()`
the method injects the input-files tags for the loaders in the DOM - the method is called by LoadFile4DOM.create() with body-onload attribute.
* Visibility: `public`
* Call: `vLoadFile4DOM.create_input_tags();` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:

#### Method `get_input_attributes(pID,pType)`
the method performs ...
* Visibility: `public`
* Call: `vLoadFile4DOM.get_input_attributes(pID,pType);` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:
   * `pID: ` the parameter provides ...
   * `pType: ` the parameter provides ...

#### Method `set_defaults(options, defaults)`
the method performs ...
* Visibility: `public`
* Call: `vLoadFile4DOM.set_defaults(options, defaults);` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:
   * `options: ` the parameter provides ...
   * ` defaults: ` the parameter provides ...

#### Method `get_loader_options(pID,pType,pOptions)`
the method returns a hash for loader e.g. the command
```javascript
var loader4txt = lf4d.get_loader_options("mytxtfile","text",loader_opts);
creates the following hash:
    loader4txt={
       "type": "text",
        "id": "mytxtfile1t1545978644012",
        "name": "mytxtfile",
        "value": "Dialog mytxtfile",
        "accept": "text/*",
        "onload": "var4dom0t1545978644011.open_dialog('mytxtfile')",
        "multiple": false
    }
```
In loadfile4dom.js the call of create_load_dialog(loader_option) creates the loader.

* Visibility: `public`
* Returns: `Hash`
* Call: `var vHashRet = vLoadFile4DOM.get_loader_options(pID,pType,pOptions);` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `= LoadFile4DOM`.
* Parameter List:
   * `pID: ` the parameter provides name for DOM input-file  for the loader
   * `pType: ` the parameter provides the type of loader e.g. text, image, imagethumb, audio, video, zip  
   * `pOptions: ` the parameter provides additional options e.g. style options with width and height for an image

#### Method `handle_file_type(pLoader,pFileReader,pFileToLoad)`
the method performs ...
* Visibility: `public`
* Call: `vLoadFile4DOM.handle_file_type(pLoader,pFileReader,pFileToLoad);` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:
   * `pLoader: ` the parameter provides ...
   * `pFileReader: ` the parameter provides ...
   * `pFileToLoad: ` the parameter provides ...

#### Method `handle_single_file(pLoader)`
the method performs  a single file handler
* Visibility: `public`
* Call: `vLoadFile4DOM.handle_single_file(pLoader);` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:
   * `pLoader: ` the parameter provides the file loader for a single file loaded by the user.

#### Method `handle_multiple_files(pLoader)`
the method performs a multiple file handler
* Visibility: `public`
* Call: `vLoadFile4DOM.handle_multiple_files(pLoader);` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:
   * `pLoader: ` the parameter provides  the handler for a multiple files selected by the user.

#### Method `handle_file(pID)`
the method performs ...
* Visibility: `public`
* Call: `vLoadFile4DOM.handle_file(pID);` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:
   * `pID: ` the parameter provides loader pID

#### Method `log(pMessage)`
the method performs a console log call for the message if this.aOptions.debug = true, otherwise no console.logs were displayed.
* Visibility: `public`
* Call: `vLoadFile4DOM.log(pMessage);` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:
   * `pMessage: ` the parameter provides the console.log() message

#### Method `set_onload()`
the method sets the onload-event for the body WARNING: do not use - bug fixing necessary
* Visibility: `public`
* Call: `vLoadFile4DOM.set_onload();` where `vLoadFile4DOM = new LoadFile4DOM()` is an instance of the class `LoadFile4DOM`.
* Parameter List:
