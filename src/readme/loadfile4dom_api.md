
## API for Javascript Class: `LoadFile4DOM`
The complete documentation of the API can be found in the  [GitLab-Wiki](https://gitlab.com/niehausbert/loadfile4dom/wikis/API-Documentation).

### Diagram

|  LoadFile4DOM               |
| ---------------------------- |
|  + `aDocNaNDocument`<br> + `aOptionsNaNHash`<br> + `aFileLoaderNaNHash`<br> + `aLoadFileHolderNaNObject`<br> + `defaults_options`<br> + `type2accept`<br> + `defaults_loader`<br> + `aLoaderCount` |
|  + `init(pDoc:Document,pOptions:Hash)`<br> + `getTimeStamp():Integer`<br> + `create_input_tags()`<br> + `create()`<br> + `get_holder():Object`<br> + `create_load_dialog(pOptions: )`<br> + `create_holder()`<br> + `open_dialog(pID:String)`<br> + `set_defaults(options: , defaults: )`<br> + `get_loader_options(pID: ,pFileType: ,pOptions: ):Hash`<br> + `get_input_attributes(pID: ,pFileType: )`<br> + `error_file_type(pLoader: ,pFileToLoad: )`<br> + `handle_text(pLoader: ,pFileReader: ,pFileToLoad: )`<br> + `handle_json(pLoader: ,pFileReader: ,pFileToLoad: )`<br> + `handle_image(pLoader: ,pFileReader: ,pFileToLoad: )`<br> + `handle_image_thumb(pLoader: ,pFileReader: ,pFileToLoad: )`<br> + `handle_data(pLoader: ,pFileReader: ,pFileToLoad: )`<br> + `handle_audio(pLoader: ,pFileReader: ,pFileToLoad: )`<br> + `handle_video(pLoader: ,pFileReader: ,pFileToLoad: )`<br> + `handle_file_type(pLoader: ,pFileReader: ,pFileToLoad: )`<br> + `handle_single_file(pLoader: )`<br> + `handle_multiple_files(pLoader: )`<br> + `handle_file(pID: )`<br> + `log(pMessage: )`<br> + `set_onload()`    |


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
This attribute stores the reference to the DIV node of the file holder node in the DOM that is created by `this.create_holder()`
* Visibility: `public`
* Class: `Object`
* Default Init: `{
    "id": "holder4loadfile",
    "dom": null,
    "timeout": 0,
    "var4dom": "undef_call_var",
    "debug": false
}` set by `my_instance.aLoadFileHolder = {
    "id": "holder4loadfile",
    "dom": null,
    "timeout": 0,
    "var4dom": "undef_call_var",
    "debug": false
};`
* Access of attribute in the code of methods by
```javascript
this.aLoadFileHolder = {
    "id": "holder4loadfile",
    "dom": null,
    "timeout": 0,
    "var4dom": "undef_call_var",
    "debug": false
};
```

#### Attribute `defaults_options :  `
the attribute stores the default options for LoadFile4DOM
* Visibility: `public`
* Class: ` `
* Default Init:
```javascript
{
    "id": "loadfile_holder_div",
    "dom": null,
    "setonload": false,
    "timeout": 1000,
    "debug": false
}
```
set by
```javascript
my_instance.defaults_options = {
    "id": "loadfile_holder_div",
    "dom": null,
    "setonload": false,
    "timeout": 1000,
    "debug": false
};
```
* Access of attribute in the code of methods by
```javascript
this.defaults_options = {
    "id": "loadfile_holder_div",
    "dom": null,
    "setonload": false,
    "timeout": 1000,
    "debug": false
};
```

#### Attribute `type2accept :  Hash`
the attribute maps the type to the accept tag of files of the input-file-tag
* Visibility: `public`
* Class: `Hash`
* Default Init:
```javascript
{
    "all": "*",
    "audio": "audio/*",
    "audiourl": "text/*",
    "data": "*",
    "image": "image/*",
    "imagethumb": "image/*",
    "json": "application/json",
    "text": "text/*",
    "texturl": "text/*",
    "video": "video/*",
    "videourl": "text/*",
    "url": "text/*",
    "zip": "application/zip"
}
```
set by
```javascript
my_instance.type2accept = {
    "all": "*",
    "audio": "audio/*",
    "audiourl": "text/*",
    "data": "*",
    "image": "image/*",
    "imagethumb": "image/*",
    "json": "application/json",
    "text": "text/*",
    "texturl": "text/*",
    "video": "video/*",
    "videourl": "text/*",
    "url": "text/*",
    "zip": "application/zip"
};
```
* Access of attribute in the code of methods by
```javascript
this.type2accept = {
    "all": "*",
    "audio": "audio/*",
    "audiourl": "text/*",
    "data": "*",
    "image": "image/*",
    "imagethumb": "image/*",
    "json": "application/json",
    "text": "text/*",
    "texturl": "text/*",
    "video": "video/*",
    "videourl": "text/*",
    "url": "text/*",
    "zip": "application/zip"
};
```

#### Attribute `defaults_loader :  `
the attribute stores the default loader tags if not options are provided
* Visibility: `public`
* Class: `Hash`
* Default Init:
```javascript
{
    "filetype": "text",
    "id": "loader123456789",
    "name": "defaultloader",
    "value": "Dialog Loader Button",
    "accept": "text/*",
    "onchange": "console.log('open dialog click on 'defaultloader')",
    "multiple": true
}
```
set by
```javascript
my_instance.defaults_loader = {
    "filetype": "text",
    "id": "loader123456789",
    "name": "defaultloader",
    "value": "Dialog Loader Button",
    "accept": "text/*",
    "onchange": "console.log('open dialog click on 'defaultloader')",
    "multiple": true
};
```
* Access of attribute in the code of methods by
```javascript
this.defaults_loader = {
    "filetype": "text",
    "id": "loader123456789",
    "name": "defaultloader",
    "value": "Dialog Loader Button",
    "accept": "text/*",
    "onchange": "console.log('open dialog click on 'defaultloader')",
    "multiple": true
};
```

#### Attribute `aLoaderCount :  Integer`
the attribute stores the number of created loaders to create unique loader IDs in the DOM together with the method getTimeStamp()
* Visibility: `public`
* Class: `Integer`
* Default Init: `0` set by `my_instance.aLoaderCount = 0;`
* Access of attribute in the code of methods by `this.aLoaderCount = 0;`
