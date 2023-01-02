function getWiki2Reveal(pMarkdown,pTitle, pAuthor, pLanguage, pDomain, pOptions) {
  console.log("getWiki2Reveal()-Call");
  if (!pMarkdown) {
    console.error("ERROR: pMarkdown undefined in getWiki2Reveal()-Call ");
  }
  if (document.location.href.indexOf("dzslides") >= 0) {
    pOptions.slidetype = "dzslides";
    console.log("Set slidetype to 'dzslides'");
  } else {
    pOptions.slidetype = "reveal";
  }
  return get_wiki2reveal(pMarkdown,pTitle, pAuthor, pLanguage, pDomain, pOptions);
}

function get_wiki2reveal(pMarkdown,pTitle, pAuthor, pLanguage, pDomain, pOptions) {
  if (pOptions) {
    if (pOptions.slidetype) {
      console.log("Set slidetype to '" + pOptions.slidetype + "'");
    } else {
      pOptions.slidetype = "reveal";
    }
  }  else {
    pOptions = {
      "slidetype": "reveal"
    };
  }
  var vWikiID = pLanguage+pDomain;
  var page_identifier = pTitle.replace(/ /g,"_");
  var vDocJSON = {}; // vDocJSON stores parsed content
  // init "wikiconvert" the Wiki Source - necessary for expanding relative URLs for images and local links
  wtf.wikiconvert.init(pLanguage,pDomain,vDocJSON,"reveal");
  // init the article name with the page_identifier, also necessary for handling relative links
  wtf.wikiconvert.initArticle(page_identifier,pOptions);
  pMarkdown = wtf.wikiconvert.clean_source(pMarkdown,pOptions);
  pMarkdown = wtf.wikiconvert.content_before_section(pMarkdown,pOptions);
  // console.log("Remove Categories");
  pMarkdown = wtf.wikiconvert.remove_categories(pMarkdown,pOptions);
  // console.log("Remove math newlines");
  //pMarkdown = wtf.wikiconvert.removeMathNewlines(pMarkdown,pOptions);
  // replace local image urls (e.g. [[File:my_image.png]])
  // by a remote image url [[File:https://en.wikipedia.org/wiki/Special:Redirect/file/my_image.png]]
  var data = {
    "mathexpr": [],
    "tables": [],
    "references": []
  };
  // does not tokenize all <math> tags - see Kurs:Funktionalanalysis/Hahn-Banach - reeller Fall
  pMarkdown = tokenizeMath(pMarkdown,data,pOptions);
  //pMarkdown = tokenizeCitation(pMarkdown, vDocJSON, pOptions);
  pMarkdown = tokenizeCitation(pMarkdown, data, pOptions);
  pMarkdown = tokenizeTables(pMarkdown, data, pOptions);
  console.log("tokenizeMath(pMarkdown,data,pOptions) DONE");
  // replace the Math-Tags for Reveal output
  pMarkdown = wtf.wikiconvert.removeMathNewlines(pMarkdown);
  pMarkdown = wtf.wikiconvert.replaceImages(pMarkdown,pOptions);
  pMarkdown = wtf.wikiconvert.replaceSections(pMarkdown,pOptions);
  console.log("wiki2reveal.js:28 - Sections replaced!");
  // pMarkdown = replaceMath4Reveal(pMarkdown,pOptions);
  console.log("wiki2reveal.js:30 - execute Math4Reveal replaced!");
  //console.log("JSON data:"+JSON.stringify(data,null,4));
  // store pMarkdown result in textarea
  //document.getElementById("wikimarkup").value = pMarkdown;
  // replace local  urls (e.g. [[Other Article]])
  // by a remote url to the Wiki article e.g. [https://en.wikipedia.org/wiki/Other_Article Other Article]
  pMarkdown = pMarkdown.replace(/\[\[Kurs:/gi,"[[c_o_u_r_s_e");
  pMarkdown = wtf.wikiconvert.replaceWikiLinks(pMarkdown,pOptions);
  //pMarkdown = external_links2href(pMarkdown);
  //pMarkdown = pMarkdown.replace(/<img[\s]+/g,"<imgXXX ");
  // perform the post processing after pMarkdown compilation
  pMarkdown = wtf.wikiconvert.replaceEnumeration(pMarkdown,pOptions);
  console.log("Slide Type: "+ wtf.wikiconvert.check_audio_slide(pMarkdown,pOptions));
  pMarkdown = wtf.wikiconvert.post_process(pMarkdown,pOptions);
  pMarkdown = wtf.wikiconvert.clean_unsupported_wiki(pMarkdown,pOptions);
  // create a Title slide and place the slide before output
  pMarkdown = replaceToken2Math(pMarkdown,data,pOptions);
  pMarkdown = replaceToken2Table(pMarkdown,data,pOptions);
  pMarkdown = replaceToken2Ref(pMarkdown,data,pOptions);
  console.log("wiki2reveal.js:30 - Math4Reveal replaced!");
  pMarkdown = createTitleSlide(pTitle,pAuthor,pOptions) + "\n" + pMarkdown;
  // generate Reveal html output
  console.log("Call: wtf.reveal(pMarkdown)");
  //var vDoc = wtf(pMarkdown);
  //var htmlout =  vDoc.html(pMarkdown)
  pMarkdown = wtf.wikiconvert.replaceExternalLinks(pMarkdown);
  var htmlout =  pMarkdown;

  htmlout = addSectionReveal(htmlout,pOptions);
  htmlout = insertVerticalSlides4Reveal(htmlout,pOptions);
  htmlout = postprocessMath4Reveal(htmlout,pOptions);
  htmlout = htmlout.replace(/<imgXXX /g,"<img ");
  htmlout = htmlout.replace(/___aXXX___ /g,"<a ");
  htmlout = htmlout.replace(/___aXXXC___/g,">"); // closing ">" of openening <a ..
  htmlout = htmlout.replace(/___\/aXXX___/g,"</a>");
  htmlout = htmlout.replace(/c_o_u_r_s_e/g,"Kurs:");
  return htmlout;
}

function link2title(pArticle,pOptions) {
  if (pArticle) {
    //pArticle = pArticle.substr()
    pArticle = pArticle.replace(/\//g," - ");
    pArticle = pArticle.replace(/:/g,": ");
    pArticle = pArticle.replace(/_/g," ");
  } else {
    pArticle = "Undefined Title";
  }
  return pArticle;
}

function external_links2href(pMarkdown,pOptions) {
  var RE_ext_link = /\[([^\s\]]+)[[\s]+?([^\]]+)\]/gm;
  pMarkdown = pMarkdown.replace(RE_ext_link, '___aXXX___ href="$1" target="_blank"___aXXXC___$2 ___/aXXX___');

  return pMarkdown
}

function callRevealInit(pOptions) {
  console.log("callRevealInit()");
    // Full list of configuration options available at:
    // https://github.com/hakimel/reveal.js#configuration
    var vConfigReveal = {
      math: {
        mathjax: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js',
        //mathjax: 'mathjax/MathJax.js',
        config: 'TeX-AMS_HTML-full'
      },
      // Optional reveal.js plugins
      dependencies: [
        { src: 'reveal/lib/js/classList.js', condition: function() { return !document.body.classList; } },
        { src: 'reveal/plugin/zoom-js/zoom.js', async: true },
        { src: 'reveal/plugin/notes/notes.js', async: true },
        { src: 'reveal/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'reveal/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'reveal/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
        { src: 'reveal/plugin/zoom-js/zoom.js', async: true },
        { src: 'reveal/plugin/notes/notes.js', async: true },
        { src: 'reveal/plugin/math/math.js', async: true },
        { src: 'reveal/plugin/chalkboard/chalkboard.js', async: true },
        { src: 'reveal/plugin/menu/menu.js', async: true }
      ],
      audio: {
        prefix: 'chalkboard/',
        suffix: '.ogg',
        defaultDuration: 5,
//					textToSpeechURL: "http://api.voicerss.org/?key=[YOUR_KEY]&hl=en-gb&c=ogg&src=",
        advance: 500,
        autoplay: false,
        defaultText: true,
        playerOpacity: 0.2,
      },
      chalkboard: { // font-awesome.min.css must be available
        //src: "../../reveal/plugin/chalkboard/chalkboard.json",
        //src: "chalkboard/chalkboard.json",
        toggleChalkboardButton: { left: "80px" },
        toggleNotesButton: { left: "130px" },
        theme: "whiteboard",
        background: [ 'rgba(127,127,127,.1)' , 'reveal/plugin/chalkboard/img/whiteboard.png' ],
        pen: [ 'reveal/plugin/chalkboard/img/boardmarker.png' , 'reveal/plugin/chalkboard/img/boardmarker.png' ],
//				        color: [ 'rgba(0,0,255,1)', 'rgba(0,0,255,0.5)' ],
//				        draw: [ (RevealChalkboard) ?  RevealChalkboard.drawWithPen : null , (RevealChalkboard) ? RevealChalkboard.drawWithPen : null ],
      },
      keyboard: {
          67: function() { RevealChalkboard.toggleNotesCanvas() },	// toggle chalkboard when 'c' is pressed
          66: function() { RevealChalkboard.toggleChalkboard() },	// toggle chalkboard when 'b' is pressed
          46: function() { RevealChalkboard.clear() },	// clear chalkboard when 'DEL' is pressed
           8: function() { RevealChalkboard.reset() },	// reset all chalkboard data when 'BACKSPACE' is pressed
          68: function() { RevealChalkboard.download() },	// download chalkboard drawing when 'd' is pressed
        90: function() { Recorder.downloadZip(); }, 	// press 'z' to download zip containing audio files
        84: function() { Recorder.fetchTTS(); } 	// press 't' to fetch TTS audio files
      }
    };
    if (vAudioSlide == "yes4reveal") {
      vConfigReveal.dependencies.push({ src: 'reveal/plugin/audio-slideshow/slideshow-recorder.js'});
      vConfigReveal.dependencies.push({ src: 'reveal/plugin/audio-slideshow/audio-slideshow.js'});
    };
    Reveal.initialize(vConfigReveal)
}


function addSectionReveal(pMarkdown,pOptions) {
    var vSearch = /(<section[^>]*>)/i;
    var vResult;
    var vCount = 0;
    var vTagInsert = "";
    while (vResult = vSearch.exec(pMarkdown)) {
        if (vCount == 0) {
          vTagInsert = " class=\"titleslide\" id=\"slide"+vCount+"\" ";
        } else {
          vTagInsert = " class=\"level2\" id=\"slide"+vCount+"\" ";
        }
        pMarkdown = pMarkdown.replace(vResult[1],"<XXXXX "+vTagInsert+">");
        console.log("Section Tag "+vCount+" inserted: '"+vResult[1]+"'");
        vCount++;
    };
    pMarkdown = pMarkdown.replace(/<XXXXX/g,"<section");
    return pMarkdown;
};

function getTimeStampID() {
  return "s"+Date.now()+"r"+Math.floor(Math.random() * 1000);
}

function find_header_splitter(pSection,pPrefix) {
  var vRet = {
    "section":pSection,
    "verticals":null
  };
  //alert("find_header_splitter() - verticals pSection='"+pSection+"'");
  var vPrefix = pPrefix || "<section id=\"" + getTimeStampID() + "\">";
  if (vResult = pSection.match(/<\/h[1-9]>/)) {
    var vPos = pSection.indexOf(vResult);
    vResult = vResult + "";
    console.log("vPos="+vPos+" vResult.length="+vResult.length);
    //console.log("find_h_splitter() - Header "+vResult+" found with vPrefix='"+vPrefix+"'");
    var vVerticalSection = pSection.substr(vPos+(vResult.length));
    console.log("find_header_splitter(vPos="+vPos+") - verticals vVerticalSection='"+vVerticalSection+"'");
    vRet.verticals = {
      "tag": vResult,
      "pos": vPos,
      "prefix": vPrefix,
      "section": vVerticalSection
    };
  };
  return vRet;
}

function find_ul_begin_splitter(pSection,pPrefix) {
  var vRet = {
    "section":pSection,
    "verticals":null
  };
  //alert("find_header_splitter() - verticals pSection='"+pSection+"'");
  var vPrefix = pPrefix || "<section id=\"" + getTimeStampID() + "\">";
  if (vResult = pSection.match(/<ul[^>]*>/)) {
    var vPos = pSection.indexOf(vResult);
    vResult = vResult + "";
    console.log("vPos="+vPos+" vResult.length="+vResult.length);
    var vPrefixSection = pSection.substr(0,vPos);
    vPrefixSection = vPrefixSection.replace(/\s+/g, '');
    //console.log("find_h_splitter() - Header "+vResult+" found with vPrefix='"+vPrefix+"'");
    //var vVerticalSection = pSection.substr(vPos+(vResult.length))
    if (vPrefixSection.length > 2) {
      var vVerticalSection = pSection.substr(vPos);
      console.log("find_ul_begin_splitter(vPos="+vPos+") - verticals vVerticalSection='"+vVerticalSection+"'");
      vRet.verticals = {
        "tag": vResult,
        "pos": vPos,
        "prefix": vPrefix,
        "section": vVerticalSection
      };
    }
  };
  return vRet;
}

function find_ul_end_splitter(pSection,pPrefix) {
  var vRet = {
    "section":pSection,
    "verticals":null
  };
  //alert("find_header_splitter() - verticals pSection='"+pSection+"'");
  var vPrefix = pPrefix || "<section id=\"" + getTimeStampID() + "\">";
  if (vResult = pSection.match(/<\/ul>/)) {
    var vPos = pSection.indexOf(vResult);
    vResult = vResult + "";
    console.log("vPos="+vPos+" vResult.length="+vResult.length);
    //console.log("find_h_splitter() - Header "+vResult+" found with vPrefix='"+vPrefix+"'");
    var vVerticalSection = pSection.substr(vPos+(vResult.length))
    var vPostfixSection = vVerticalSection.replace(/\s+/g, '');
    //var vVerticalSection = pSection.substr(vPos);
    console.log("find_ul_end_splitter(vPos="+vPos+") - verticals vVerticalSection='"+vVerticalSection+"'");
    vRet.verticals = {
      "tag": vResult,
      "pos": vPos,
      "prefix": vPrefix,
      "section": vVerticalSection
    };
  };
  return vRet;
}


function getSectionTag4Vertical(pIndex,pCount) {
  return "\n<section id=\""+pIndex+"c"+ pCount + "\">\n";
}

function getImageTag4Vertical(pIndex,pCount,pURL) {
  return "\n<section id=\""+pIndex+"c"+ pCount + "\" data-background-size=\"contain\" data-background-image=\"" + pURL+ "\">\n";
}

function append_ul_splitter(pSection,pCount,pPrefix) {
  var vOut = "";
  var vVertArr = [];
  var ul1 = find_ul_begin_splitter(pSection,pPrefix);
  if (ul1 && ul1.verticals) {
    pCount++;
    vVertArr.push(ul1);
    var ul2 = find_ul_end_splitter(pSection,pPrefix);
    if (ul2 && ul2.verticals) {
      pCount++;
      vVertArr.push(ul2);
    } else {
      console.error("Closing Tag for 'ul'-tag is missing!");
    }
  }
  if (vVertArr.length > 0) {
    vVertArr.sort(function(a, b){return a.pos - b.pos});
    for (var i = 0; i < vVertArr.length; i++) {
      //console.log("Verticals in vVertArr["+i+"] "+vVertArr[i].verticals.tag+" found with section='"+vVertArr[i].verticals.section+"'");
      vOut += vVertArr[i].verticals.prefix + vVertArr[i].verticals.section;
      //vOut += body_splitter(pIndex+"body",vVertArr[i].verticals.section,vCount);
    }
  }
  return vOut;
}

function body_splitter(pIndex,pSection,pCount) {
  var vCount = pCount || 0;
  var vOut = "";
  // check if header splitter find heading
  pCount++;
  var vPrefix = getSectionTag4Vertical(pIndex,pCount);
  //alert("header_splitter() - verticals pSection='"+pSection+"'");
  if (pSection) {
    var vPosUL = pSection.indexOf("<ul");
    var vPosIMG = pSection.indexOf("<img");
    //alert("vPosUL="+vPosUL+" vPosIMG="+vPosIMG);
    if (vPosIMG > vPosUL) {
      if (vPosUL>=0) {
        // Image after UL
        vOut += append_ul_splitter(pSection,vCount,vPrefix);
        var vPosEnd = pSection.indexOf("</ul>");
        if (vPosEnd >= 0) {
            pSection = pSection.substr(vPosEnd+5);
            pCount = pCount+2;
            vOut +=  body_splitter(pIndex,pSection,pCount);
        }
      } else {
        // UL after Image
        pSection = pSection.replace(/<img[^>]+>/," ");
        pCount++;
        vOut +=  body_splitter(pIndex,pSection,pCount);
      }
      // append image
    } else if (vPosIMG < vPosUL) {
      if (vPosIMG>=0) {
        pSection = pSection.replace(/<img[^>]+>/," ");
        pCount++;
        vOut +=  body_splitter(pIndex,pSection,pCount);
      } else {
        // Image after UL
        vOut += append_ul_splitter(pSection,vCount,vPrefix);
        var vPosEnd = pSection.indexOf("</ul>");
        if (vPosEnd >= 0) {
            pSection = pSection.substr(vPosEnd+5);
            pCount = pCount+2;
            vOut +=  body_splitter(pIndex,pSection,pCount);
        }
      }
    }

  } else {
    console.log("pSection is not defined");
  }
  //vOut += "\n<section id=\"sec"+pIndex+"subsec"+ vCount + "\">\n" + pSection;

  return vOut;
}


function slide_splitter(pIndex,pSection) {
  var vCount = 0;
  var vOut = "";
  // append horizontal slide
  vOut += getSectionTag4Vertical(pIndex,vCount) + pSection;
  vCount++;
  var vPrefix = getSectionTag4Vertical(pIndex,vCount);
  // check if header splitter find heading
  //alert("header_splitter() - verticals pSection='"+pSection+"'");
  var vHeader = find_header_splitter(pSection,vPrefix);
  //vOut += "\n<section id=\"sec"+pIndex+"subsec"+ vCount + "\">\n" + pSection;
  if (vHeader.verticals) {
    // header found split at header
    console.log("Verticals in Header "+vHeader.verticals.tag+" found with section='"+vHeader.verticals.section+"'");
    vOut += vHeader.verticals.prefix + vHeader.verticals.section;
    vOut += body_splitter(pIndex+"body",vHeader.verticals.section);
  }
  var vImages = wtf.wikiconvert.getImages4URL(pSection);
  if (vImages.length > 0) {
    //alert("append fullscreen images "+JSON.stringify(vImages,null,4));
    for (var i = 0; i < vImages.length; i++) {
      vCount++;
      vOut += getImageTag4Vertical(pIndex,vCount,vImages[i])+"</section>";
    }

  } else {
    //alert("No images on slide "+vCount+"\n"+pSection)
  }
  return vOut;
}

function  createVerticalSlide4Section(pIndex,pSectionTag,pSection) {
  var vOut = pSectionTag || "";
  // pSection alway contains a closing </section>
  if (pSection) {
    //result = text.match(/ain/gi);
    //alert("verticals pSection='"+pSection+"'");
    // the closing section-tag of horizontal slide is used as closing tag for all vertical slides
    vOut += slide_splitter("sec"+pIndex,pSection);
    // add an empty slide at the end for annotations
    vOut += getSectionTag4Vertical("sec"+pIndex+"empty",pIndex);
    vOut += "\n  </section>";
    // add closing section horizontal slide
    vOut += "\n</section>";
  } else {
    console.error("pSection not defined in createVerticalSlide4Section()");
  }
  return vOut;
}
function insertVerticalSlides4Reveal(pMarkdown,pOptions) {
    var vSearch = /(<section[^>]*>)/gi;
    var vResult;
    var vCount = 0;
    var vTagInsert = "";
    var vSectionTagArray =[];
    var vSectionArray = null;
    var vOut = "";
    while (vResult = vSearch.exec(pMarkdown)) {
      vCount++;
      vSectionTagArray.push(vResult[1]);
      //console.log("Section "+vCount+": '" + vResult[1] + "' found");
    };
    vSearch = /<section[^>]*>/i;
    if (pMarkdown && (pOptions.slidetype == "reveal")) {
      vSectionArray = pMarkdown.split(vSearch);
      //console.log("vSectionTagArray[0]="+vSectionTagArray[0]);
      //console.log("vSectionArray[1]="+vSectionArray[1])
      vOut += vSectionArray[0];
      for (var i = 1; i < vSectionArray.length; i++) {
        //vSectionArray[i]
        vOut += createVerticalSlide4Section((i+1),vSectionTagArray[i-1],vSectionArray[i]);
      }
      //console.log("vSectionArray.length="+vSectionArray.length);
    } else {
      // DZSlides used
      vOut = pMarkdown;
    }
    //return pMarkdown;
    return vOut;
};


function replaceMathNewLines(pMath) {
  var vMath = " undefined mathematical expression in replaceMathNewLines()-call";
  if (pMath) {
    vMath = pMath.replace(/\n/g," ");
  }
  return vMath;
}

function replaceMath4Reveal(pMarkdown,pOptions) {
  if (pMarkdown) {
    pMarkdown = replaceMathBlock4Reveal(pMarkdown,pOptions);
    pMarkdown = replaceMathInline4Reveal(pMarkdown,pOptions);
  } else {
    pMarkdown = "undefined pMarkdown"
  }
  return pMarkdown;
}

function postprocessMath4Reveal(pMarkdown,pOptions) {
  pMarkdown = pMarkdown.replace(/XXXspan/g,"span");
  //pMarkdown = pMarkdown.replace(/___MATH_END_BLOCK___/g,"</p><p class=\"textleft\" style=\"text-align: left;\">");

  return pMarkdown;
}

function replaceMathInline4Reveal(pMarkdown,pOptions) {
   // <math>(.*?)<\/math>
    var vSearch = /(<math>)(.*?)(<\/math>)/i;
    var vResult;
    var vCount = 0;
    var vTagInsert = "";
    var vSearchStr = "";
    while (vResult = vSearch.exec(pMarkdown)) {
      vCount++;
      vSearchStr = vResult[1]+vResult[2]+vResult[3];
      pMarkdown = pMarkdown.replace(vSearchStr,'<XXXspan id="math'+vCount+'inline" class="math inline">\\(' +vResult[2]+'\\)</XXXspan>');
      console.log("Math Inline Expression "+vCount+" found: '"+vResult[2]+"'");
    };
    return pMarkdown;
};

function replaceMathBlock4Reveal(pMarkdown,pOptions) {
   // <math>(.*?)<\/math>
   var vSearch = /(\n[:]+[\s]*?<math[^>]*?>)(.*?)(<\/math>)/i;
   var vResult;
    var vCount = 0;
    var vTagInsert = "";
    var vSearchStr = "";
    while (vResult = vSearch.exec(pMarkdown)) {
      vCount++;
      var vMathBlock = vResult[2];
      vMathBlock = replaceMathNewLines(vMathBlock);
      //vMathBlock = vMathBlock.replace(/\n/g," ");
      vSearchStr = vResult[1]+vMathBlock+vResult[3];
      pMarkdown = pMarkdown.replace(vSearchStr,'\n<center><XXXspan id="math'+vCount+'block" class="math inline"> \\( \\displaystyle ' + vResult[2] +'\\)</XXXspan></center>');
      console.log("Math Block Expression "+vCount+" found: '"+vResult[2]+"'");
      vCount++;
    };
    return pMarkdown;
};

function getMathBlockTag4Reveal(pCount,pMath) {
  pMath = replaceMathNewLines(pMath);
  var vTag = '\n<center><XXXspan id="math' + pCount +
            'block" class="math inline"> \\( \\displaystyle ' +
            pMath +'\\)</XXXspan></center>';
  return vTag;
}

function getMathInlineTag4Reveal(pCount,pMath) {
  pMath = replaceMathNewLines(pMath);
  var vTag = '<XXXspan id="math'+pCount+'inline" class="math inline">\\(' +pMath+'\\)</XXXspan>';
  return vTag;
}



function replaceToken2Math(pMarkdown,pData,pOptions) {
  var vSearch = "";
  var vReplace = "";
  var vType = "inline";
  var vCount = 0;
  console.log("replace tokens back to mathematical expression for RevealJS");
  for (var i = 0; i < pData.mathexpr.length; i++) {
    vCount++;
    vSearch = pData.mathexpr[i].label;
    vType = pData.mathexpr[i].type || "inline";
    vMath = pData.mathexpr[i].math || " ";
    switch (vType) {
      case "inline":
        vReplace = getMathInlineTag4Reveal(vCount,vMath);
      break;
      case "block":
        vReplace = getMathBlockTag4Reveal(vCount,vMath);
      break;
      default:
        vReplace = getMathInlineTag4Reveal(vCount,vMath);
        console.warn("Undefined Math Expression Type '" + vType + "' for '" + vMath + "'");
    }
    pMarkdown = replaceString(pMarkdown,vSearch,vReplace);
  }
  return pMarkdown;
}

function tokenizeMath(wiki, data, pOptions) {
  var vNow = new Date();
  data.timeid = data.timeid || vNow.getTime();
  var timeid = data.timeid;
  var vCount = 0;
  console.log("tokenizeMathBlock() - wtf_wikipedia - Time ID="+data.timeid);
  wiki = wiki.replace(/\n[:]+<math([^>]*?)>([\s\S]+?)<\/math>/g, function (pMatch, attrs, inside) {
    vCount++;
    vLabel = "___MATH_BLOCK_"+data.timeid+"_ID_"+vCount+"___";
    data.mathexpr.push({
      "type":"block",
      "attrs": attrs,
      "label":vLabel,
      "math": inside
    });
    return "\n" + vLabel;
  });
  console.log("tokenizeMathInline() - wtf_wikipedia - Time ID="+data.timeid);
  wiki = wiki.replace(/<math([^>]*?)>([\s\S]+?)<\/math>/g, function (pMatch, attrs, inside) {
    vCount++;
    vLabel = "___MATH_INLINE_"+data.timeid+"_ID_"+vCount+"___";
    data.mathexpr.push({
      "type":"inline",
      "attrs": attrs,
      "label":vLabel,
      "math": inside
    });
    return vLabel;
  });
  return wiki;
}

function tokenizeTables(wiki, data, pOptions) {
  var vNow = new Date();
  data.timeid = data.timeid || vNow.getTime();
  var timeid = data.timeid;
  var vCount = 0;
  console.log("tokenizeTables() - wtf_wikipedia - Time ID="+data.timeid);
  wiki = wiki.replace(/\{\|([^\n]+)\n([\s\S]+?)\|\}/g, function (pMatch, attrs, inside) {
    vCount++;
    vLabel = "___TABLE_TOKEN_"+data.timeid+"_ID_"+vCount+"___";
    var prefix = "";
    var nested_tab_pos = inside.lastIndexOf("{|");
    if ( nested_tab_pos >= 0) {
      prefix = "{| "+ attrs + "\n" + inside.substr(0,nested_tab_pos);
      inside = inside.substr(nested_tab_pos+2);
      attrs = inside.substr(0,inside.indexOf("\n"));
      inside = inside.substr(inside.indexOf("\n")+1)
    }
    var vTable = {
      "type":"table",
      "attrs": attrs,
      "caption": null,
      "header": null,
      "rows": {
        "length":0
      },
      "label": vLabel
    };
    parseTableInside(vTable,inside);
    data.tables.push(vTable);
    return prefix + "\n" + vLabel;
  });
  return wiki;
}

function parseTableInside(pTable,pInside) {
  //alert(pInside);
  pTable = pTable || {};
  //pTable['rows'] = [];
  if (pInside) {
    var lines = pInside.split("\n|-");
    for (var i = 0; i < lines.length; i++) {
      var line =lines[i];
      if (i == 0) {
        var vPos = line.indexOf("|+")>=0;
        if (vPos >= 0) {
          var vCaption = line.substr(vPos+2);
          var vEnd = vCaption.indexOf("\n");
          if (vEnd >= 0) {
              vCaption = vCaption.substr(0,vEnd);
          }
          vCaption = vCaption.trim();
          pTable.caption = vCaption;
          console.log("wiki2reveal_generator.js:572 - Caption='"+vCaption+"'");
        } else {
          parseTableLine(pTable,line)
        }
      } else {
        parseTableLine(pTable,line)
      }
    }
  }
  return pInside;
}

function parseTableLine(pTable,pLine) {
  var vCols = [];
  if (pLine) {
    // check if column is a header
    if ((pLine.indexOf("\n!") >= 0) || (pLine.indexOf("!!") > 0)) {
      // this is a header
      pLine = pLine.replace(/!!/g,"\n!");
      var arr = pLine.split("\n!");
      for (var i = 0; i < arr.length; i++) {
        arr[i] = (arr[i]).replace(/\n/g," ");
        arr[i] = (arr[i]).trim();
      }
      pTable["header"] = arr;
    } else {
      pLine = pLine.replace(/\|\|/g,"\n|");
      var arr = pLine.split("\n|");
      for (var i = 0; i < arr.length; i++) {
        arr[i] = (arr[i]).replace(/\n/g," ");
        arr[i] = (arr[i]).trim();
      }
      pTable.rows["R"+pTable.rows.length] = arr;
      pTable.rows.length++
    }
  } else {
    console.warn("W2R: parseTableLine(pLine) pLine is not defined");
  }
  return vCols;
}

function replaceToken2Table(pMarkdown,pData,pOptions) {
  var vSearch = "";
  var vReplace = "";
  var vInside = "";
  var vCaption = "";
  var vHeader = [];
  var vRows = [];
  var vCount = 0;
  console.log("replace tokens back to mathematical expression for RevealJS");
  for (var i = 0; i < pData.tables.length; i++) {
    vCount++;
    vSearch = pData.tables[i].label;
    vReplace = "";
    vTableAttrs = pData.tables[i].attrs;
    vCaption = pData.tables[i].caption;
    vHeader  = pData.tables[i].header;
    vRows = pData.tables[i].rows || vRows;
    //vInside  = pData.tables.inside || "undefined table";
    vReplace += "\n<table "+vTableAttrs+">";
    if (vCaption) {
      vReplace += "\n  <caption>"+vCaption+"</caption>";
    }
    vReplace += "\n  <tbody>";
    if (vHeader && vHeader.length > 0) {
      vReplace += "\n  <tr>\n     <th>";
      vReplace += vHeader.join("\n     </th>\n     <th>");
      vReplace += "\n     </th>\n  </tr>";
    }
    if (vRows && vRows.length > 0) {
      for (var r = 0; r < vRows.length; r++) {
        var row = vRows["R"+r]
        vReplace += "\n  <tr>\n     <td>";
        vReplace += row.join("\n     </td>\n     <td>");
        vReplace += "\n     </td>\n  </tr>";
      }
    }
    vReplace += "\n  </tbody>";
    vReplace += "\n</table>"
    /*

  <caption>Caption text</caption>
  <tbody>
    <tr>
      <th>Header text</th>
      <th>Header text</th>
      <th>Header text</th>
    </tr>
    <tr>
      <td>Example</td>
      <td>Example</td>
      <td>Example</td>
    </tr>
    <tr>
      <td>Example</td>
      <td>Example</td>
      <td>Example</td>
    </tr>
  </tbody>
</table>
    */
    pMarkdown = replaceString(pMarkdown,vSearch,vReplace);
  }
  return pMarkdown;
}


function getReference4Label(pLabel,pInnerRef,pType) {
  console.log("getReference4Label('"+pLabel+"','"+pInnerRef+"','"+pType+"')");
  return {
    template: 'citation',
    type: pType,
    label: pLabel,
    data: {},
    inline: pInnerRef
  };
}

function getLastChar4String(pString) {
    var vChar = "";
    if (pString) {
      vChar = pString.charAt(pString.length-1);
    };
    return vChar;
}


//function tokenizeRefs (wiki, data, options, pReferences) {
//function tokenizeRefs (wiki, data, options) {
function tokenizeCitation (wiki, data, options) {
  console.log("CALL: tokenizeNameRefs() wiki.length="+wiki.length);
  //var references = pReferences || [];
  /*
  if (data) {
    alert("tokenizeCitation() - data EXISTS "+JSON.stringify(data,null,4));
    if (data && data.references) {
      alert("tokenizeCitation() - data.references EXISTS");
    } else {
      alert("tokenizeCitation() - data.references does NOT exist");
    }
  } else {
    alert("data does NOT exist");
  }
  */
  var vRefList = getCiteLabel(data,"REFERENCES");
  wiki = replaceString(wiki,"<references/>",vRefList);
  wiki = replaceString(wiki,"{{Reflist}}",vRefList);
  data.references.push(getReference4Label(vRefList,"<references/>",'reflist'));

  var refsplit = wiki.split("<ref");
  if (refsplit.length > 1) {
    for (var i = 1; i < refsplit.length; i++) {
      var vMatch = "<ref"
      var vPart = refsplit[i];
      var vEndTag = "</ref>";
      var vPosEnd = vPart.indexOf(vEndTag);
      if (vPosEnd >=0) {
          // part contains an end-tag </ref>
          if (vPart.charAt(0) == ">") {
            // TYPE: "<ref>...</ref>"
            vMatch += ">";
            // extract everything between <ref> and </ref> and store in tmpl
            var vInnerRef = vPart.substring(1,(vPosEnd));
            console.log("vInnerRef='"+vInnerRef+"'");
            var vLabel = getCiteLabel(data,data.references.length);
            data.references.push(getReference4Label(vLabel,vInnerRef,'inline'));
            //refsplit[i] = vLabel + vPart.substring(vPosEnd+vEndTag.length);
            refsplit[i] = vLabel + vPart.substring(vPosEnd+vEndTag.length);
            vMatch = "<ref>" + vInnerRef + "</ref>";
            wiki = replaceString(wiki,vMatch,vLabel);
          } else {
            // TYPE: "<ref name="....">...</ref>"
            console.log("CALL: tokenizeRefs() with name='label' reference='<ref"+vPart.substring(0,100)+"...'");
            var found = vPart.match(/^[\s]+name=["']/);
            if (found.length > 0) {
              vMatch += found[0];
              // vMatch: <ref name=" or <ref name='
              var vChar = getLastChar4String(vMatch);
              //var vChar = vMatch.charAt(vMatch.length-1);
              // vChar is now string terminator
              if ((vChar == "'") || (vChar == '"')) {
                var vBeginLabelPos = vPart.indexOf(vChar);
                if (vBeginLabelPos >= 0) {
                  //vMatch += vPart.slice(0,vBeginLabelPos + 1);
                  vPart = vPart.substring(vBeginLabelPos + 1);
                  console.log("vPart='"+vPart+"'");
                  var vLabelEndPos = vPart.indexOf(vChar);
                  if (vLabelEndPos > 0) {
                    var vLabel = vPart.substring(0,vLabelEndPos);
                    console.log("vLabel='"+vLabel+"' of wrapped with vChar=["+vChar+"] ");
                    vLabel = getCiteLabel(data,name2label(vLabel));
                    var vEndTagPos = vPart.indexOf(">");
                    if (vEndTagPos >= 0) {
                      vMatch = "<ref"+refsplit[i].substring(0,vPosEnd+vEndTag.length);
                      //console.log("vMatch="+vMatch+"");
                      //alert(vMatch);
                      wiki = replaceString(wiki,vMatch,vLabel);
                      //wiki = wiki.replace(vMatch,vLabel);
                      var vInnerRef = vPart.substring(vEndTagPos+1,vPart.indexOf(vEndTag));
                      data.references.push(getReference4Label(vLabel,vInnerRef,'inline'));
                    }
                  } else {
                    console.warn("Label of reference not termminated in  '"+vPart.substring(0,100)+"...'");
                  }
                }
              } else {
                console.warn("No name='label' properly defined");
              }
            }

          }
      } else {
        // part does not contain an end-tag </ref>
        // could be <ref name="mylabel" />
        var vNameEnd = "/>";
        var vPosNameEnd = vPart.indexOf(vNameEnd);
        if ((vPosNameEnd > 0) && (vPosNameEnd < 100)) {
          var vMatch = "<ref"+vPart.slice(0,vPosNameEnd + vNameEnd.length);
          console.log("vNameEnd vMatch='"+vMatch+"'");
          var found = vPart.match(/^[\s]+name=["']/);
          if (found && found.length > 0) {
            var vPrefix = found[0];
            //var vChar = vPrefix.charAt(vPrefix.length-1);
            var vChar = getLastChar4String(vPrefix);
            // vChar is now string terminator
            if ((vChar == "'") || (vChar == '"')) {
              var vBeginLabelPos = vPart.indexOf(vChar);
              if (vBeginLabelPos >= 0) {
                //vMatch += vPart.slice(0,vBeginLabelPos + 1);
                vPart = vPart.substring(vBeginLabelPos + 1);
                console.log("vPart='"+vPart+"'");
                var vLabelEndPos = vPart.indexOf(vChar);
                if (vLabelEndPos > 0) {
                  var vLabel = vPart.substring(0,vLabelEndPos);
                  console.log("vLabel='"+vLabel+"' of wrapped with vChar=["+vChar+"] ");
                  vLabel = getCiteLabel(data,name2label(vLabel));
                  wiki = replaceString(wiki,vMatch,vLabel);
                } else {
                  console.warn("Label of reference not termminated in  '"+vPart.substring(0,100)+"...'");
                }
              }
            } else {
              console.warn("No name='label' properly defined");
            }
          }
        }
      }

    }
  }
  //data.references = references.map(r => new Reference(r));
  //now that we're done with xml, do a generic
  return wiki;
}

function X_tokenizeRefs (wiki, data, options, pReferences) {
  console.log("CALL: tokenizeRefs() wiki.length="+wiki.length);
  var references = pReferences || [];
  wiki = tokenizeNameRefs(wiki, data, options, references)
  // (1) References without a citaion label
  console.log("CALL-1: tokenizeRefs(1.1) - (ref)-citation-(/ref)");
  wiki = wiki.replace(/ ?<ref>([\s\S]{0,1000}?)<\/ref> ?/gi, function(a, tmpl){
    // getCiteLabel(data,pid) returns  ___CITE_8234987294_5___
    var vLabel = getCiteLabel(data,data.references.length);
    console.log("CALL-1: tokenizeRefs(1-2) Citation ["+vLabel+"]");
    wiki = storeReference(wiki,data,references,tmpl,vLabel);
    return vLabel;
  });
  // (2) Cite a reference by a label WITHOUT reference
  console.log("CALL-2: tokenizeRefs(2.1) - (ref name='label'/)");
  // replace <ref name="my book label"/> by "___CITE_7238234792_my_book_label___"
  wiki = wiki.replace(/ ?<ref[\s]+name=["']([^"'])["'][^>]{0,200}?\/> ?/gi,function(a, tmpl) {
    let vLabel = getCiteLabel(data,name2label(tmpl));
    console.log("CALL-2: tokenizeRefs(2.2) Citation ["+vLabel+"]");
    return vLabel;
  });
  // (3) Reference with citation label that is used multiple time in a document by (2)
  console.log("CALL-3: tokenizeRefs(3.1) - (ref name='label')-citation-(/ref)");
  wiki = wiki.replace(/ ?<ref [\s]+name=["']([^"'])["'][^>]{0,200}?>([\s\S]{0,1000}?)<\/ref> ?/gi, function(a, name, tmpl) {
    console.log("CALL-3: tokenizeRefs(3.2) created cite a='"+a+"' from name='"+name+"' and template='"+tmpl+"'");
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
      console.log("CALL-3: tokenizeRefs(3.3) created cite label='"+vLabel+"' from name='"+name+"'");
      vLabel = getCiteLabel(data,vLabel);
      console.log("CALL-3: tokenizeRefs(3.4) Citation ["+vLabel+"]");
    } else {
      // convert a standard label with the reference length of the array as unique ID generator
      vLabel = getCiteLabel(data,data.references.length);
      console.log("CALL-4: tokenizeRefs(4.1) Citation ["+vLabel+"]");
    };
    wiki = storeReference(wiki,data,references,tmpl,vLabel);
    return vLabel;
  });
  //data.references = references.map(r => new Reference(r));
  //now that we're done with xml, do a generic
  return wiki;
}

function getReferenceList(pReferences) {
  var vHTML = "<ul>";
  var vCount = 0;
  for (var i = 0; i < pReferences.length; i++) {
    var vRec = pReferences[i];
    if (vRec.type == "inline") {
        vCount++;
        vHTML += "<li>";
        vHTML += "["+vCount+"] ";
        vHTML += vRec.inline;
        vHTML += "</li>";
    }
  }
  vHTML += "</ul>";
  return vHTML;
}
function replaceToken2Ref(pMarkdown,pData,pOptions) {
  //alert("replaceToken2Ref(pMarkdown,pData,pOptions)");
  var vSearch = "";
  var vReplace = "";
  var vType = "inline";
  var vCount = 0;
  console.log("replace tokens back to citations and references for RevealJS");
  if (pData && pData.references) {
    //alert("pData.references exists pData.references.length="+pData.references.length);
    for (var i = 0; i < pData.references.length; i++) {
      var vRec = pData.references[i];
      vSearch = vRec.label;
      vType = vRec.type || "inline";
      switch (vType) {
        case "inline":
          vCount++;
          //vReplace = "<img src=\"img/icons-svg/fa-book-black.svg\"><sup>["+vCount+"]</sup>";
          vReplace = "<sup style='font-size:20px'>["+vCount+"]</sup>";
        break;
        case "reflist":
          vReplace = getReferenceList(pData.references);
        break;
        default:
          vReplace = "-XXX-";
      }
      //alert("vSearch='"+vSearch+"' vReplace='"+vReplace+"'");
      pMarkdown = replaceString(pMarkdown,vSearch,vReplace);
    }
  } else {
    console.error("replaceToken2Ref(pMarkdown,pData,pOptions) - pData.references undefined.")
    //alert("replaceToken2Ref(pMarkdown,pData,pOptions) - pData.references undefined.")
  }
  return pMarkdown;
}

function X_replaceToken2Ref(pMarkdown,data,pOptions) {
  var vSearch = "";
  var vReplace = "";
  var vType = "inline";
  var vCount = 0;
  console.log("replace tokens back to mathematical expression for RevealJS");
  for (var i = 0; i < data.references.length; i++) {
    vCount++;
    var vRec = data.references[i];
    vSearch = vRec.label;
    vType = vRec.type || "inline";
    switch (vType) {
      case "inline":
        vReplace = "<img src=\"img/icons-svg/fa-book-black.svg\"><sup>["+i+"]</sup>";
      break;
      case "reflist":
        vReplace = getReferenceList(data.references);
      break;
      default:
        vReplace = "-XXX-";
    }
    pMarkdown = replaceString(pMarkdown,vSearch,vReplace);
  }
  return pMarkdown;
}

function hasCitation(str) {
  return /^ *?\{\{ *?(cite|citation)/i.test(str) && /\}\} *?$/.test(str) && /citation needed/i.test(str) === false;
};
function getCiteLabel (data,pid) {
  //replace blank and non characters or digits by underscore "_"
  if (!data.timeid) {
    data.timeid = Date.now();
  };
  return "___CITE_"+data.timeid+"_"+pid+"___";
  //return "<sup>("+pid+")</sup>";
}

function parseInline (str) {
  let obj = parseSentence(str) || {};
  return {
    template: 'citation',
    type: 'inline',
    data: {},
    inline: obj
  };
};


function parseSentence(str) {
  let obj = {
    text: postprocess(str)
  };
  //pull-out the [[links]]
  // parseLinks() - 04-sentence/links.js
  let links = parseLinks(str);
  if (links) {
    obj.links = links;
  }
  //pull-out the bolds and ''italics''
  obj = parseFmt(obj);
  //pull-out things like {{start date|...}}
  // obj = templates(obj);
  return new Sentence(obj);
}

function postprocess(line) {
  //fix links
  line = resolve_links(line);
  //remove empty parentheses (sometimes caused by removing templates)
  line = line.replace(/\([,;: ]*\)/g, '');
  //these semi-colons in parentheses are particularly troublesome
  line = line.replace(/\( *(; ?)+/g, '(');
  //dangling punctuation
  line = helpers.trim_whitespace(line);
  line = line.replace(/ +\.$/, '.');
  return line;
}

function parseSentence(str) {
  return {
    "sentence": str
  };
};

function name2label(pName) {
  //replace blank and non characters or digits by underscore "_"
  var vLabel = pName.replace(/[^A-Za-z0-9]/g,"_");
  vLabel = vLabel.replace(/[_]+/g,"_");
  vLabel = vLabel.replace(/^_/g,"");
  vLabel = vLabel.replace(/_$/g,"");
  if (vLabel == "") {
    vLabel = null;
  }
  return vLabel;
}
function storeReference (wiki,data,references,tmpl,pLabel) {
  if (hasCitation(tmpl)) {
    let obj = parseCitation(tmpl);
    if (obj) {
      obj.label = pLabel;
      references.push(obj);
    };
    // Remove Citation from Wiki Source ???
    //wiki = wiki.replace(tmpl, '');
  } else {
    let obj = parseInline(tmpl);
    obj.label = pLabel;
    references.push(obj);
  };
  return wiki;
}

function parseCitation (tmpl) {
  let obj = parseGeneric(tmpl);
  if (obj) {
    return obj;
  }
  //support {{cite gnis|98734}} format
  return parsePipe(tmpl);
};

function parseGeneric(tmpl) {
  // dummy parseGeneric replace by wtf_wikipedia.js function
  if (tmpl) {
    return tmpl;
  } else {
    return {};
  }
}

function createTitleSlide(pTitle,pAuthor,pOptions) {
  console.log("CALL: createTitleSlide()");
  var vWikiLink = pTitle;
  pTitle = link2title(pTitle);
  var vSearch = link2title(pAuthor) + " - ";
  if (pTitle.indexOf(vSearch) >= 0) {
    pTitle = replaceString(pTitle,vSearch," ");
    console.log("Prefix: '"+vSearch+"' removed!");
  } else {
    console.log("Prefix: '"+vSearch+"' not found!");
  }
  if (pOptions && pOptions.shorttitle) {
    pTitle = pOptions.shorttitle;
  }
  var slide0 = "\n<section id=\"titleslide\">";
  slide0 += "\n  <h1 class=\"title\"><a href='https://" + pOptions.language+ "." + pOptions.domain + ".org/wiki/" + encodeURIComponent(vWikiLink) + "' target='_blank'>"+pTitle+"</a></h1>";
  slide0 += "\n  <h2 class=\"author\">"+pAuthor+"</h2>";
  //if (document.location.href.indexOf("reveal") >= 0) {
  //  slide0 += '<p class="fragment" data-audio-src="audio/silence.ogg">';
  //}
  if (pOptions) {
    if (pOptions.slidetype) {
      if (pOptions.slidetype == "dzslides") {
        console.log("CALL: createTitleSlide() - Slide Type: '"+ pOptions.slidetype+ "' - Title generated for DZSlides");
        slide0 += "\n  <center><img class=\"titlelogo\" width='150' src=\"img/Wiki2Reveal_Logo.png\"></center>";
      } else {
        console.log("CALL: createTitleSlide()  - Slide Type: '"+ pOptions.slidetype+ "' - Title generated for RevealJS");
      }
    } else {
      console.warn("CALL: createTitleSlide() - pOptions.slidetype undefined");
    }
  } else {
    console.warn("CALL: createTitleSlide() - pOptions undefined");
  }
  slide0 += "\n<center>"
  slide0 += "\n  <a href=\"https://niebert.github.io/Wiki2Reveal/index.html?language=" + pOptions.language + "&domain=" + pOptions.domain+ "&article=" + encodeURIComponent(vWikiLink) + "&author=" + pAuthor + "&audioslide=" + pOptions.audioslide + "\" target='_blank'>Wiki2Reveal</a>";
  slide0 += " - ";
  slide0 += "\n  <a href=\"https://" + pOptions.language + "." + pOptions.domain+ ".org/wiki/" + encodeURIComponent(vWikiLink) + "\" target='_blank'>Wiki Source</a>";
  slide0 += "\n</center>\n";
  //if (document.location.href.indexOf("reveal") >= 0) {
  //  slide0 += "</p>";
  //}
  slide0 += "\n</section>\n";
  return slide0;
}

function replaceString(pString,pSearch,pReplace) {
// replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
  var vReturnString = "undefined string for replaceString-call!";
  //alert("cstring.js - replaceString() "+pString);
  if (!pString) {
    console.log("replaceString()-Call - pString not defined!");
  } else if (pString != '') {
    {
    //alert("cstring.js - replaceString() "+pString);
      var vHelpString = '';
      var vN = pString.indexOf(pSearch);
      vReturnString = '';
      while (vN >= 0)
      {
        if (vN > 0)
          vReturnString += pString.substring(0, vN);
        vReturnString += pReplace;
              if (vN + pSearch.length < pString.length) {
          pString = pString.substring(vN+pSearch.length, pString.length);
        } else {
          pString = '';
        }
        vN = pString.indexOf(pSearch);
      }
    }
     vReturnString += pString;
  }
  //console.log("replaceString() finalized for '"+pString+"'");
  return vReturnString;
}
