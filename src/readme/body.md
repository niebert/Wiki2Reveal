<!-- BEGINsrc/readme/body.md -->

## Wikiversity
This library was created as Git-Repository to support the learning resource about privacy-friendly webbased applications `AppLSAC`](https://en.wikiversity.org/wiki/AppLSAC) on Wikiversity. An `AppLSAC` runs completely in the browser without the need to submit any user generated data to a server for processing. This package `HandleBars4Code` is designed to learn about the second step processing of data:
* **(Load)** Load File into a browser for processing with an HTML5-WebApp (AppLSAC-1 or AppLSAC-2). The library [`LoadFile4DOM`](https://niehausbert.gitlab.io/loadfile4dom) serves to cover the loading feature.
* **(Process)** Processing data can be done with any Javascript-libraries of your choice that can perform its task without submission of user generated data to a remote server. `HandleBars4Code` processes a JSON as input (UML for Javascript) to generate the JavaScript library or the `README.md` documentation for a package.
* **(Save)** If users want to save the processed results, it is recommended to look at the [FileSaver.js](https://github.com/eligrey/FileSaver.js) library provided by Eli Grey.

<!-- END src/readme/body.md -->
