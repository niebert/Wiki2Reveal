/* wtf_tokenizer v2.0.0
   github.com/niebert/wtf_tokenizer

   Tokenize mathematical expressions and citations in Wiki markdown from MediaWiki
   based on work of Spencer Kelly github.com/spencermountain/wtf_wikipedia
   designed as submodule of wtf_wikipedia - decomposition into subtasks
   Licence: MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.wtf_tokenizer = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

//const toHtml = require('./toHtml');
//const toMarkdown = require('./toMarkdown');
//const toJSON = require('./toJson');
//const toLatex = require('./toLatex');
//const aliasList = require('../lib/aliases');
//where we store the formatting, link, date information
var Sentence = function Sentence(data) {
  Object.defineProperty(this, 'data', {
    enumerable: false,
    value: data
  });
};

var methods = {
  links: function links(n) {
    var arr = this.data.links || [];

    if (typeof n === 'number') {
      return arr[n];
    } else if (typeof n === 'string') {
      //grab a link like .links('Fortnight')
      n = n.charAt(0).toUpperCase() + n.substring(1); //titlecase it

      var link = arr.find(function (o) {
        return o.page === n;
      });
      return link === undefined ? [] : [link];
    }

    return arr;
  },
  interwiki: function interwiki(n) {
    var arr = this.links().filter(function (l) {
      return l.wiki !== undefined;
    });

    if (typeof n === 'number') {
      return arr[n];
    }

    return arr;
  },
  bolds: function bolds(n) {
    var arr = [];

    if (this.data && this.data.fmt && this.data.fmt.bold) {
      arr = this.data.fmt.bold || [];
    }

    if (typeof n === 'number') {
      return arr[n];
    }

    return arr;
  },
  italics: function italics(n) {
    var arr = [];

    if (this.data && this.data.fmt && this.data.fmt.italic) {
      arr = this.data.fmt.italic || [];
    }

    if (typeof n === 'number') {
      return arr[n];
    }

    return arr;
  },
  dates: function dates(n) {
    var arr = [];

    if (this.data && this.data.dates) {
      arr = this.data.dates || [];
    }

    if (typeof n === 'number') {
      return arr[n];
    }

    return arr;
  }
  /*
  ,
  markdown : function(options) {
  options = options || {};
  return toMarkdown(this, options);
  },
  html : function(options) {
  options = options || {};
  return toHtml(this, options);
  },
  text : function(str) {
  if (str !== undefined && typeof str === 'string') { //set the text?
    this.data.text = str;
  }
  return this.data.text || '';
  },
  json : function(options) {
  return toJSON(this, options);
  },
  latex : function(options) {
  return toLatex(this, options);
  }
  */

};
Object.keys(methods).forEach(function (k) {
  Sentence.prototype[k] = methods[k];
}); //add alises, too

/*
Object.keys(aliasList).forEach((k) => {
  Sentence.prototype[k] = methods[aliasList[k]];
});
*/

Sentence.prototype.italic = Sentence.prototype.italics;
Sentence.prototype.bold = Sentence.prototype.bolds;
Sentence.prototype.plaintext = Sentence.prototype.text;
module.exports = Sentence;

},{}],2:[function(_dereq_,module,exports){
"use strict";

//handle the bold/italics
var formatting = function formatting(obj) {
  var bolds = [];
  var italics = [];
  var wiki = obj.text || ''; //bold and italics combined 5 's

  wiki = wiki.replace(/'''''(.{0,200}?)'''''/g, function (a, b) {
    bolds.push(b);
    italics.push(b);
    return b;
  }); //''''four'''' → bold with quotes

  wiki = wiki.replace(/''''(.{0,200}?)''''/g, function (a, b) {
    bolds.push("'".concat(b, "'"));
    return "'".concat(b, "'");
  }); //'''bold'''

  wiki = wiki.replace(/'''(.{0,200}?)'''/g, function (a, b) {
    bolds.push(b);
    return b;
  }); //''italic''

  wiki = wiki.replace(/''(.{0,200}?)''/g, function (a, b) {
    italics.push(b);
    return b;
  }); //pack it all up..

  obj.text = wiki;

  if (bolds.length > 0) {
    obj.fmt = obj.fmt || {};
    obj.fmt.bold = bolds;
  }

  if (italics.length > 0) {
    obj.fmt = obj.fmt || {};
    obj.fmt.italic = italics;
  }

  return obj;
};

module.exports = formatting;

},{}],3:[function(_dereq_,module,exports){
"use strict";

var helpers = _dereq_('../lib/helpers');

var parseLinks = _dereq_('./links');

var parseFmt = _dereq_('./formatting');

var Sentence = _dereq_('./Sentence'); // const templates = require('./templates');


var sentenceParser = _dereq_('./sentence-parser');

var i18n = _dereq_('../_data/i18n');

var cat_reg = new RegExp('\\[\\[:?(' + i18n.categories.join('|') + '):[^\\]\\]]{2,80}\\]\\]', 'gi'); //return only rendered text of wiki links

var resolve_links = function resolve_links(line) {
  // categories, images, files
  line = line.replace(cat_reg, ''); // [[Common links]]

  line = line.replace(/\[\[:?([^|]{1,80}?)\]\](\w{0,5})/g, '$1$2'); // [[File:with|Size]]

  line = line.replace(/\[\[File:(.{2,80}?)\|([^\]]+?)\]\](\w{0,5})/g, ''); // [[Replaced|Links]]

  line = line.replace(/\[\[:?(.{2,80}?)\|([^\]]+?)\]\](\w{0,5})/g, '$2$3'); // External links

  line = line.replace(/\[(https?|news|ftp|mailto|gopher|irc):\/\/[^\]\| ]{4,1500}([\| ].*?)?\]/g, '$2');
  return line;
}; // console.log(resolve_links("[http://www.whistler.ca www.whistler.ca]"))


