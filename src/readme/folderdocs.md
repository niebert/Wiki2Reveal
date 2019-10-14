<!-- src/readme/folderdocs.md -->
## Folder and Files in `docs/`
The folder `docs/` contains all files for the web demo of this repository, that can be accessed to the `https://___PKG_GITHUBUSER___.github.io/___PKG_NAME___`.


## Files, Folders and Structure of Repository
The following enumeration explains the structure of the repository and folders.
* `dist/` folder contains all
* `docs/` folder contains all the web content that you can access via `github.io` defined in the settings of the GitHub repository as server root for the demo.
  * `docs/ace` folder contains files for the editor ACE, that is used in JSON-Editor to edit source code.
  * `docs/db` folder contains JSON database which initializes the JSON-Editor with the default JSON data. If the user saves the file, the current JSON data is stored in the LocalStorage of the browser.
  * `docs/css` folder contains all style sheet for the webbased demo in `docs`.
  * `docs/fonts` folder contains the fonts for the FontAwesome.
  * `docs/jquery` folder contains the JQuery implementation so that a webbased demo runs offline.
  * `docs/js` folder contains all Javascript libraries used for the webbased demo. * `docs/schema` folder contains JSON schema for the webbased demo created [JSON2schema](https://niebert.github.io/JSON2Schema), defining the input user interface for editing the JSON file
  * `docs/tpl` folder contains the HandleBars template generating the source code from the [UML definition](https://en.wikipedia.org/wiki/Unified_Modeling_Language).
  * `docs/index.html` files starts the webbased demo.
* `jscc/` folder contains the [JavascriptClassCreator](https://niebert.github.io/JavascriptClassCreator) files that are used to create object-oriented Javascript class files.  
* `src/` folder contains the file `main.js` for NPM defined in `package.json` and other source files in the future, to create a the library for webbased use in a browser can be found in the folder `dist/`. The files in `dist/` are created with `browsersify` and/or  `watchify`.
* `update_src_libs.sh` is a shell script that works on Linux and MacOSX to perform some library updates from the web and the `update_src_libs.sh` can be used to initialize a new repository with the basic WebApp structure as an privacy friendly [AppLSAC](https://en.wikiversity.org/wiki/AppLSAC).
