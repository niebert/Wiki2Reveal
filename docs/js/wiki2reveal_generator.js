function getWiki2Reveal(pMarkdown,pTitle, pAuthor, pLanguage, pDomain, pOptions) {
  console.log("getWiki2Reveal()-Call");
  if (document.location.href.indexOf("dzslides") >= 0) {
    pOptions.slidetype = "dzslides";
    console.log("Set slidetype to 'dzslides'");
  }
  var vWikiID = pLanguage+pDomain;
  var page_identifier = pTitle.replace(/ /g,"_");
  var vDocJSON = {}; // vDocJSON stores parsed content
  // init "wikiconvert" the Wiki Source - necessary for expanding relative URLs for images and local links
  wtf.wikiconvert.init(pLanguage,pDomain,vDocJSON,"reveal");
  // init the article name with the page_identifier, also necessary for handling relative links
  wtf.wikiconvert.initArticle(page_identifier,pOptions);
  // replace local image urls (e.g. [[File:my_image.png]])
  // by a remote image url [[File:https://en.wikipedia.org/wiki/Special:Redirect/file/my_image.png]]
  pMarkdown = wtf.wikiconvert.clean_source(pMarkdown,pOptions);
  // replace the Math-Tags for Reveal output
  //pMarkdown = wtf.wikiconvert.removeMathNewlines(pMarkdown);
  pMarkdown = wtf.wikiconvert.replaceImages(pMarkdown,pOptions);
  pMarkdown = wtf.wikiconvert.replaceSections(pMarkdown,pOptions);
  console.log("wiki2reveal.js:14 - Sections replaced!");
  pMarkdown = replaceMath4Reveal(pMarkdown,pOptions);
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
  pMarkdown = createTitleSlide(link2title(pTitle),pAuthor,pOptions) + "\n" + pMarkdown;
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
    if (vAudioSlide == "yes") {
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
   var vSearch = /(\n[:]+[\s]*?<math>)(.*?)(<\/math>)/i;
   var vResult;
    var vCount = 0;
    var vTagInsert = "";
    var vSearchStr = "";
    while (vResult = vSearch.exec(pMarkdown)) {
      vCount++;
      var vMathBlock = vResult[2];
      vMathBlock = vMathBlock.replace(/\n/g," ");
      vSearchStr = vResult[1]+vMathBlock+vResult[3];
      pMarkdown = pMarkdown.replace(vSearchStr,'\n<center><XXXspan id="math'+vCount+'block" class="math inline"> \\( \\displaystyle ' + vResult[2] +'\\)</XXXspan></center>');
      console.log("Math Block Expression "+vCount+" found: '"+vResult[2]+"'");
      vCount++;
    };
    return pMarkdown;
};

function hackMathBlock4Reveal(pMarkdown,pOptions) {
  return pMarkdown;
};


function tokenizeMathBlock (wikicode, data, pOptions) {
  let timeid = data.timeid;
  console.log("parseMathBlock() Time ID="+data.timeid);
  if (wikicode) {
    // create the mathexpr array if
    //var vSearch = /(<math[^>]*?>)(.*?)(<\/math>)/gi;
    var vSearch = /\n[:]+[\s]*?<math[^>]*?>(.*?)<\/math>/gi;
    //var vSearch = /\n[:]+[\s]*?(<math>)(.*?)(<\/math>)/gi;
    // \n            # newline
    // [:]+          # one or more colons
    // [\s]*?        # (optional) tabs and white space
    // <math[^>]*?>  # opening <math> tag
    // (.*?)         # enclosed math expression
    //(<\/math>)     # closing </math> tag
    //
    // gi            # g global, i ignore caps
    var vResult;
    var vCount =0;
    var vLabel = "";
    console.log("wikicode defined");
    while (vResult = vSearch.exec(wikicode)) {
      vCount++;
      console.log("Math Expression "+vCount+": '" + vResult[1] + "' found");
      vLabel = "___MATH_BLOCK_"+data.timeid+"_ID_"+vCount+"___";
      var vFound = vResult[1];
      data.mathexpr.push({
        "type":"block",
        "label":vLabel,
        "math":vFound
      });
      wikicode = replaceString(wikicode,vResult[0],vLabel);
      //wikicode = replaceString(wikicode,vFound,vLabel);
    };
  };
  return wikicode
}

function createTitleSlide(pTitle,pAuthor,pOptions) {
  console.log("CALL: createTitleSlide()");
  pTitle = link2title(pTitle);
  var slide0 = "\n<section id=\"titleslide\">";
  slide0 += "\n  <h1 class=\"title\"><a href='https://" + pOptions.language+ "." + pOptions.domain + ".org/wiki/" + pTitle + "' target='_blank'>"+pTitle+"</a></h1>";
  slide0 += "\n  <h2 class=\"author\">"+pAuthor+"</h2>";
  if (pOptions) {
    if (pOptions.slidetype) {
      if (pOptions.slidetype == "dzslides") {
        console.log("CALL: createTitleSlide() - Slide Type: '"+ pOptions.slidetype+ "' - Title generated for DZSlides");
        slide0 += "\n  <center><img class=\"titlelogo\" width='150' src=\"img/Wiki2Reveal_Logo.svg\"></center>";
      } else {
        console.log("CALL: createTitleSlide()  - Slide Type: '"+ pOptions.slidetype+ "' - Title generated for RevealJS");
      }
    } else {
      console.warn("CALL: createTitleSlide() - pOptions.slidetype undefined");
    }
  } else {
    console.warn("CALL: createTitleSlide() - pOptions undefined");
  }
  slide0 += "\n<center><a src=\"https://en.wikiversity.org/wiki/Wiki2Reveal\" target='_blank'>Wiki2Reveal</a></center>\n";
  slide0 += "\n</section>\n";
  return slide0;
}

function replaceString(pString,pSearch,pReplace)
// replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
  //alert("cstring.js - replaceString() "+pString);
  if (!pString) {
    alert("replaceString()-Call - pString not defined!");
  } else if (pString != '') {
    {
    //alert("cstring.js - replaceString() "+pString);
      var vHelpString = '';
      var vN = pString.indexOf(pSearch);
      var vReturnString = '';
      while (vN >= 0)
      {
        if (vN > 0)
          vReturnString += pString.substring(0, vN);
        vReturnString += pReplace;
              if (vN + pSearch.length < pString.length) {
          pString = pString.substring(vN+pSearch.length, pString.length);
        } else {
          pString = ''
        }
        vN = pString.indexOf(pSearch);
      };
    };
    return vReturnString + pString;
  }

};