function postprocess(line) {
  //fix links
  line = resolve_links(line); //remove empty parentheses (sometimes caused by removing templates)

  line = line.replace(/\([,;: ]*\)/g, ''); //these semi-colons in parentheses are particularly troublesome

  line = line.replace(/\( *(; ?)+/g, '('); //dangling punctuation

  line = helpers.trim_whitespace(line);
  line = line.replace(/ +\.$/, '.');
  return line;
}

function oneSentence(str) {
  var obj = {
    text: postprocess(str)
  }; //pull-out the [[links]]

  var links = parseLinks(str);

  if (links) {
    obj.links = links;
  } //pull-out the bolds and ''italics''


  obj = parseFmt(obj); //pull-out things like {{start date|...}}
  // obj = templates(obj);

  return new Sentence(obj);
} //turn a text into an array of sentence objects


var parseSentences = function parseSentences(wiki) {
  var sentences = sentenceParser(wiki);
  sentences = sentences.map(oneSentence); //remove :indented first line, as it is often a disambiguation

  if (sentences[0] && sentences[0].text() && sentences[0].text()[0] === ':') {
    sentences = sentences.slice(1);
  }

  return sentences;
}; //used for consistency with other class-definitions


var addSentences = function addSentences(wiki, data) {
  data.sentences = parseSentences(wiki);
  return wiki;
};

module.exports = {
  parseSentences: parseSentences,
  oneSentence: oneSentence,
  addSentences: addSentences
};

},{"../_data/i18n":8,"../lib/helpers":12,"./Sentence":1,"./formatting":2,"./links":5,"./sentence-parser":6}],4:[function(_dereq_,module,exports){
"use strict";

var languages = _dereq_('../_data/languages'); //some colon symbols are valid links, like `America: That place`
//so we have to whitelist allowable interwiki links


var interwikis = ['wiktionary', 'wikinews', 'wikibooks', 'wikiquote', 'wikisource', 'wikispecies', 'wikiversity', 'wikivoyage', 'wikipedia', 'wikimedia', 'foundation', 'meta', 'metawikipedia', 'w', 'wikt', 'n', 'b', 'q', 's', 'v', 'voy', 'wmf', 'c', 'm', 'mw', 'phab', 'd'];
var allowed = interwikis.reduce(function (h, wik) {
  h[wik] = true;
  return h;
}, {}); //add language prefixes too..

Object.keys(languages).forEach(function (k) {
  return allowed[k] = true;
}); //this is predictably very complicated.
// https://meta.wikimedia.org/wiki/Help:Interwiki_linking

var parseInterwiki = function parseInterwiki(obj) {
  var str = obj.page || '';

  if (str.indexOf(':') !== -1) {
    var m = str.match(/^(.*):(.*)/);

    if (m === null) {
      return obj;
    }

    var site = m[1] || '';
    site = site.toLowerCase(); //only allow interwikis to these specific places

    if (allowed.hasOwnProperty(site) === false) {
      return obj;
    }

    obj.wiki = site;
    obj.page = m[2];
  }

  return obj;
};

module.exports = parseInterwiki;

},{"../_data/languages":9}],5:[function(_dereq_,module,exports){
"use strict";

// const helpers = require('../lib/helpers');
var parse_interwiki = _dereq_('./interwiki');

var ignore_links = /^:?(category|catégorie|Kategorie|Categoría|Categoria|Categorie|Kategoria|تصنيف|image|file|image|fichier|datei|media):/i;
var external_link = /\[(https?|news|ftp|mailto|gopher|irc)(:\/\/[^\]\| ]{4,1500})([\| ].*?)?\]/g;
var link_reg = /\[\[(.{0,120}?)\]\]([a-z']+)?(\w{0,10})/gi; //allow dangling suffixes - "[[flanders]]'s"
// const i18n = require('../data/i18n');
// const isFile = new RegExp('(' + i18n.images.concat(i18n.files).join('|') + '):', 'i');

var external_links = function external_links(links, str) {
  str.replace(external_link, function (all, protocol, link, text) {
    text = text || '';
    links.push({
      type: 'external',
      site: protocol + link,
      text: text.trim()
    });
    return text;
  });
  return links;
};

var internal_links = function internal_links(links, str) {
  //regular links
  str.replace(link_reg, function (_, s, apostrophe) {
    var txt = null;
    var link = s; //if somehow, we got an image here, (like in a table) remove it.
    // if (isFile.test(s) === true) {
    //   return '';
    // }

    if (s.match(/\|/)) {
      //replacement link [[link|text]]
      s = s.replace(/\[\[(.{2,80}?)\]\](\w{0,10})/g, '$1$2'); //remove ['s and keep suffix

      link = s.replace(/(.{2,60})\|.{0,200}/, '$1'); //replaced links

      txt = s.replace(/.{2,60}?\|/, ''); //handle funky case of [[toronto|]]

      if (txt === null && link.match(/\|$/)) {
        link = link.replace(/\|$/, '');
        txt = link;
      }
    } //kill off non-wikipedia namespaces


    if (link.match(ignore_links)) {
      return s;
    } //kill off just these just-anchor links [[#history]]


    if (link.match(/^#/i)) {
      return s;
    } //remove anchors from end [[toronto#history]]


    var obj = {
      page: link
    };
    obj.page = obj.page.replace(/#(.*)/, function (a, b) {
      obj.anchor = b;
      return '';
    }); //grab any fr:Paris parts

    obj = parse_interwiki(obj);

    if (txt !== null && txt !== obj.page) {
      obj.text = txt;
    } //finally, support [[link]]'s apostrophe


    if (apostrophe === '\'s') {
      obj.text = obj.text || obj.page;
      obj.text += apostrophe;
    } //titlecase it, if necessary


    if (obj.page && /^[A-Z]/.test(obj.page) === false) {
      if (!obj.text) {
        obj.text = obj.page;
      }

      obj.page = obj.page.charAt(0).toUpperCase() + obj.page.substring(1);
    }

    links.push(obj);
    return s;
  });
  return links;
}; //grab an array of internal links in the text


var parse_links = function parse_links(str) {
  var links = []; //first, parse external links

  links = external_links(links, str); //internal links

  links = internal_links(links, str);

  if (links.length === 0) {
    return undefined;
  }

  return links;
};

module.exports = parse_links;

},{"./interwiki":4}],6:[function(_dereq_,module,exports){
"use strict";

//split text into sentences, using regex
//@spencermountain MIT
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
var abbreviations = _dereq_('../_data/abbreviations');

var abbrev_reg = new RegExp('(^| )(' + abbreviations.join('|') + ')[.!?] ?$', 'i');
var acronym_reg = new RegExp('[ |.][A-Z].? +?$', 'i');
var elipses_reg = new RegExp('\\.\\.\\.* +?$');
var hasWord = new RegExp('[a-z][a-z]', 'i'); //turn a nested array into one array

var flatten = function flatten(arr) {
  var all = [];
  arr.forEach(function (a) {
    all = all.concat(a);
  });
  return all;
};

var naiive_split = function naiive_split(text) {
  //first, split by newline
  var splits = text.split(/(\n+)/);
  splits = splits.filter(function (s) {
    return s.match(/\S/);
  }); //split by period, question-mark, and exclamation-mark

  splits = splits.map(function (str) {
    return str.split(/(\S.+?[.!?]"?)(?=\s+|$)/g);
  });
  return flatten(splits);
}; // if this looks like a period within a wikipedia link, return false


var isBalanced = function isBalanced(str) {
  str = str || '';
  var open = str.split(/\[\[/) || [];
  var closed = str.split(/\]\]/) || [];

  if (open.length > closed.length) {
    return false;
  } //make sure quotes are closed too


  var quotes = str.match(/"/g);

  if (quotes && quotes.length % 2 !== 0 && str.length < 900) {
    return false;
  }

  return true;
};

var sentence_parser = function sentence_parser(text) {
  var sentences = []; //first do a greedy-split..

  var chunks = []; //ensure it 'smells like' a sentence

  if (!text || typeof text !== 'string' || !text.match(/\w/)) {
    return sentences;
  } // This was the splitter regex updated to fix quoted punctuation marks.
  // let splits = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);
  // todo: look for side effects in this regex replacement:


  var splits = naiive_split(text); //filter-out the grap ones

  for (var i = 0; i < splits.length; i++) {
    var s = splits[i];

    if (!s || s === '') {
      continue;
    } //this is meaningful whitespace


    if (!s.match(/\S/)) {
      //add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s;
        continue;
      } else if (splits[i + 1]) {
        //add it to the next one
        splits[i + 1] = s + splits[i + 1];
        continue;
      }
    }

    chunks.push(s);
  } //detection of non-sentence chunks


  var isSentence = function isSentence(hmm) {
    if (hmm.match(abbrev_reg) || hmm.match(acronym_reg) || hmm.match(elipses_reg)) {
      return false;
    } //too short? - no consecutive letters


    if (hasWord.test(hmm) === false) {
      return false;
    }

    if (!isBalanced(hmm)) {
      return false;
    }

    return true;
  }; //loop through these chunks, and join the non-sentence chunks back together..


  for (var _i = 0; _i < chunks.length; _i++) {
    //should this chunk be combined with the next one?
    if (chunks[_i + 1] && !isSentence(chunks[_i])) {
      chunks[_i + 1] = chunks[_i] + (chunks[_i + 1] || ''); //.replace(/ +/g, ' ');
    } else if (chunks[_i] && chunks[_i].length > 0) {
      //this chunk is a proper sentence..
      sentences.push(chunks[_i]);
      chunks[_i] = '';
    }
  } //if we never got a sentence, return the given text


  if (sentences.length === 0) {
    return [text];
  }

  return sentences;
};

module.exports = sentence_parser; // console.log(sentence_parser('Tony is nice. He lives in Japan.').length === 2);

},{"../_data/abbreviations":7}],7:[function(_dereq_,module,exports){
"use strict";

//these are used for the sentence-splitter
module.exports = ['jr', 'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'sen', 'corp', 'calif', 'rep', 'gov', 'atty', 'supt', 'det', 'rev', 'col', 'gen', 'lt', 'cmdr', 'adm', 'capt', 'sgt', 'cpl', 'maj', 'dept', 'univ', 'assn', 'bros', 'inc', 'ltd', 'co', 'corp', 'arc', 'al', 'ave', 'blvd', 'cl', 'ct', 'cres', 'exp', 'rd', 'st', 'dist', 'mt', 'ft', 'fy', 'hwy', 'la', 'pd', 'pl', 'plz', 'tce', 'Ala', 'Ariz', 'Ark', 'Cal', 'Calif', 'Col', 'Colo', 'Conn', 'Del', 'Fed', 'Fla', 'Ga', 'Ida', 'Id', 'Ill', 'Ind', 'Ia', 'Kan', 'Kans', 'Ken', 'Ky', 'La', 'Me', 'Md', 'Mass', 'Mich', 'Minn', 'Miss', 'Mo', 'Mont', 'Neb', 'Nebr', 'Nev', 'Mex', 'Okla', 'Ok', 'Ore', 'Penna', 'Penn', 'Pa', 'Dak', 'Tenn', 'Tex', 'Ut', 'Vt', 'Va', 'Wash', 'Wis', 'Wisc', 'Wy', 'Wyo', 'USAFA', 'Alta', 'Ont', 'QuÔøΩ', 'Sask', 'Yuk', 'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'sept', 'vs', 'etc', 'esp', 'llb', 'md', 'bl', 'phd', 'ma', 'ba', 'miss', 'misses', 'mister', 'sir', 'esq', 'mstr', 'lit', 'fl', 'ex', 'eg', 'sep', 'sept', '..'];

},{}],8:[function(_dereq_,module,exports){
"use strict";

// wikipedia special terms lifted and augmented from parsoid parser april 2015
// (not even close to being complete)
var i18n = {
  files: ['файл', 'fitxer', 'soubor', 'datei', 'file', 'archivo', 'پرونده', 'tiedosto', 'mynd', 'su\'wret', 'fichier', 'bestand', 'датотека', 'dosya', 'fil', 'ファイル', 'चित्र'],
  images: ['image', 'चित्र'],
  templates: ['шаблён', 'plantilla', 'šablona', 'vorlage', 'template', 'الگو', 'malline', 'snið', 'shablon', 'modèle', 'sjabloon', 'шаблон', 'şablon'],
  categories: ['катэгорыя', 'categoria', 'kategorie', 'category', 'categoría', 'رده', 'luokka', 'flokkur', 'kategoriya', 'catégorie', 'categorie', 'категорија', 'kategori', 'kategoria', 'تصنيف', 'श्रेणी'],
  redirects: ['перанакіраваньне', 'redirect', 'přesměruj', 'weiterleitung', 'redirección', 'redireccion', 'تغییر_مسیر', 'تغییرمسیر', 'ohjaus', 'uudelleenohjaus', 'tilvísun', 'aýdaw', 'айдау', 'redirection', 'doorverwijzing', 'преусмери', 'преусмјери', 'yönlendi̇rme', 'yönlendi̇r', '重定向', 'redirección', 'redireccion', '重定向', 'yönlendirm?e?', 'تغییر_مسیر', 'تغییرمسیر', 'перанакіраваньне', 'yönlendirme'],
  specials: ['спэцыяльныя', 'especial', 'speciální', 'spezial', 'special', 'ویژه', 'toiminnot', 'kerfissíða', 'arnawlı', 'spécial', 'speciaal', 'посебно', 'özel', '特別'],
  users: ['удзельнік', 'usuari', 'uživatel', 'benutzer', 'user', 'usuario', 'کاربر', 'käyttäjä', 'notandi', 'paydalanıwshı', 'utilisateur', 'gebruiker', 'корисник', 'kullanıcı', '利用者'],
  disambigs: ['disambig', //en
  'disambiguation', //en
  'dab', //en
  'disamb', //en
  'begriffsklärung', //de
  'ujednoznacznienie', //pl
  'doorverwijspagina', //nl
  '消歧义', //zh
  'desambiguación', //es
  'dubbelsinnig', //af
  'disambigua', //it
  'desambiguação', //pt
  'homonymie', //fr
  'неоднозначность', //ru
  'anlam ayrımı', //tr
  '曖昧さ回避' //ja
  ],
  infoboxes: ['infobox', 'ficha', 'канадский', 'inligtingskas', 'inligtingskas3', //af
  'لغة', 'bilgi kutusu', //tr
  'yerleşim bilgi kutusu', 'infoboks', //nn, no
  'ज्ञानसन्दूक'],
  sources: [//blacklist these headings, as they're not plain-text
  'references', 'see also', 'external links', 'further reading', 'notes et références', 'voir aussi', 'liens externes', '参考文献', //references (ja)
  '脚注', //citations (ja)
  '関連項目', //see also (ja)
  '外部リンク' //external links (ja)
  ]
};
var dictionary = {};
Object.keys(i18n).forEach(function (k) {
  i18n[k].forEach(function (w) {
    dictionary[w] = true;
  });
});
i18n.dictionary = dictionary;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = i18n;
}

},{}],9:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  aa: {
    english_title: 'Afar',
    direction: 'ltr',
    local_title: 'Afar'
  },
  ab: {
    english_title: 'Abkhazian',
    direction: 'ltr',
    local_title: 'Аҧсуа'
  },
  af: {
    english_title: 'Afrikaans',
    direction: 'ltr',
    local_title: 'Afrikaans'
  },
  ak: {
    english_title: 'Akan',
    direction: 'ltr',
    local_title: 'Akana'
  },
  als: {
    english_title: 'Alemannic',
    direction: 'ltr',
    local_title: 'Alemannisch'
  },
  am: {
    english_title: 'Amharic',
    direction: 'ltr',
    local_title: 'አማርኛ'
  },
  an: {
    english_title: 'Aragonese',
    direction: 'ltr',
    local_title: 'Aragonés'
  },
  ang: {
    english_title: 'Anglo-Saxon',
    direction: 'ltr',
    local_title: 'Englisc'
  },
  ar: {
    english_title: 'Arabic',
    direction: 'rtl',
    local_title: 'العربية'
  },
  arc: {
    english_title: 'Aramaic',
    direction: 'rtl',
    local_title: 'ܣܘܪܬ'
  },
  as: {
    english_title: 'Assamese',
    direction: 'ltr',
    local_title: 'অসমীয়া'
  },
  ast: {
    english_title: 'Asturian',
    direction: 'ltr',
    local_title: 'Asturianu'
  },
  av: {
    english_title: 'Avar',
    direction: 'ltr',
    local_title: 'Авар'
  },
  ay: {
    english_title: 'Aymara',
    direction: 'ltr',
    local_title: 'Aymar'
  },
  az: {
    english_title: 'Azerbaijani',
    direction: 'ltr',
    local_title: 'Azərbaycanca'
  },
  ba: {
    english_title: 'Bashkir',
    direction: 'ltr',
    local_title: 'Башҡорт'
  },
  bar: {
    english_title: 'Bavarian',
    direction: 'ltr',
    local_title: 'Boarisch'
  },
  'bat-smg': {
    english_title: 'Samogitian',
    direction: 'ltr',
    local_title: 'Žemaitėška'
  },
  bcl: {
    english_title: 'Bikol',
    direction: 'ltr',
    local_title: 'Bikol'
  },
  be: {
    english_title: 'Belarusian',
    direction: 'ltr',
    local_title: 'Беларуская'
  },
  'be-x-old': {
    english_title: 'Belarusian',
    direction: '(Taraškievica)',
    local_title: 'ltr'
  },
  bg: {
    english_title: 'Bulgarian',
    direction: 'ltr',
    local_title: 'Български'
  },
  bh: {
    english_title: 'Bihari',
    direction: 'ltr',
    local_title: 'भोजपुरी'
  },
  bi: {
    english_title: 'Bislama',
    direction: 'ltr',
    local_title: 'Bislama'
  },
  bm: {
    english_title: 'Bambara',
    direction: 'ltr',
    local_title: 'Bamanankan'
  },
  bn: {
    english_title: 'Bengali',
    direction: 'ltr',
    local_title: 'বাংলা'
  },
  bo: {
    english_title: 'Tibetan',
    direction: 'ltr',
    local_title: 'བོད་ཡིག'
  },
  bpy: {
    english_title: 'Bishnupriya',
    direction: 'Manipuri',
    local_title: 'ltr'
  },
  br: {
    english_title: 'Breton',
    direction: 'ltr',
    local_title: 'Brezhoneg'
  },
  bs: {
    english_title: 'Bosnian',
    direction: 'ltr',
    local_title: 'Bosanski'
  },
  bug: {
    english_title: 'Buginese',
    direction: 'ltr',
    local_title: 'ᨅᨔ'
  },
  bxr: {
    english_title: 'Buriat',
    direction: '(Russia)',
    local_title: 'ltr'
  },
  ca: {
    english_title: 'Catalan',
    direction: 'ltr',
    local_title: 'Català'
  },
  cdo: {
    english_title: 'Min',
    direction: 'Dong',
    local_title: 'Chinese'
  },
  ce: {
    english_title: 'Chechen',
    direction: 'ltr',
    local_title: 'Нохчийн'
  },
  ceb: {
    english_title: 'Cebuano',
    direction: 'ltr',
    local_title: 'Sinugboanong'
  },
  ch: {
    english_title: 'Chamorro',
    direction: 'ltr',
    local_title: 'Chamoru'
  },
  cho: {
    english_title: 'Choctaw',
    direction: 'ltr',
    local_title: 'Choctaw'
  },
  chr: {
    english_title: 'Cherokee',
    direction: 'ltr',
    local_title: 'ᏣᎳᎩ'
  },
  chy: {
    english_title: 'Cheyenne',
    direction: 'ltr',
    local_title: 'Tsetsêhestâhese'
  },
  co: {
    english_title: 'Corsican',
    direction: 'ltr',
    local_title: 'Corsu'
  },
  cr: {
    english_title: 'Cree',
    direction: 'ltr',
    local_title: 'Nehiyaw'
  },
  cs: {
    english_title: 'Czech',
    direction: 'ltr',
    local_title: 'Česky'
  },
  csb: {
    english_title: 'Kashubian',
    direction: 'ltr',
    local_title: 'Kaszëbsczi'
  },
  cu: {
    english_title: 'Old',
    direction: 'Church',
    local_title: 'Slavonic'
  },
  cv: {
    english_title: 'Chuvash',
    direction: 'ltr',
    local_title: 'Чăваш'
  },
  cy: {
    english_title: 'Welsh',
    direction: 'ltr',
    local_title: 'Cymraeg'
  },
  da: {
    english_title: 'Danish',
    direction: 'ltr',
    local_title: 'Dansk'
  },
  de: {
    english_title: 'German',
    direction: 'ltr',
    local_title: 'Deutsch'
  },
  diq: {
    english_title: 'Dimli',
    direction: 'ltr',
    local_title: 'Zazaki'
  },
  dsb: {
    english_title: 'Lower',
    direction: 'Sorbian',
    local_title: 'ltr'
  },
  dv: {
    english_title: 'Divehi',
    direction: 'rtl',
    local_title: 'ދިވެހިބަސް'
  },
  dz: {
    english_title: 'Dzongkha',
    direction: 'ltr',
    local_title: 'ཇོང་ཁ'
  },
  ee: {
    english_title: 'Ewe',
    direction: 'ltr',
    local_title: 'Ɛʋɛ'
  },
  far: {
    english_title: 'Farsi',
    direction: 'ltr',
    local_title: 'فارسی'
  },
  el: {
    english_title: 'Greek',
    direction: 'ltr',
    local_title: 'Ελληνικά'
  },
  en: {
    english_title: 'English',
    direction: 'ltr',
    local_title: 'English'
  },
  eo: {
    english_title: 'Esperanto',
    direction: 'ltr',
    local_title: 'Esperanto'
  },
  es: {
    english_title: 'Spanish',
    direction: 'ltr',
    local_title: 'Español'
  },
  et: {
    english_title: 'Estonian',
    direction: 'ltr',
    local_title: 'Eesti'
  },
  eu: {
    english_title: 'Basque',
    direction: 'ltr',
    local_title: 'Euskara'
  },
  ext: {
    english_title: 'Extremaduran',
    direction: 'ltr',
    local_title: 'Estremeñu'
  },
  ff: {
    english_title: 'Peul',
    direction: 'ltr',
    local_title: 'Fulfulde'
  },
  fi: {
    english_title: 'Finnish',
    direction: 'ltr',
    local_title: 'Suomi'
  },
  'fiu-vro': {
    english_title: 'Võro',
    direction: 'ltr',
    local_title: 'Võro'
  },
  fj: {
    english_title: 'Fijian',
    direction: 'ltr',
    local_title: 'Na'
  },
  fo: {
    english_title: 'Faroese',
    direction: 'ltr',
    local_title: 'Føroyskt'
  },
  fr: {
    english_title: 'French',
    direction: 'ltr',
    local_title: 'Français'
  },
  frp: {
    english_title: 'Arpitan',
    direction: 'ltr',
    local_title: 'Arpitan'
  },
  fur: {
    english_title: 'Friulian',
    direction: 'ltr',
    local_title: 'Furlan'
  },
  fy: {
    english_title: 'West',
    direction: 'Frisian',
    local_title: 'ltr'
  },
  ga: {
    english_title: 'Irish',
    direction: 'ltr',
    local_title: 'Gaeilge'
  },
  gan: {
    english_title: 'Gan',
    direction: 'Chinese',
    local_title: 'ltr'
  },
  gd: {
    english_title: 'Scottish',
    direction: 'Gaelic',
    local_title: 'ltr'
  },
  gil: {
    english_title: 'Gilbertese',
    direction: 'ltr',
    local_title: 'Taetae'
  },
  gl: {
    english_title: 'Galician',
    direction: 'ltr',
    local_title: 'Galego'
  },
  gn: {
    english_title: 'Guarani',
    direction: 'ltr',
    local_title: "Avañe'ẽ"
  },
  got: {
    english_title: 'Gothic',
    direction: 'ltr',
    local_title: 'gutisk'
  },
  gu: {
    english_title: 'Gujarati',
    direction: 'ltr',
    local_title: 'ગુજરાતી'
  },
  gv: {
    english_title: 'Manx',
    direction: 'ltr',
    local_title: 'Gaelg'
  },
  ha: {
    english_title: 'Hausa',
    direction: 'rtl',
    local_title: 'هَوُسَ'
  },
  hak: {
    english_title: 'Hakka',
    direction: 'Chinese',
    local_title: 'ltr'
  },
  haw: {
    english_title: 'Hawaiian',
    direction: 'ltr',
    local_title: 'Hawai`i'
  },
  he: {
    english_title: 'Hebrew',
    direction: 'rtl',
    local_title: 'עברית'
  },
  hi: {
    english_title: 'Hindi',
    direction: 'ltr',
    local_title: 'हिन्दी'
  },
  ho: {
    english_title: 'Hiri',
    direction: 'Motu',
    local_title: 'ltr'
  },
  hr: {
    english_title: 'Croatian',
    direction: 'ltr',
    local_title: 'Hrvatski'
  },
  ht: {
    english_title: 'Haitian',
    direction: 'ltr',
    local_title: 'Krèyol'
  },
  hu: {
    english_title: 'Hungarian',
    direction: 'ltr',
    local_title: 'Magyar'
  },
  hy: {
    english_title: 'Armenian',
    direction: 'ltr',
    local_title: 'Հայերեն'
  },
  hz: {
    english_title: 'Herero',
    direction: 'ltr',
    local_title: 'Otsiherero'
  },
  ia: {
    english_title: 'Interlingua',
    direction: 'ltr',
    local_title: 'Interlingua'
  },
  id: {
    english_title: 'Indonesian',
    direction: 'ltr',
    local_title: 'Bahasa'
  },
  ie: {
    english_title: 'Interlingue',
    direction: 'ltr',
    local_title: 'Interlingue'
  },
  ig: {
    english_title: 'Igbo',
    direction: 'ltr',
    local_title: 'Igbo'
  },
  ii: {
    english_title: 'Sichuan',
    direction: 'Yi',
    local_title: 'ltr'
  },
  ik: {
    english_title: 'Inupiak',
    direction: 'ltr',
    local_title: 'Iñupiak'
  },
  ilo: {
    english_title: 'Ilokano',
    direction: 'ltr',
    local_title: 'Ilokano'
  },
  io: {
    english_title: 'Ido',
    direction: 'ltr',
    local_title: 'Ido'
  },
  is: {
    english_title: 'Icelandic',
    direction: 'ltr',
    local_title: 'Íslenska'
  },
  it: {
    english_title: 'Italian',
    direction: 'ltr',
    local_title: 'Italiano'
  },
  iu: {
    english_title: 'Inuktitut',
    direction: 'ltr',
    local_title: 'ᐃᓄᒃᑎᑐᑦ'
  },
  ja: {
    english_title: 'Japanese',
    direction: 'ltr',
    local_title: '日本語'
  },
  jbo: {
    english_title: 'Lojban',
    direction: 'ltr',
    local_title: 'Lojban'
  },
  jv: {
    english_title: 'Javanese',
    direction: 'ltr',
    local_title: 'Basa'
  },
  ka: {
    english_title: 'Georgian',
    direction: 'ltr',
    local_title: 'ქართული'
  },
  kg: {
    english_title: 'Kongo',
    direction: 'ltr',
    local_title: 'KiKongo'
  },
  ki: {
    english_title: 'Kikuyu',
    direction: 'ltr',
    local_title: 'Gĩkũyũ'
  },
  kj: {
    english_title: 'Kuanyama',
    direction: 'ltr',
    local_title: 'Kuanyama'
  },
  kk: {
    english_title: 'Kazakh',
    direction: 'ltr',
    local_title: 'Қазақша'
  },
  kl: {
    english_title: 'Greenlandic',
    direction: 'ltr',
    local_title: 'Kalaallisut'
  },
  km: {
    english_title: 'Cambodian',
    direction: 'ltr',
    local_title: 'ភាសាខ្មែរ'
  },
  kn: {
    english_title: 'Kannada',
    direction: 'ltr',
    local_title: 'ಕನ್ನಡ'
  },
  khw: {
    english_title: 'Khowar',
    direction: 'rtl',
    local_title: 'کھوار'
  },
  ko: {
    english_title: 'Korean',
    direction: 'ltr',
    local_title: '한국어'
  },
  kr: {
    english_title: 'Kanuri',
    direction: 'ltr',
    local_title: 'Kanuri'
  },
  ks: {
    english_title: 'Kashmiri',
    direction: 'rtl',
    local_title: 'कश्मीरी'
  },
  ksh: {
    english_title: 'Ripuarian',
    direction: 'ltr',
    local_title: 'Ripoarisch'
  },
  ku: {
    english_title: 'Kurdish',
    direction: 'rtl',
    local_title: 'Kurdî'
  },
  kv: {
    english_title: 'Komi',
    direction: 'ltr',
    local_title: 'Коми'
  },
  kw: {
    english_title: 'Cornish',
    direction: 'ltr',
    local_title: 'Kernewek'
  },
  ky: {
    english_title: 'Kirghiz',
    direction: 'ltr',
    local_title: 'Kırgızca'
  },
  la: {
    english_title: 'Latin',
    direction: 'ltr',
    local_title: 'Latina'
  },
  lad: {
    english_title: 'Ladino',
    direction: 'ltr',
    local_title: 'Dzhudezmo'
  },
  lan: {
    english_title: 'Lango',
    direction: 'ltr',
    local_title: 'Leb'
  },
  lb: {
    english_title: 'Luxembourgish',
    direction: 'ltr',
    local_title: 'Lëtzebuergesch'
  },
  lg: {
    english_title: 'Ganda',
    direction: 'ltr',
    local_title: 'Luganda'
  },
  li: {
    english_title: 'Limburgian',
    direction: 'ltr',
    local_title: 'Limburgs'
  },
  lij: {
    english_title: 'Ligurian',
    direction: 'ltr',
    local_title: 'Líguru'
  },
  lmo: {
    english_title: 'Lombard',
    direction: 'ltr',
    local_title: 'Lumbaart'
  },
  ln: {
    english_title: 'Lingala',
    direction: 'ltr',
    local_title: 'Lingála'
  },
  lo: {
    english_title: 'Laotian',
    direction: 'ltr',
    local_title: 'ລາວ'
  },
  lt: {
    english_title: 'Lithuanian',
    direction: 'ltr',
    local_title: 'Lietuvių'
  },
  lv: {
    english_title: 'Latvian',
    direction: 'ltr',
    local_title: 'Latviešu'
  },
  'map-bms': {
    english_title: 'Banyumasan',
    direction: 'ltr',
    local_title: 'Basa'
  },
  mg: {
    english_title: 'Malagasy',
    direction: 'ltr',
    local_title: 'Malagasy'
  },
  man: {
    english_title: 'Mandarin',
    direction: 'ltr',
    local_title: '官話'
  },
  mh: {
    english_title: 'Marshallese',
    direction: 'ltr',
    local_title: 'Kajin'
  },
  mi: {
    english_title: 'Maori',
    direction: 'ltr',
    local_title: 'Māori'
  },
  min: {
    english_title: 'Minangkabau',
    direction: 'ltr',
    local_title: 'Minangkabau'
  },
  mk: {
    english_title: 'Macedonian',
    direction: 'ltr',
    local_title: 'Македонски'
  },
  ml: {
    english_title: 'Malayalam',
    direction: 'ltr',
    local_title: 'മലയാളം'
  },
  mn: {
    english_title: 'Mongolian',
    direction: 'ltr',
    local_title: 'Монгол'
  },
  mo: {
    english_title: 'Moldovan',
    direction: 'ltr',
    local_title: 'Moldovenească'
  },
  mr: {
    english_title: 'Marathi',
    direction: 'ltr',
    local_title: 'मराठी'
  },
  ms: {
    english_title: 'Malay',
    direction: 'ltr',
    local_title: 'Bahasa'
  },
  mt: {
    english_title: 'Maltese',
    direction: 'ltr',
    local_title: 'bil-Malti'
  },
  mus: {
    english_title: 'Creek',
    direction: 'ltr',
    local_title: 'Muskogee'
  },
  my: {
    english_title: 'Burmese',
    direction: 'ltr',
    local_title: 'Myanmasa'
  },
  na: {
    english_title: 'Nauruan',
    direction: 'ltr',
    local_title: 'Dorerin'
  },
  nah: {
    english_title: 'Nahuatl',
    direction: 'ltr',
    local_title: 'Nahuatl'
  },
  nap: {
    english_title: 'Neapolitan',
    direction: 'ltr',
    local_title: 'Nnapulitano'
  },
  nd: {
    english_title: 'North',
    direction: 'Ndebele',
    local_title: 'ltr'
  },
  nds: {
    english_title: 'Low German',
    direction: 'ltr',
    local_title: 'Plattdüütsch'
  },
  'nds-nl': {
    english_title: 'Dutch',
    direction: 'Low',
    local_title: 'Saxon'
  },
  ne: {
    english_title: 'Nepali',
    direction: 'ltr',
    local_title: 'नेपाली'
  },
  new: {
    english_title: 'Newar',
    direction: 'ltr',
    local_title: 'नेपालभाषा'
  },
  ng: {
    english_title: 'Ndonga',
    direction: 'ltr',
    local_title: 'Oshiwambo'
  },
  nl: {
    english_title: 'Dutch',
    direction: 'ltr',
    local_title: 'Nederlands'
  },
  nn: {
    english_title: 'Norwegian',
    direction: 'Nynorsk',
    local_title: 'ltr'
  },
  no: {
    english_title: 'Norwegian',
    direction: 'ltr',
    local_title: 'Norsk'
  },
  nr: {
    english_title: 'South',
    direction: 'Ndebele',
    local_title: 'ltr'
  },
  nso: {
    english_title: 'Northern',
    direction: 'Sotho',
    local_title: 'ltr'
  },
  nrm: {
    english_title: 'Norman',
    direction: 'ltr',
    local_title: 'Nouormand'
  },
  nv: {
    english_title: 'Navajo',
    direction: 'ltr',
    local_title: 'Diné'
  },
  ny: {
    english_title: 'Chichewa',
    direction: 'ltr',
    local_title: 'Chi-Chewa'
  },
  oc: {
    english_title: 'Occitan',
    direction: 'ltr',
    local_title: 'Occitan'
  },
  oj: {
    english_title: 'Ojibwa',
    direction: 'ltr',
    local_title: 'ᐊᓂᔑᓈᐯᒧᐎᓐ'
  },
  om: {
    english_title: 'Oromo',
    direction: 'ltr',
    local_title: 'Oromoo'
  },
  or: {
    english_title: 'Oriya',
    direction: 'ltr',
    local_title: 'ଓଡ଼ିଆ'
  },
  os: {
    english_title: 'Ossetian',
    direction: 'ltr',
    local_title: 'Иронау'
  },
  pa: {
    english_title: 'Panjabi',
    direction: 'ltr',
    local_title: 'ਪੰਜਾਬੀ'
  },
  pag: {
    english_title: 'Pangasinan',
    direction: 'ltr',
    local_title: 'Pangasinan'
  },
  pam: {
    english_title: 'Kapampangan',
    direction: 'ltr',
    local_title: 'Kapampangan'
  },
  pap: {
    english_title: 'Papiamentu',
    direction: 'ltr',
    local_title: 'Papiamentu'
  },
  pdc: {
    english_title: 'Pennsylvania',
    direction: 'German',
    local_title: 'ltr'
  },
  pi: {
    english_title: 'Pali',
    direction: 'ltr',
    local_title: 'Pāli'
  },
  pih: {
    english_title: 'Norfolk',
    direction: 'ltr',
    local_title: 'Norfuk'
  },
  pl: {
    english_title: 'Polish',
    direction: 'ltr',
    local_title: 'Polski'
  },
  pms: {
    english_title: 'Piedmontese',
    direction: 'ltr',
    local_title: 'Piemontèis'
  },
  ps: {
    english_title: 'Pashto',
    direction: 'rtl',
    local_title: 'پښتو'
  },
  pt: {
    english_title: 'Portuguese',
    direction: 'ltr',
    local_title: 'Português'
  },
  qu: {
    english_title: 'Quechua',
    direction: 'ltr',
    local_title: 'Runa'
  },
  rm: {
    english_title: 'Raeto',
    direction: 'Romance',
    local_title: 'ltr'
  },
  rmy: {
    english_title: 'Romani',
    direction: 'ltr',
    local_title: 'Romani'
  },
  rn: {
    english_title: 'Kirundi',
    direction: 'ltr',
    local_title: 'Kirundi'
  },
  ro: {
    english_title: 'Romanian',
    direction: 'ltr',
    local_title: 'Română'
  },
  'roa-rup': {
    english_title: 'Aromanian',
    direction: 'ltr',
    local_title: 'Armâneashti'
  },
  ru: {
    english_title: 'Russian',
    direction: 'ltr',
    local_title: 'Русский'
  },
  rw: {
    english_title: 'Rwandi',
    direction: 'ltr',
    local_title: 'Kinyarwandi'
  },
  sa: {
    english_title: 'Sanskrit',
    direction: 'ltr',
    local_title: 'संस्कृतम्'
  },
  sc: {
    english_title: 'Sardinian',
    direction: 'ltr',
    local_title: 'Sardu'
  },
  scn: {
    english_title: 'Sicilian',
    direction: 'ltr',
    local_title: 'Sicilianu'
  },
  sco: {
    english_title: 'Scots',
    direction: 'ltr',
    local_title: 'Scots'
  },
  sd: {
    english_title: 'Sindhi',
    direction: 'ltr',
    local_title: 'सिनधि'
  },
  se: {
    english_title: 'Northern',
    direction: 'Sami',
    local_title: 'ltr'
  },
  sg: {
    english_title: 'Sango',
    direction: 'ltr',
    local_title: 'Sängö'
  },
  sh: {
    english_title: 'Serbo-Croatian',
    direction: 'ltr',
    local_title: 'Srpskohrvatski'
  },
  si: {
    english_title: 'Sinhalese',
    direction: 'ltr',
    local_title: 'සිංහල'
  },
  simple: {
    english_title: 'Simple',
    direction: 'English',
    local_title: 'ltr'
  },
  sk: {
    english_title: 'Slovak',
    direction: 'ltr',
    local_title: 'Slovenčina'
  },
  sl: {
    english_title: 'Slovenian',
    direction: 'ltr',
    local_title: 'Slovenščina'
  },
  sm: {
    english_title: 'Samoan',
    direction: 'ltr',
    local_title: 'Gagana'
  },
  sn: {
    english_title: 'Shona',
    direction: 'ltr',
    local_title: 'chiShona'
  },
  so: {
    english_title: 'Somalia',
    direction: 'ltr',
    local_title: 'Soomaaliga'
  },
  sq: {
    english_title: 'Albanian',
    direction: 'ltr',
    local_title: 'Shqip'
  },
  sr: {
    english_title: 'Serbian',
    direction: 'ltr',
    local_title: 'Српски'
  },
  ss: {
    english_title: 'Swati',
    direction: 'ltr',
    local_title: 'SiSwati'
  },
  st: {
    english_title: 'Southern',
    direction: 'Sotho',
    local_title: 'ltr'
  },
  su: {
    english_title: 'Sundanese',
    direction: 'ltr',
    local_title: 'Basa'
  },
  sv: {
    english_title: 'Swedish',
    direction: 'ltr',
    local_title: 'Svenska'
  },
  sw: {
    english_title: 'Swahili',
    direction: 'ltr',
    local_title: 'Kiswahili'
  },
  ta: {
    english_title: 'Tamil',
    direction: 'ltr',
    local_title: 'தமிழ்'
  },
  te: {
    english_title: 'Telugu',
    direction: 'ltr',
    local_title: 'తెలుగు'
  },
  tet: {
    english_title: 'Tetum',
    direction: 'ltr',
    local_title: 'Tetun'
  },
  tg: {
    english_title: 'Tajik',
    direction: 'ltr',
    local_title: 'Тоҷикӣ'
  },
  th: {
    english_title: 'Thai',
    direction: 'ltr',
    local_title: 'ไทย'
  },
  ti: {
    english_title: 'Tigrinya',
    direction: 'ltr',
    local_title: 'ትግርኛ'
  },
  tk: {
    english_title: 'Turkmen',
    direction: 'ltr',
    local_title: 'Туркмен'
  },
  tl: {
    english_title: 'Tagalog',
    direction: 'ltr',
    local_title: 'Tagalog'
  },
  tlh: {
    english_title: 'Klingon',
    direction: 'ltr',
    local_title: 'tlhIngan-Hol'
  },
  tn: {
    english_title: 'Tswana',
    direction: 'ltr',
    local_title: 'Setswana'
  },
  to: {
    english_title: 'Tonga',
    direction: 'ltr',
    local_title: 'Lea'
  },
  tpi: {
    english_title: 'Tok',
    direction: 'Pisin',
    local_title: 'ltr'
  },
  tr: {
    english_title: 'Turkish',
    direction: 'ltr',
    local_title: 'Türkçe'
  },
  ts: {
    english_title: 'Tsonga',
    direction: 'ltr',
    local_title: 'Xitsonga'
  },
  tt: {
    english_title: 'Tatar',
    direction: 'ltr',
    local_title: 'Tatarça'
  },
  tum: {
    english_title: 'Tumbuka',
    direction: 'ltr',
    local_title: 'chiTumbuka'
  },
  tw: {
    english_title: 'Twi',
    direction: 'ltr',
    local_title: 'Twi'
  },
  ty: {
    english_title: 'Tahitian',
    direction: 'ltr',
    local_title: 'Reo'
  },
  udm: {
    english_title: 'Udmurt',
    direction: 'ltr',
    local_title: 'Удмурт'
  },
  ug: {
    english_title: 'Uyghur',
    direction: 'ltr',
    local_title: 'Uyƣurqə'
  },
  uk: {
    english_title: 'Ukrainian',
    direction: 'ltr',
    local_title: 'Українська'
  },
  ur: {
    english_title: 'Urdu',
    direction: 'rtl',
    local_title: 'اردو'
  },
  uz: {
    english_title: 'Uzbek',
    direction: 'ltr',
    local_title: 'Ўзбек'
  },
  ve: {
    english_title: 'Venda',
    direction: 'ltr',
    local_title: 'Tshivenḓa'
  },
  vi: {
    english_title: 'Vietnamese',
    direction: 'ltr',
    local_title: 'Việtnam'
  },
  vec: {
    english_title: 'Venetian',
    direction: 'ltr',
    local_title: 'Vèneto'
  },
  vls: {
    english_title: 'West',
    direction: 'Flemish',
    local_title: 'ltr'
  },
  vo: {
    english_title: 'Volapük',
    direction: 'ltr',
    local_title: 'Volapük'
  },
  wa: {
    english_title: 'Walloon',
    direction: 'ltr',
    local_title: 'Walon'
  },
  war: {
    english_title: 'Waray-Waray',
    direction: 'ltr',
    local_title: 'Winaray'
  },
  wo: {
    english_title: 'Wolof',
    direction: 'ltr',
    local_title: 'Wollof'
  },
  xal: {
    english_title: 'Kalmyk',
    direction: 'ltr',
    local_title: 'Хальмг'
  },
  xh: {
    english_title: 'Xhosa',
    direction: 'ltr',
    local_title: 'isiXhosa'
  },
  yi: {
    english_title: 'Yiddish',
    direction: 'rtl',
    local_title: 'ייִדיש'
  },
  yo: {
    english_title: 'Yoruba',
    direction: 'ltr',
    local_title: 'Yorùbá'
  },
  za: {
    english_title: 'Zhuang',
    direction: 'ltr',
    local_title: 'Cuengh'
  },
  zh: {
    english_title: 'Chinese',
    direction: 'ltr',
    local_title: '中文'
  },
  'zh-classical': {
    english_title: 'Classical',
    direction: 'Chinese',
    local_title: 'ltr'
  },
  'zh-min-nan': {
    english_title: 'Minnan',
    direction: 'ltr',
    local_title: 'Bân-lâm-gú'
  },
  'zh-yue': {
    english_title: 'Cantonese',
    direction: 'ltr',
    local_title: '粵語'
  },
  zu: {
    english_title: 'Zulu',
    direction: 'ltr',
    local_title: 'isiZulu'
  }
};

},{}],10:[function(_dereq_,module,exports){
"use strict";

module.exports = '2.0.0';

},{}],11:[function(_dereq_,module,exports){
"use strict";

/* Tokenizer replaces
  * Math Expression by Tokens of type
     ___MATH_INLINE_793249879_ID_5___
     ___MATH_BLOCK_793249879_ID_6___
    and pushes the mathe code in the JSON data
  * Citations
     replace <ref name="my citation" />
     by
     ___CITE_LABEL_my_citation___
*/
// console.log("Require: './lib/parseWiki'");
var parseWiki = _dereq_('./lib/parseWiki'); // console.log("Require: 'token4math.js'");


var mathTokenizer = _dereq_('./token4math'); // console.log("Require: 'token4citation.js'");


var citationTokenizer = _dereq_('./token4citation'); // console.log("Require: 'token4citation.js' loaded");


var sd = _dereq_('./lib/setDefaults');

var getParserOptions = sd.getParserOptions; // console.log("Require: '_version.js'");
//const version = require('../package.json').version;

var version = _dereq_('./_version.js'); //const parseDocument = require('./01-document/index.js');
//the main 'factory' exported method


var tokenizer = function tokenizer(wiki, data, options) {
  return parseDocument(wiki, data, options);
};

tokenizer.math = _dereq_("./token4math.js");
tokenizer.citation = _dereq_("./token4citation.js");

tokenizer.parse = function (wiki, data, options, cb) {
  var parsed_wiki = parseDocument(wiki, data, options);

  if (cb) {
    // execute callback function
    wiki = cb(wiki, data, options);
  }

  data.wiki = wiki;
  return parseWiki(wiki, data, options, cb);
};
/*
options = {
  "wiki": "Wiki Content",
  "title": "Wiki Title",
  "lang": "en",
  "domain": "wikipedia"
}
 data = {
  "mathexp": [
    {
      "type":"block",
      "label": "___MATH_BLOCK_78294924792_ID_1___",
      "math": "\\sum_{k=1}^{n} k^2"
    },
    {
      "type":"inline",
      "label": "___MATH_BLOCK_78294924792_ID_2___",
      "math": "\\sin(x^2) + \\cos(y^2)"
    }
   ]
}
}
*/
//return the parsed Wiki with the tokens


tokenizer.check_call = function (ptokenizer, parseid, text, data, options) {
  if (options.parse[parseid] && options.parse[parseid] == false) {
    console.log("wtf_tokenize." + parseid + "() was not called. options.parse." + parseid + "=false");
  } else {
    text = ptokenizer.parse(text, data, options);
    console.log("wtf_tokenize." + parseid + "() was called.");
  }

  return text;
};

tokenizer.parse = function (text, data, options, cb) {
  /*
  options = {
    "parse": {
      "math": true,
      "citation": true
    }
  }
  */
  // tokenize math and citations if options.parse-booleans are not set to false
  text = this.check_call(mathTokenizer, "math", text, data, options);
  text = this.check_call(citationTokenizer, "citation", text, data, options);

  if (cb) {
    text = cb(text, data, options);
  }

  return text;
};

tokenizer.html = function (text, data, options, cb) {
  return toHtml(lang, domain, options, cb);
};

tokenizer.reveal = function (text, data, options, cb) {
  return toReveal(lang, domain, options, cb);
};

tokenizer.latex = function (text, data, options, cb) {
  return toLatex(text, data, options, cb);
};

tokenizer.markdown = function (text, data, options, cb) {
  return toMarkdown(text, data, options, cb);
};

tokenizer.json = function (text, data, options, cb) {
  return toJSON(text, data, options, cb);
};

tokenizer.version = version;
console.log("wtf_tokenize - version " + version + "is loaded");
module.exports = tokenizer;

},{"./_version.js":10,"./lib/parseWiki":13,"./lib/setDefaults":14,"./token4citation":29,"./token4citation.js":29,"./token4math":30,"./token4math.js":30}],12:[function(_dereq_,module,exports){
"use strict";

var helpers = {
  capitalise: function capitalise(str) {
    if (str && typeof str === 'string') {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return '';
  },
  onlyUnique: function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  },
  trim_whitespace: function trim_whitespace(str) {
    if (str && typeof str === 'string') {
      str = str.replace(/^\s\s*/, '');
      str = str.replace(/\s\s*$/, '');
      str = str.replace(/ {2}/, ' ');
      str = str.replace(/\s, /, ', ');
      return str;
    }

    return '';
  }
};
module.exports = helpers;

},{}],13:[function(_dereq_,module,exports){
"use strict";

},{}],14:[function(_dereq_,module,exports){
"use strict";

//
var setDefaults = function setDefaults(options, defaults) {
  var obj = {};
  defaults = defaults || {};
  Object.keys(defaults).forEach(function (k) {
    obj[k] = defaults[k];
  });
  options = options || {};
  Object.keys(options).forEach(function (k) {
    obj[k] = options[k];
  });
  return obj;
};

var getParserOptions = function getParserOptions(options) {
  var defaults = {
    "wiki": "Undefined Wiki Content",
    "title": "Undefined Title)",
    "lang": "en",
    "domain": "wikipedia",
    "math": {
      "isparsed": true,
      "tokens": []
    }
  };
  return setDefaults(options, defaults);
};

module.exports = {
  "setDefaults": setDefaults,
  "getParserOptions": getParserOptions
};

},{}],15:[function(_dereq_,module,exports){
"use strict";

var setTimeID = function setTimeID(data) {
  if (data.hasOwnProperty("timeid")) {
    console.log("data.timeid exists!");
  } else {
    console.log("data.timeid created!");
    var now = new Date();
    data.timeid = now.getTime();
  }

  ;
};

var replaceString = function replaceString(pString, pSearch, pReplace) {
  //----Debugging------------------------------------------
  // console.log("js/wikiconvert.js - Call: replaceString(pString:String,pSearch:String,pReplace:String):String");
  // alert("src/lib/tokenlib.js - Call: replaceString(pString:String,pSearch:String,pReplace:String):String");
  //-------------------------------------------------------
  //alert("cstring.js - replaceString() "+pString);
  if (!pString) {
    alert("replaceString()-Call - pString not defined!");
  } else if (pString != '') {
    //alert("cstring.js - replaceString() "+pString);
    var vHelpString = '';
    var vN = pString.indexOf(pSearch);
    var vReturnString = '';

    while (vN >= 0) {
      if (vN > 0) vReturnString += pString.substring(0, vN);
      vReturnString += pReplace;

      if (vN + pSearch.length < pString.length) {
        pString = pString.substring(vN + pSearch.length, pString.length);
      } else {
        pString = '';
      }

      ;
      vN = pString.indexOf(pSearch);
    }

    ;
    return vReturnString + pString;
  }

  ;
}; //----End of Method replaceString Definition


var tokenlib = {
  "setTimeID": setTimeID,
  "replaceString": replaceString
};
module.exports = tokenlib;

},{}],16:[function(_dereq_,module,exports){
"use strict";

// console.log("try to load 'parsers/keyValue.js'");
var keyValue = _dereq_('./parsers/keyValue'); // console.log("try to load 'parsers/inside.js'");


var getInside = _dereq_('./parsers/inside'); // console.log("try to load 'parsers/pipeSplit.js'");


var pipeSplit = _dereq_('./parsers/pipeSplit'); // console.log("try to load 'parsers/pipeList.js'");


var pipeList = _dereq_('./parsers/pipeList');

var sisterProjects = {
  wikt: 'wiktionary',
  commons: 'commons',
  c: 'commons',
  commonscat: 'commonscat',
  n: 'wikinews',
  q: 'wikiquote',
  s: 'wikisource',
  a: 'wikiauthor',
  b: 'wikibooks',
  voy: 'wikivoyage',
  v: 'wikiversity',
  d: 'wikidata',
  species: 'wikispecies',
  m: 'meta',
  mw: 'mediawiki'
};
var parsers = {
  'book bar': pipeList,
  main: function main(tmpl) {
    var obj = getInside(tmpl);
    return {
      template: 'main',
      page: obj.data
    };
  },
  wide_image: function wide_image(tmpl) {
    var obj = getInside(tmpl);
    return {
      template: 'wide_image',
      image: obj.data
    };
  },
  //https://en.wikipedia.org/wiki/Template:Taxon_info
  'taxon info': function taxonInfo(tmpl) {
    var order = ['taxon', 'item'];
    return pipeSplit(tmpl, order);
  },
  'uss': function uss(tmpl) {
    var order = ['ship', 'id'];
    return pipeSplit(tmpl, order);
  },
  //same in every language.
  citation: function citation(tmpl) {
    var data = keyValue(tmpl);
    return {
      template: 'citation',
      data: data
    };
  },
  //https://en.wikipedia.org/wiki/Template:Redirect
  redirect: function redirect(tmpl) {
    var data = pipeList(tmpl).data;
    var links = [];

    for (var i = 1; i < data.length; i += 2) {
      links.push({
        page: data[i + 1],
        desc: data[i]
      });
    }

    return {
      template: 'redirect',
      redirect: data[0],
      links: links
    };
  },
  //this one sucks - https://en.wikipedia.org/wiki/Template:GNIS
  'cite gnis': function citeGnis(tmpl) {
    var order = ['id', 'name', 'type'];
    var data = pipeSplit(tmpl, order);
    return {
      template: 'citation',
      type: 'gnis',
      data: data
    };
  },
  'sfn': function sfn(tmpl) {
    var order = ['author', 'year', 'location'];
    var data = pipeSplit(tmpl, order);
    return {
      template: 'citation',
      type: 'sfn',
      data: data
    };
  },
  'audio': function audio(tmpl) {
    var order = ['file', 'text', 'type'];
    var obj = pipeSplit(tmpl, order);
    return obj;
  },
  'spoken wikipedia': function spokenWikipedia(tmpl) {
    var order = ['file', 'date'];
    var obj = pipeSplit(tmpl, order);
    obj.template = 'audio';
    return obj;
  },
  //https://en.wikipedia.org/wiki/Template:Sister_project_links
  'sister project links': function sisterProjectLinks(tmpl) {
    var data = keyValue(tmpl);
    var links = {};
    Object.keys(sisterProjects).forEach(function (k) {
      if (data.hasOwnProperty(k) === true) {
        links[sisterProjects[k]] = data[k]; //.text();
      }
    });
    return {
      template: 'sister project links',
      links: links
    };
  },
  //https://en.wikipedia.org/wiki/Template:Subject_bar
  'subject bar': function subjectBar(tmpl) {
    var data = keyValue(tmpl);
    Object.keys(data).forEach(function (k) {
      if (sisterProjects.hasOwnProperty(k)) {
        data[sisterProjects[k]] = data[k];
        delete data[k];
      }
    });
    return {
      template: 'subject bar',
      links: data
    };
  },
  'short description': function shortDescription(tmpl) {
    var data = pipeList(tmpl);
    return {
      template: data.template,
      description: data.data[0]
    };
  },
  'good article': function goodArticle() {
    return {
      template: 'Good article'
    };
  },
  'climate chart': function climateChart(tmpl) {
    var list = pipeList(tmpl).data;
    var title = list[0];
    var source = list[38];
    list = list.slice(1); //amazingly, they use '−' symbol here instead of negatives...

    list = list.map(function (str) {
      if (str && str[0] === '−') {
        str = str.replace(/−/, '-');
      }

      return str;
    });
    var months = []; //groups of three, for 12 months

    for (var i = 0; i < 36; i += 3) {
      months.push({
        low: Number(list[i]),
        high: Number(list[i + 1]),
        precip: Number(list[i + 2])
      });
    }

    return {
      template: 'climate chart',
      data: {
        title: title,
        source: source,
        months: months
      }
    };
  },
  '__throw-wtf-error': function __throwWtfError() {
    //okay you asked for it!
    throw new Error('Intentional error thrown from wtf-wikipedia!');
  }
}; //aliases

parsers['cite'] = parsers.citation;
parsers['sfnref'] = parsers.sfn;
parsers['harvid'] = parsers.sfn;
parsers['harvnb'] = parsers.sfn;
parsers['redir'] = parsers.redirect;
parsers['sisterlinks'] = parsers['sister project links']; // console.log("export parsers in 'misc.js'");

module.exports = parsers;

},{"./parsers/inside":21,"./parsers/keyValue":22,"./parsers/pipeList":23,"./parsers/pipeSplit":24}],17:[function(_dereq_,module,exports){
"use strict";

//get the name of the template
//templates are usually '{{name|stuff}}'
// console.log("require _getName.js");
var getName = function getName(tmpl) {
  var name = null; //{{name|foo}}

  if (/^\{\{[^\n]+\|/.test(tmpl)) {
    name = (tmpl.match(/^\{\{(.+?)\|/) || [])[1];
  } else if (tmpl.indexOf('\n') !== -1) {
    // {{name \n...
    name = (tmpl.match(/^\{\{(.+?)\n/) || [])[1];
  } else {
    //{{name here}}
    name = (tmpl.match(/^\{\{(.+?)\}\}$/) || [])[1];
  }

  if (name) {
    name = name.replace(/:.*/, '');
    name = name.trim().toLowerCase();
  }

  return name || null;
}; // console.log(templateName('{{name|foo}}'));
// console.log(templateName('{{name here}}'));
// console.log(templateName('{{CITE book |title=the killer and the cartoons }}'));
// console.log(templateName(`{{name
// |key=val}}`));


module.exports = getName;

},{}],18:[function(_dereq_,module,exports){
"use strict";

var strip = _dereq_('./_strip');

var parseSentence = _dereq_('../04-sentence').oneSentence; //try to handle inline-wikitext, (like links) inside the pipe-text


var tightenUp = function tightenUp(arr) {
  return arr.map(function (str) {
    if (str && str.indexOf('[') !== -1) {
      var s = parseSentence(str);

      if (s.links() && s.links().length > 0) {
        return s.links(0).page;
      }

      return s.text();
    }

    return str;
  });
}; // this splits a text-segment by '|' characters, but does so carefully


var pipes = function pipes(tmpl) {
  tmpl = strip(tmpl);
  var arr = tmpl.split(/\|/g);

  for (var i = 0; i < arr.length; i += 1) {
    var str = arr[i]; //stitch [[link|text]] pieces back together

    if (/\[\[[^\]]+$/.test(str) === true && /^[^\[]+\]\]/.test(arr[i + 1]) === true) {
      arr[i] += '|' + arr[i + 1];
      arr[i + 1] = null;
    } //stitch {{imdb|8392}} pieces back together, too


    if (/\{\{[^\}]+$/.test(str) === true && /^[^\{]+\}\}/.test(arr[i + 1]) === true) {
      arr[i] += '|' + arr[i + 1];
      arr[i + 1] = null;
    }
  }

  var name = arr[0] || '';
  arr = arr.slice(1);
  return {
    name: name.trim().toLowerCase(),
    list: tightenUp(arr)
  };
};

module.exports = pipes;

},{"../04-sentence":3,"./_strip":19}],19:[function(_dereq_,module,exports){
"use strict";

//remove the top/bottom off the template
// console.log("strip()");
var strip = function strip(tmpl) {
  tmpl = tmpl.replace(/^\{\{/, '');
  tmpl = tmpl.replace(/\}\}$/, '');
  return tmpl;
};

module.exports = strip;

},{}],20:[function(_dereq_,module,exports){
"use strict";

// console.log("try to run parsers/generic.js");
var keyValue = _dereq_('./keyValue'); // console.log("try to run parsers/keyValue.js");


var getName = _dereq_('./_getName'); // console.log("try to run parsers/getName.js");


var maybeKeyValue = /\|.+?[a-z].+?=/; // |foo=

var knownTemplate = function knownTemplate(name) {
  if (/cite [a-z0-9]/.test(name) || name.toLowerCase().trim() === 'citation') {
    return 'citation';
  }

  return null;
}; // console.log("define genericTemplate()");
//just go for it.


var genericTemplate = function genericTemplate(tmpl) {
  if (maybeKeyValue.test(tmpl)) {
    var name = getName(tmpl);

    if (name === null) {
      return null;
    }

    var data = keyValue(tmpl);

    if (data) {
      var obj = {
        name: name,
        data: data
      };
      var template = knownTemplate(name);

      if (template) {
        obj.template = template;
      }

      return obj;
    }
  }

  return null;
}; // console.log("export './parsers/generic' module");


module.exports = genericTemplate;

},{"./_getName":17,"./keyValue":22}],21:[function(_dereq_,module,exports){
"use strict";

var strip = _dereq_('./_strip');

var grabInside = function grabInside(tmpl) {
  tmpl = strip(tmpl);
  var parts = tmpl.split('|');

  if (typeof parts[1] !== 'string') {
    return null;
  } //only split on the first pipe:


  parts[1] = parts.slice(1).join('|');
  var value = parts[1].trim();
  value = value.replace(/^[a-z0-9]{1,7}=/, ''); //support 'foo=value'

  return {
    template: parts[0].trim().toLowerCase(),
    data: value
  };
};

module.exports = grabInside;

},{"./_strip":19}],22:[function(_dereq_,module,exports){
"use strict";

// console.log("load oneSentence() parser in 'keyValue.js'");
var parseSentence = _dereq_('../04-sentence').oneSentence;

var strip = _dereq_('./_strip'); //turn '| key = value' into an object


var keyValue = function keyValue(tmpl, isInfobox) {
  tmpl = strip(tmpl);
  var arr = tmpl.split(/\n?\|/); //look for broken-up links and fix them :(

  arr.forEach(function (a, i) {
    if (!arr[i + 1]) {
      return;
    }

    if (/\[\[[^\]]+$/.test(a) || /\{\{[^\}]+$/.test(a)) {
      // [[link|text]] or {{imdb|2386}}
      arr[i + 1] = arr[i] + '|' + arr[i + 1];
      arr[i] = null;
    }
  });
  arr = arr.filter(function (a) {
    return a && a.indexOf('=') !== -1;
  });
  var obj = arr.reduce(function (h, line) {
    var parts = line.split(/=/);

    if (parts.length > 2) {
      parts[1] = parts.slice(1).join('=');
    }

    var key = parts[0].toLowerCase().trim();
    var val = parts[1].trim();

    if (key !== '' && val !== '') {
      val = parseSentence(val);

      if (isInfobox) {
        h[key] = val; //.json();
      } else {
        h[key] = val.text();

        if (val.links().length > 0) {
          h._links = h._links || [];
          h._links = h._links.concat(val.links());
        }
      }
    }

    return h;
  }, {});
  return obj;
}; // console.log("export keyValue()");


module.exports = keyValue;

},{"../04-sentence":3,"./_strip":19}],23:[function(_dereq_,module,exports){
"use strict";

var keyVal = /[a-z0-9]+ *?= *?[a-z0-9]/i;

var pipes = _dereq_('./_pipes'); //generic unamed lists
// {{name|one|two|three}}


var pipeList = function pipeList(tmpl) {
  var found = pipes(tmpl);
  var obj = {
    template: found.name
  };
  var arr = found.list || [];
  arr.forEach(function (k, i) {
    if (arr[i]) {
      //support this gross 'id=234' format inside the value
      if (keyVal.test(arr[i]) === true) {
        arr[i] = arr[i].split('=')[1];
      }

      arr[i] = arr[i].trim();
    }
  });
  obj.data = arr;
  return obj;
};

module.exports = pipeList;

},{"./_pipes":18}],24:[function(_dereq_,module,exports){
"use strict";

var keyVal = /[a-z0-9]+ *?= *?[a-z0-9]/i; //console.log("pipeSplit.js load '_pipes.js'");

var pipes = _dereq_('./_pipes'); //templates that look like this:
// {{name|one|two|three}}


var pipeSplit = function pipeSplit(tmpl, order) {
  var found = pipes(tmpl);
  var obj = {
    template: found.name
  };
  var arr = found.list || [];
  order.forEach(function (k, i) {
    if (arr[i]) {
      //support gross 'id=234' format inside the value
      var val = arr[i];
      var key = k;

      if (keyVal.test(arr[i]) === true) {
        var both = arr[i].split('=');
        val = both[1];

        if (isNaN(parseInt(both[0], 10))) {
          key = both[0].trim().toLowerCase();
        } else {
          key = order[parseInt(both[0], 10) - 1];
        }
      }

      val = val.trim();
      obj[key] = val;
    }
  });
  return obj;
}; //console.log("export pipeSplit()");


module.exports = pipeSplit;

},{"./_pipes":18}],25:[function(_dereq_,module,exports){
"use strict";

var setDefaults = _dereq_('../lib/setDefaults');

var toLatex = _dereq_('./toLatex');

var toHtml = _dereq_('./toHtml');

var toMarkdown = _dereq_('./toJson');

var toJson = _dereq_('./toJson');

var defaults = {}; //also called 'citations'

var Reference = function Reference(data) {
  Object.defineProperty(this, 'data', {
    enumerable: false,
    value: data
  });
};

var methods = {
  title: function title() {
    var data = this.data;
    return data.title || data.encyclopedia || data.author || '';
  },
  links: function links(n) {
    var arr = [];

    if (typeof n === 'number') {
      return arr[n];
    } //grab a specific link..


    if (typeof n === 'number') {
      return arr[n];
    } else if (typeof n === 'string') {
      //grab a link like .links('Fortnight')
      n = n.charAt(0).toUpperCase() + n.substring(1); //titlecase it

      var link = arr.find(function (o) {
        return o.page === n;
      });
      return link === undefined ? [] : [link];
    }

    return arr || [];
  },
  text: function text() {
    return ''; //nah, skip these.
  },
  markdown: function markdown(options) {
    options = setDefaults(options, defaults);
    return toMarkdown(this, options);
  },
  html: function html(options) {
    options = setDefaults(options, defaults);
    return toHtml(this, options);
  },
  latex: function latex(options) {
    options = setDefaults(options, defaults);
    return toLatex(this, options);
  },
  json: function json(options) {
    options = setDefaults(options, defaults);
    return toJson(this, options);
  }
};
Object.keys(methods).forEach(function (k) {
  Reference.prototype[k] = methods[k];
});
module.exports = Reference;

},{"../lib/setDefaults":14,"./toHtml":26,"./toJson":27,"./toLatex":28}],26:[function(_dereq_,module,exports){
"use strict";

//
var toHtml = function toHtml(c, options) {
  if (c.data && c.data.url && c.data.title) {
    var str = c.data.title;

    if (options.links === true) {
      str = "<a href=\"".concat(c.data.url, "\">").concat(str, "</a>");
    }

    return "<div class=\"reference\">\u2303 ".concat(str, " </div>");
  }

  if (c.data.encyclopedia) {
    return "<div class=\"reference\">\u2303 ".concat(c.data.encyclopedia, "</div>");
  }

  if (c.data.title) {
    //cite book, etc
    var _str = c.data.title + ", ";

    if (c.data.author) {
      _str += c.data.author;
    }

    if (c.data.first && c.data.last) {
      _str += c.data.first + ' ' + c.data.last;
    }

    if (c.data.year) {
      _str += ", " + c.data.year;
    }

    return "<div class=\"reference\">\u2303 ".concat(_str, "</div>");
  }

  if (c.inline) {
    return "<div class=\"reference\">\u2303 ".concat(c.inline.html(), "</div>");
  }

  return '';
};

module.exports = toHtml;

},{}],27:[function(_dereq_,module,exports){
"use strict";

//
var toJson = function toJson(c) {
  return c.data;
};

module.exports = toJson;

},{}],28:[function(_dereq_,module,exports){
"use strict";

/*
options = {
  "parse": {
    "math": true,
    "citation": true
  },
  "output": {
    "math": "...",
    "citation": "cite"
  }
}
*/
var toLatex = function toLatex(c, options) {
  var out = "";

  switch (options.output.citation) {
    case "cite":
      out = "\\cite{" + c.label() + "}";
      break;

    case "text":
      out = "(" + c.first() + " " + c.last() + " " + c.year() + ")";
      break;

    default:
      out = "\\cite{" + c.label() + "}";
  }

  return out;
};

module.exports = toLatex;

},{}],29:[function(_dereq_,module,exports){
"use strict";

/* Tokenizer replaces
  * Citation Expression by Tokens of type
     ___CITE_793249879_ID_5___
    and pushes the citation in the JSON data and
    leaves a citation marker.
  * Citations of the form
     replace <ref name="my citation" />
     by
     ___CITE_LABEL_my_citation___
*/
var tokenlib = _dereq_('./lib/tokenlib'); // console.log("Require 'src/lib/tokenlib.js' loaded in 'token4citation.js'!");


var helpers = _dereq_('./lib/helpers'); // console.log("Require 'src/lib/helpers.js' loaded in 'token4citation.js'!");


var setTimeID = tokenlib.setTimeID;
var replaceString = tokenlib.replaceString; // console.log("try to load './parsers/generic'");

var parseGeneric = _dereq_('./parsers/generic'); // console.log("Require '/parsers/generic.js' loaded in 'token4citation.js'!");


var parsePipe = _dereq_('./misc')['cite gnis']; // console.log("Require 'misc.js' loaded with 'cite gnis' module in 'token4citation.js'!");


var parseFmt = _dereq_('./04-sentence/formatting'); // console.log("Require '/04-sentence/formatting.js' loaded in 'token4citation.js'!");


var Reference = _dereq_('./reference/Reference'); // console.log("Require '/reference/Reference.js' loaded in 'token4citation.js'!");
//return only rendered text of wiki links


var resolve_links = function resolve_links(line) {
  // categories, images, files
  line = line.replace(cat_reg, ''); // [[Common links]]

  line = line.replace(/\[\[:?([^|]{1,80}?)\]\](\w{0,5})/g, '$1$2'); // [[File:with|Size]]

  line = line.replace(/\[\[File:(.{2,80}?)\|([^\]]+?)\]\](\w{0,5})/g, ''); // [[Replaced|Links]]

  line = line.replace(/\[\[:?(.{2,80}?)\|([^\]]+?)\]\](\w{0,5})/g, '$2$3'); // External links

  line = line.replace(/\[(https?|news|ftp|mailto|gopher|irc):\/\/[^\]\| ]{4,1500}([\| ].*?)?\]/g, '$2');
  return line;
}; // console.log(resolve_links("[http://www.whistler.ca www.whistler.ca]"))


function postprocess(line) {
  //fix links
  line = resolve_links(line); //remove empty parentheses (sometimes caused by removing templates)

  line = line.replace(/\([,;: ]*\)/g, ''); //these semi-colons in parentheses are particularly troublesome

  line = line.replace(/\( *(; ?)+/g, '('); //dangling punctuation

  line = helpers.trim_whitespace(line);
  line = line.replace(/ +\.$/, '.');
  return line;
}

function parseSentence(str) {
  var obj = {
    text: postprocess(str)
  }; //pull-out the [[links]]
  // parseLinks() - 04-sentence/links.js

  var links = parseLinks(str);

  if (links) {
    obj.links = links;
  } //pull-out the bolds and ''italics''


  obj = parseFmt(obj); //pull-out things like {{start date|...}}
  // obj = templates(obj);

  return new Sentence(obj);
} //structured Cite templates - <ref>{{Cite..</ref>


var hasCitation = function hasCitation(str) {
  return /^ *?\{\{ *?(cite|citation)/i.test(str) && /\}\} *?$/.test(str) && /citation needed/i.test(str) === false;
}; //might as well parse it, since we're here.


var parseCitation = function parseCitation(tmpl) {
  var obj = parseGeneric(tmpl);

  if (obj) {
    return obj;
  } //support {{cite gnis|98734}} format


  return parsePipe(tmpl);
}; //handle unstructured ones - <ref>some text</ref>


var parseInline = function parseInline(str) {
  var obj = parseSentence(str) || {};
  return {
    template: 'citation',
    type: 'inline',
    data: {},
    inline: obj
  };
}; // parse <ref></ref> xml tags


var tokenizeCitation = function tokenizeCitation(wiki, data) {
  wiki = tokenizeRefs(wiki, data);
  return wiki;
};

var name2label = function name2label(pname) {
  //replace blank and non characters or digits by underscore "_"
  var vLabel = str.replace(/[^A-Za-z0-9]/g, "_");
  vLabel = vLabel.replace(/[_]+/g, "_");
  vLabel = vLabel.replace(/^_/g, "");
  vLabel = vLabel.replace(/_$/g, "");

  if (vLabel == "") {
    vLabel = null;
  }

  ;
  return vLabel;
};

var getCiteLabel = function getCiteLabel(data, pid) {
  //replace blank and non characters or digits by underscore "_"
  return "___CITE_" + data.timeid + "_" + pid + "___";
};

var storeReference = function storeReference(wiki, data, references, tmpl, pLabel) {
  if (hasCitation(tmpl)) {
    var obj = parseCitation(tmpl);

    if (obj) {
      obj.label = pLabel;
      references.push(obj);
    }

    ; // Remove Citation from Wiki Source ???
    //wiki = wiki.replace(tmpl, '');
  } else {
    var _obj = parseInline(tmpl);

    _obj.label = pLabel;
    references.push(_obj);
  }

  ;
  return wiki;
};

var tokenizeRefs = function tokenizeRefs(wiki, data, options) {
  var references = []; // (1) References without a citaion label

  wiki = wiki.replace(/ ?<ref>([\s\S]{0,1000}?)<\/ref> ?/gi, function (a, tmpl) {
    // getCiteLabel(data,pid) returns  ___CITE_8234987294_5___
    var vLabel = getCiteLabel(data, references.length);
    wiki = storeReference(wiki, data, references, tmpl, vLabel);
    return vLabel;
  }); // (2) Cite a reference by a label WITHOUT reference
  // replace <ref name="my book label"/> by "___CITE_7238234792_my_book_label___"

  wiki = wiki.replace(/ ?<ref[\s]+name=["']([^"'])["'][^>]{0,200}?\/> ?/gi, function (a, tmpl) {
    var vLabel = getCiteLabel(data, name2label(tmpl));
    return vLabel;
  }); // (3) Reference with citation label that is used multiple time in a document by (2)

  wiki = wiki.replace(/ ?<ref [\s]+name=["']([^"'])["'][^>]{0,200}?>([\s\S]{0,1000}?)<\/ref> ?/gi, function (a, name, tmpl) {
    /* difference between name, label and cite label
       (3a) name='my book name#2012'
       (3b) label='my_book_name_2012'
       (3c) cite_label='___CITE_7238234792_my_book_label_2012___' is the unique marker in the text
     the citation label is a marker in the text with a unique time stamp and defined syntax
     which is very unlikely to have a text element in an article.
    */
    // Convert e.g. name='my book name#2012' to 'my_book_name_2012'
    var vLabel = name2label(name);

    if (vLabel) {
      console.log("tokenizeRefs() created cite label='" + vLabel + "' from name='" + name + "'");
      vLabel = getCiteLabel(data, vLabel);
    } else {
      // convert a standard label with the reference length of the array as unique ID generator
      vLabel = getCiteLabel(data, references.length);
    }

    ;
    wiki = storeReference(wiki, data, references, tmpl, vLabel);
    return vLabel;
  });
  data.refs4token = references; //data.references = references.map(r => new Reference(r));
  //now that we're done with xml, do a generic

  return wiki;
};

var parseRefs = function parseRefs(wiki, data, options) {
  var references = [];
  wiki = wiki.replace(/ ?<ref>([\s\S]{0,1000}?)<\/ref> ?/gi, function (a, tmpl) {
    if (hasCitation(tmpl)) {
      var obj = parseCitation(tmpl);

      if (obj) {
        references.push(obj);
      }

      wiki = wiki.replace(tmpl, '');
    } else {
      references.push(parseInline(tmpl));
    }

    return ' ';
  }); // <ref name=""/>

  wiki = wiki.replace(/ ?<ref[\s]+name=["']([^"'])["'][^>]{0,200}?\/> ?/gi, ' '); // <ref name=""></ref>

  wiki = wiki.replace(/ ?<ref [^>]{0,200}?>([\s\S]{0,1000}?)<\/ref> ?/gi, function (a, tmpl) {
    if (hasCitation(tmpl)) {
      var obj = parseCitation(tmpl);

      if (obj) {
        references.push(obj);
      }

      wiki = wiki.replace(tmpl, '');
    } else {
      references.push(parseInline(tmpl));
    }

    return ' ';
  }); //now that we're done with xml, do a generic + dangerous xml-tag removal

  wiki = wiki.replace(/ ?<[ \/]?[a-z0-9]{1,8}[a-z0-9=" ]{2,20}[ \/]?> ?/g, ' '); //<samp name="asd">

  data.references = references.map(function (r) {
    return new Reference(r);
  });
  return wiki;
};

var toText = function toText(text, data, options) {
  console.log("Export Math to Text not implemented yet!");
  return text;
};

var toHtml = function toHtml(text, data, options) {
  console.log("Export Math to HTML not implemented yet!");
  return text;
};

var toLatex = function toLatex(text, data, options) {
  console.log("Export Math to LaTeX not implemented yet!");
  return text;
};

var toMarkdown = function toMarkdown(text, data, options) {
  console.log("Export Math to MarkDown not implemented yet!");
  return text;
};

var toJSON = function toJSON(pjson, data, options) {
  console.log("Export Math to JSON not implemented yet!");
  return pjson;
};

var CitationTokenizer = {
  "parse": tokenizeCitation,
  "text": toText,
  "html": toHtml,
  "latex": toLatex,
  "markdown": toMarkdown,
  "json": toJSON
};
module.exports = CitationTokenizer;

},{"./04-sentence/formatting":2,"./lib/helpers":12,"./lib/tokenlib":15,"./misc":16,"./parsers/generic":20,"./reference/Reference":25}],30:[function(_dereq_,module,exports){
"use strict";

/* Tokenizer replaces
  * Math Expression by Tokens of type
     ___MATH_INLINE_793249879_ID_5___
     ___MATH_BLOCK_793249879_ID_6___
    and pushes the mathe code in the JSON data
  * append found inline and block math records
*/
var tokenlib = _dereq_('./lib/tokenlib');

var setTimeID = tokenlib.setTimeID;
var replaceString = tokenlib.replaceString;

var replaceMathNewLines = function replaceMathNewLines(pMath) {
  var vMath = " undefined mathematical expression in replaceMathNewLines()-call";

  if (pMath) {
    vMath = pMath.replace(/\n/g, " ");
  }

  return vMath;
};

var tokenizeMathBlock = function tokenizeMathBlock(wikicode, data, options) {
  var timeid = data.timeid;
  console.log("tokenizeMathBlock() Time ID=" + data.timeid);

  if (wikicode) {
    // create the mathexpr array if
    //var vSearch = /(<math[^>]*?>)(.*?)(<\/math>)/gi;
    var vSearch = /\n[:]+[\s]*?<math[^>]*?>(.*?)<\/math>/gi; //var vSearch = /\n[:]+[\s]*?(<math>)(.*?)(<\/math>)/gi;
    // \n            # newline
    // [:]+          # one or more colons
    // [\s]*?        # (optional) tabs and white space
    // <math[^>]*?>  # opening <math> tag
    // (.*?)         # enclosed math expression
    //(<\/math>)     # closing </math> tag
    //
    // gi            # g global, i ignore caps

    var vResult;
    var vCount = 0;
    var vLabel = "";
    console.log("wikicode defined");

    while (vResult = vSearch.exec(wikicode)) {
      vCount++;
      console.log("Math Expression " + vCount + ": '" + vResult[1] + "' found");
      vLabel = "___MATH_BLOCK_" + data.timeid + "_ID_" + vCount + "___";
      var vFound = replaceMathNewLines(vResult[1]);
      data.mathexpr.push({
        "type": "block",
        "label": vLabel,
        "math": vFound
      });
      wikicode = replaceString(wikicode, vResult[0], vLabel); //wikicode = replaceString(wikicode,vFound,vLabel);
    }

    ;
  }

  ;
  return wikicode;
};

var tokenizeMathInline = function tokenizeMathInline(wikicode, data, options) {
  console.log("parseMathBlock() Time ID=" + data.timeid);

  if (wikicode) {
    //var vSearch = /(<math[^>]*?>)(.*?)(<\/math>)/gi;
    var vSearch = /<math[^>]*?>(.*?)<\/math>/gi; //var vSearch = /\n[:]+[\s]*?(<math>)(.*?)(<\/math>)/gi;
    // <math[^>]*?>  # opening <math> tag
    // (.*?)         # enclosed math expression
    //(<\/math>)     # closing </math> tag
    //
    // gi            # g global, i ignore caps

    var vResult;
    var vCount = 0;
    var vLabel = "";
    console.log("wikicode defined");

    while (vResult = vSearch.exec(wikicode)) {
      vCount++;
      console.log("Math Expression " + vCount + ": '" + vResult[1] + "' found");
      vLabel = "___MATH_INLINE_" + data.timeid + "_ID_" + vCount + "___";
      var vFound = replaceMathNewLines(vResult[1]);
      data.mathexpr.push({
        "type": "inline",
        "label": vLabel,
        "math": vFound
      });
      wikicode = replaceString(wikicode, vResult[0], vLabel); //wikicode = replaceString(wikicode,vFound,vLabel);
    }

    ;
  }

  ;
  return wikicode;
};

var tokenizeMath = function tokenizeMath(wiki, data, options) {
  console.log("CALL: tokenizeMath() - src/index.js:95 ");
  setTimeID(data);

  if (data.hasOwnProperty("mathexpr")) {
    console.log("data.mathexpr array exists");
  } else {
    data.mathexpr = [];
  }

  ;
  wiki = tokenizeMathBlock(wiki, data, options);
  wiki = tokenizeMathInline(wiki, data, options);
  return wiki;
};

var toText = function toText(text, data, options) {
  console.log("Export Math to Text not implemented yet!");
  return text;
};

var toHtml = function toHtml(text, data, options) {
  console.log("Export Math to HTML not implemented yet!");
  return text;
};

var toLatex = function toLatex(text, data, options) {
  console.log("Export Math to LaTeX not implemented yet!");
  return text;
};

var toMarkdown = function toMarkdown(text, data, options) {
  console.log("Export Math to MarkDown not implemented yet!");
  return text;
};

var toJSON = function toJSON(pjson, data, options) {
  console.log("Export Math to JSON not implemented yet!");
  return pjson;
};

var MathTokenizer = {
  "parse": tokenizeMath,
  "text": toText,
  "html": toHtml,
  "latex": toLatex,
  "markdown": toMarkdown,
  "json": toJSON
};
module.exports = MathTokenizer;

},{"./lib/tokenlib":15}]},{},[11])(11)
});
