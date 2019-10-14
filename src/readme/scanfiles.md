## Scan Files in `docs/` Folder
The folder `docs/` contains demo HTML files, that show the application of `___PKG_EXPORTVAR___` in the library `___PKG_NAME___.js`.

### Create `docs/index.html` for Demos as HTML
The shell script scans all demo HTML files in the folder `docs/` and creates the `index.html`. The script `

### Create `src/readme/demos.md` for Demos in Markdown
The script runs in `bash` shell for Linux and OSX. On OSX there exists a non-GNU compatible `sed` command. For compatible install `gsed` with `brew install gnu-sed` and adapt the `sed` call with the variable `sed` on GNU Linux and to `gsed` on OSX. Adapt following line according to your operating system:
```bash
### GNU Linux
SED_CMD="sed"
### OSX
SED_CMD="gsed"
```
**Remark:** Call if `gsed` on the command line in OSX. If `gsed` is not installed, use [Homebrew](https://brew.sh/) https://brew.sh/ to install the GNU compatible `gsed` with `brew install gnu-sed`.
