<!-- BEGIN: src/readme/folderrepo.md -->
## Folder and Files in Repository
In the repository `___PKG_EXPORTVAR___` several files are generated automatically during the build process. `files4build.js` defines the list of files parts that are required and used to the build process with `npm run build`.

### Folder `dist/`
The folder `dist/` contains all generated libraries by `npm run build` which calls `build.js`. The function `getLibs4Build()` (defined in `files4build.js`) return and array of files that are concatenated for generating the libraries `dist/___PKG_NAME___.js` and `dist/___PKG_NAME___.min.js`

### File `build.js`
The file `build.js` creates the files for the repository in `JS`, `HTML`, `CSS`, `README`:
* `README.md` of the reporsitory with file parts in `src/readme`
* `JS`: `dist/___PKG_NAME___.js` as main library for distribution with file parts in `src/libs`.
* `JS`: `dist/___PKG_NAME___.min.js` as compressed main library for distribution with file parts in `src/libs` - compressed with `UglifyJS`.
* `HTML`: `docs/index.html` for the repository with file parts in `src/html`.
* `JS`: `docs/js/___PKG_NAME___.js` as main library for web demo in `docs/` with file parts in `src/html/`.
* `CSS`: `docs/css/main.js` as main library for web demo in `docs/` with file parts in `src/css/`.

**Remark:** DO NOT EDIT the following generated files of the build process with `build.js` directly
* `___PKG_NAME___.js`,  
* `___PKG_NAME___.min.js`,
* `docs/index.html`,
* `css/main.css`
because your work will be lost after running `npm run build` again. Edit the source files for the build process in the folder `src/` instead.

### Folder `docs/`
The folder `docs/` contains all files for the web demo of this repository, that can be accessed to the `https://___PKG_GITHUBUSER___.github.io/___PKG_EXPORTVAR___`.

### Folder `src/`
The folder `src/` contains all source files for the build process defined by `build.js` in this repository. `files4build.js` defines the list of files parts that are required and used to the build process with `npm run build`.

<!-- END:   src/readme/folderrepo.md -->
