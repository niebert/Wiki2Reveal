// Export expanded 'wtf' Module with additional methods
const wtf_fetch = require("wtf_fetch");
let wtf = {};
wtf.wikiconvert = new WikiConvert();
wtf.reveal = wtf.html;
wtf.getPage = wtf_fetch.getPage;
wtf.wiki2reveal = get_wiki2reveal;

module.exports = wtf;
