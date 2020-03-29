function getWiki2Reveal(pMarkdown,pTitle, pAuthor, pLanguage, pDomain, pOptions) {
  console.log("getWiki2Reveal()-Call with wtf_wikipedia");
  if (document.location.href.indexOf("dzslides") >= 0) {
    pOptions.slidetype = "dzslides";
    console.log("Set slidetype to 'dzslides'");
  } else {
    pOptions.slidetype = "reveal";
    console.log("Set slidetype to 'reveal'");
  }
  var vWikiID = pLanguage+pDomain;
  var page_identifier = pTitle.replace(/ /g,"_");
  var vDocJSON = {}; // vDocJSON stores parsed content
  // init "wikiconvert" the Wiki Source - necessary for expanding relative URLs for images and local links
  wtf.wikiconvert.init(pLanguage,pDomain,vDocJSON,"reveal");
  // init the article name with the page_identifier, also necessary for handling relative links
  wtf.wikiconvert.initArticle(page_identifier,pOptions);
  //pMarkdown = wtf.wikiconvert.content_before_section(pMarkdown,pOptions);
  // replace local image urls (e.g. [[File:my_image.png]])
  // by a remote image url [[File:https://en.wikipedia.org/wiki/Special:Redirect/file/my_image.png]]
  var data = {
    "mathexpr": []
  };
  console.log("CALL: tokenizeMath(pMarkdown,data,pOptions)");
  //pMarkdown = tokenizeMath(pMarkdown,data,pOptions);
  var vDoc = wtf(pMarkdown);
  var htmlout =  vDoc.html(pMarkdown);
  console.log("HTML output generated with wtf_wikipedia");
  //var htmlout =  pMarkdown;

  htmlout = addSectionReveal(htmlout,pOptions);
  return htmlout;
};


function X_getWiki2Reveal(pMarkdown,pTitle, pAuthor, pLanguage, pDomain, pOptions) {
  console.log("getWiki2Reveal()-Call");
  if (document.location.href.indexOf("dzslides") >= 0) {
    pOptions.slidetype = "dzslides";
    console.log("Set slidetype to 'dzslides'");
  } else {
    pOptions.slidetype = "reveal";
  }
  var vWikiID = pLanguage+pDomain;
  var page_identifier = pTitle.replace(/ /g,"_");
  var vDocJSON = {}; // vDocJSON stores parsed content
  // init "wikiconvert" the Wiki Source - necessary for expanding relative URLs for images and local links
  wtf.wikiconvert.init(pLanguage,pDomain,vDocJSON,"reveal");
  // init the article name with the page_identifier, also necessary for handling relative links
  wtf.wikiconvert.initArticle(page_identifier,pOptions);
  pMarkdown = wtf.wikiconvert.content_before_section(pMarkdown,pOptions);
  // replace local image urls (e.g. [[File:my_image.png]])
  // by a remote image url [[File:https://en.wikipedia.org/wiki/Special:Redirect/file/my_image.png]]
  var data = {
    "mathexpr": []
  };
  pMarkdown = tokenizeMath(pMarkdown,data,pOptions);
  console.log("tokenizeMath(pMarkdown,data,pOptions) DONE");
  pMarkdown = wtf.wikiconvert.clean_source(pMarkdown,pOptions);
  // replace the Math-Tags for Reveal output
  //pMarkdown = wtf.wikiconvert.removeMathNewlines(pMarkdown);
  pMarkdown = wtf.wikiconvert.replaceImages(pMarkdown,pOptions);
  pMarkdown = wtf.wikiconvert.replaceSections(pMarkdown,pOptions);
  console.log("wiki2reveal.js:28 - Sections replaced!");
  //pMarkdown = replaceMath4Reveal(pMarkdown,pOptions);

  console.log("wiki2reveal.js:30 - execute Math4Reveal replaced!");
  //console.log("JSON data:"+JSON.stringify(data,null,4));
  //pMarkdown = replaceToken2Math(pMarkdown,data,pOptions);
  console.log("wiki2reveal.js:30 - Math4Reveal replaced!");
  // store pMarkdown result in textarea
  //document.getElementById("wikimarkup").value = pMarkdown;
  // replace local  urls (e.g. [[Other Article]])
  // by a remote url to the Wiki article e.g. [https://en.wikipedia.org/wiki/Other_Article Other Article]
  pMarkdown = wtf.wikiconvert.replaceWikiLinks(pMarkdown,pOptions);
  pMarkdown = external_links2href(pMarkdown);
  //pMarkdown = pMarkdown.replace(/<img[\s]+/g,"<imgXXX ");
  // perform the post processing after pMarkdown compilation
  pMarkdown = wtf.wikiconvert.replaceEnumeration(pMarkdown,pOptions);
  console.log("Slide Type: "+ wtf.wikiconvert.check_audio_slide(pMarkdown,pOptions));
  pMarkdown = wtf.wikiconvert.post_process(pMarkdown,pOptions);
  pMarkdown = wtf.wikiconvert.clean_unsupported_wiki(pMarkdown,pOptions);
  // create a Title slide and place the slide before output
  pMarkdown = createTitleSlide(pTitle,pAuthor,pOptions) + "\n" + pMarkdown;
  // generate Reveal html output
  console.log("Call: wtf.reveal(pMarkdown)");
  //var vDoc = wtf(pMarkdown);
  //var htmlout =  vDoc.html(pMarkdown)
  var htmlout =  pMarkdown;

  htmlout = addSectionReveal(htmlout,pOptions);
  htmlout = postprocessMath4Reveal(htmlout,pOptions);
  htmlout = htmlout.replace(/<imgXXX /g,"<img ");
  htmlout = htmlout.replace(/___aXXX___ /g,"<a ");
  htmlout = htmlout.replace(/___aXXXC___/g,">"); // closing ">" of openening <a ..
  htmlout = htmlout.replace(/___\/aXXX___/g,"</a>");
  return htmlout;
};

