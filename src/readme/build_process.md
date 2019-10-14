<!-- BEGIN: src/readme/build_process.md -->

## Build Process of `npm run build`
The build process is called by `npm run build` which in turn call `build.js`. If you want to call the build process of `build.js` separately just call `build.js` with `node build.js` from the shell/console.

The templates for building the output are stored in the folder `src/`.

After the build process the `README.md` is generated and if you want to have the table of contents in the file for the concatenation of  files in `src/readme/` listed in `files4build.js` then you must run the DocToc generator for `README.md` by `doctoc README.md` from the shell to update the table of contents in `README.md`.

### Define Filename for build in `package.json`
In `package.json` defines the filename for the automated build for
* `README.md` for readme for the repository (parts in `src/readme`),
* `index.html` for the web demo (parts in `src/html`),
* `main.css` for the style sheet (part in `src/css`) and
* `___PKG_MAIN___` is generated from the parts in `src/libs`
the sources in `src/`.
To specify these filenames add the following `build` section to the `package.json`:
```javascript
"build": {
  "readme": "README.md",
  "html": "docs/index.html",
  "css": "docs/css/main.css"
}
```
If you want to edit the generated file check the files that are selected for including into the generated files (see `files4build.js`) and set the files to a preliminary build name (e.g. like `index_build.html` instead of `index.html` to compare generated file `index_build.html` with the older version `index.html` for debugging

### Compress after Build
After building (concat the file parts) and replacement of package variables (e.g. see [`build4code`](https://www.npmjs.com/package/build4code) like  `___PKG_NAME___` for package name) in the generated documents the module is browserified by the command
```javascript
uglifyjs dist/___PKG_NAME___.js --compress -o dist/___PKG_NAME___.min.js
```
This command is called after `build.js` and the final step of the build process is the [`doctoc`](https://www.npmjs.com/package/doctoc) call to update the table of contents in the `README.md`. All steps of the `npm run build` command are defined in the `script` section of the `package.json` file.
<!-- END:   src/readme/build_process.md -->
