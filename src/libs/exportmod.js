/* ---------------------------------------
 Exported Module Variable: Wiki2Reveal
 Package:  wiki2reveal
 Version:  2.1.16  Date: 2021/01/19 13:14:57
 Homepage: https://github.com/niebert/Wiki2Reveal#readme
 Author:   Engelbert Niehaus
 License:  MIT
 Date:     2021/01/19 13:14:57
 Require Module with:
    const Wiki2Reveal = require('wiki2reveal');
 JSHint: installation with 'npm install jshint -g'
 ------------------------------------------ */

/*jshint  laxcomma: true, asi: true, maxerr: 150 */
/*global alert, confirm, console, prompt */

// Export expanded 'wtf' Module with additional methods
const wtf_fetch = require("wtf_fetch");
let wtf = {};
wtf.wikiconvert = new WikiConvert();
wtf.reveal = wtf.html;
wtf.getPage = wtf_fetch.getPage;
wtf.wiki2reveal = get_wiki2reveal;

module.exports = wtf;