function link2title(pArticle,pOptions) {
  if (pArticle) {
    //pArticle = pArticle.substr()
    pArticle = pArticle.replace(/\//g," - ");
    pArticle = pArticle.replace(/:/g,": ");
    pArticle = pArticle.replace(/_/g," ");
  } else {
    pArticle = "Undefined Title"
  }
  return pArticle
};

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


function replaceToken2Math(pMarkdown,data,pOptions) {
  var vSearch = "";
  var vReplace = "";
  var vType = "inline";
  var vCount = 0;
  console.log("replace tokens back to mathematical expression for RevealJS");
  for (var i = 0; i < data.mathexpr.length; i++) {
    vCount++;
    vSearch = data.mathexpr[i].label;
    vType = data.mathexpr[i].type || "inline";
    vMath = data.mathexpr[i].math || " ";
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


function tokenizeMath (wikicode, data, pOptions) {
  var vNow = new Date();
  data.timeid = data.timeid || vNow.getTime();
  var timeid = data.timeid;
  var vFound = "";
  var vMathExpr = "";
  console.log("tokenizeMathBlock() Time ID="+data.timeid);
  if (wikicode) {
    // create the mathexpr array if
    //var vSearch = /(<math[^>]*?>)(.*?)(<\/math>)/gi;
    data = data || {};
    data.mathexpr = data.mathexpr || {};
    var vResult;
    var vCount =0;
    var vLabel = "";
    console.log("wikicode defined");
    //----- MATH BLOCK TOKENIZE -----
    //var vSearchBlock = new RegExp("\n([:]+[\s]*?<math[^>]*?>)(.*?)(<\/math>)","i");
    var vSearchBlock = new RegExp("\n([:]+[\s]*?<math>)(.*?)(<\/math>)","i");
    //var vSearch = /\n[:]+[\s]*?(<math>)(.*?)(<\/math>)/gi;
    // \n            # newline
    // [:]+          # one or more colons
    // [\s]*?        # (optional) tabs and white space
    // <math[^>]*?>  # opening <math> tag
    // (.*?)         # enclosed math expression
    //(<\/math>)     # closing </math> tag
    //
    // gi            # g global, i ignore caps
    while (vResult = vSearchBlock.exec(wikicode)) {
      vCount++;
      vLabel = "MATH4BLOCK"+data.timeid+"ID"+vCount+"X";
      vFound = vResult[1] + vResult[2] + vResult[3];
      vMathExpr = vResult[2];
      console.log("Tokenize Math Expression Block"+vCount+": '" + vFound + "' found");
      //console.log("Push Block Data JSON="+JSON.stringify(data,null,4));
      data.mathexpr.push({
        "type":"block",
        "label":vLabel,
        "math": vMathExpr
      });
      console.log("Push Block Data" + vCount + " - done");
      //wikicode = replaceString(wikicode,vResult[0],vLabel);
      //wikicode = replaceString(wikicode,vFound,vLabel);
      //console.log("Execute replace on wikicode for '" + vFound + "'");
      //wikicode = wikicode.replace(vFound,vLabel);
      wikicode = replaceString(wikicode,vFound,vLabel);
      //console.log("Replace on wikicode executed for '" + vFound + "'");
    };
    //----- MATH INLINE TOKENIZE -----
    // console.log("Tokenize Inline Math JSON:" + JSON.stringify(data,null,4));
    var vSearchInline = new RegExp("(<math[^>]*?>)(.*?)(<\/math>)","i");
    //var vSearch = /\n[:]+[\s]*?(<math>)(.*?)(<\/math>)/gi;
    // <math[^>]*?>  # opening <math> tag
    // (.*?)         # enclosed math expression
    //(<\/math>)     # closing </math> tag
    //
    // i            #  i ignore caps, g global
    //console.log("Tokenize Inline Math - RegExp defined");
    while (vResult = vSearchInline.exec(wikicode)) {
      vCount++;
      vLabel = "MATH4INLINE"+data.timeid+"ID"+vCount+"X";
      //console.log("Tokenize Inline Math - Label: '" + vLabel + "'");

      vFound = vResult[1] + vResult[2] + vResult[3];
      vMathExpr = vResult[2];
      console.log("Tokenize Math Expression Inline"+vCount+": '" + vFound + "' found");
      //console.log("Push Data JSON="+JSON.stringify(data,null,4));
      data.mathexpr.push({
        "type":"inline",
        "label":vLabel,
        "math": vMathExpr
      });
      // console.log("Tokenize Math Expression - Push Inline Data" + vCount + "  - done");
      //wikicode = replaceString(wikicode,vResult[0],vLabel);
      //wikicode = replaceString(wikicode,vFound,vLabel);
     //  console.log("Execute replace on wikicode for '" + vFound + "'");
      wikicode = wikicode.replace(vFound,vLabel);
      //console.log("Replace on wikicode executed for '" + vFound + "'");
    };
    //console.log("DONE Tokenize Inline Math JSON:" + JSON.stringify(data,null,4));

  }
  return wikicode;
}

function createTitleSlide(pTitle,pAuthor,pOptions) {
  console.log("CALL: createTitleSlide()");
  var vWikiLink = pTitle;
  pTitle = link2title(pTitle);
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
