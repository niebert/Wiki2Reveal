function getWiki2Reveal(pMarkdown,pTitle, pAuthor, pLanguage, pDomain) {
  console.log("getWiki2Reveal()-Call");
  var vWikiID = pLanguage+pDomain;
  var page_identifier = pTitle.replace(/ /g,"_");
  var vDocJSON = {}; // vDocJSON stores parsed content
  // init "wikiconvert" the Wiki Source - necessary for expanding relative URLs for images and local links
  wtf.wikiconvert.init(pLanguage,pDomain,vDocJSON);
  // init the article name with the page_identifier, also necessary for handling relative links
  wtf.wikiconvert.initArticle(page_identifier);
  // replace local image urls (e.g. [[File:my_image.png]])
  // by a remote image url [[File:https://en.wikipedia.org/wiki/Special:Redirect/file/my_image.png]]
  pMarkdown = wtf.wikiconvert.clean_source(pMarkdown);
  pMarkdown = wtf.wikiconvert.replaceImages(pMarkdown);
  // store pMarkdown result in textarea
  //document.getElementById("wikimarkup").value = pMarkdown;
  // replace local  urls (e.g. [[Other Article]])
  // by a remote url to the Wiki article e.g. [https://en.wikipedia.org/wiki/Other_Article Other Article]
  pMarkdown = wtf.wikiconvert.replaceWikiLinks(pMarkdown);
  //pMarkdown = pMarkdown.replace(/<img[\s]+/g,"<imgXXX ");
  // perform the post processing after pMarkdown compilation
  pMarkdown = wtf.wikiconvert.post_process(pMarkdown);
  // create a Title slide and place the slide before output
  pMarkdown = createTitleSlide(pTitle,pAuthor) + "\n" + pMarkdown;
  // replace the Math-Tags for Reveal output
  pMarkdown = replaceMath4Reveal(pMarkdown);
  // generate Reveal html output
  var htmlout =  wtf.reveal(pMarkdown)
  //var htmlout =  wtf.html(pMarkdown)
  htmlout = addSectionReveal(htmlout);
  htmlout = postprocessMath4Reveal(htmlout);
  pMarkdown = pMarkdown.replace(/<imgXXX /g,"<img ");
  return htmlout;
};


function addSectionReveal(pMarkdown) {
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

function replaceMath4Reveal(pMarkdown) {
  if (pMarkdown) {
    pMarkdown = replaceMathBlock4Reveal(pMarkdown);
    pMarkdown = replaceMathInline4Reveal(pMarkdown);
  } else {
    pMarkdown = "undefined pMarkdown"
  }
  return pMarkdown;
}

function postprocessMath4Reveal(pMarkdown) {
  pMarkdown = pMarkdown.replace(/XXXspan/g,"span")
  return pMarkdown;
}

function createTitleSlide(pTitle,pAuthor) {
  var slide0 = "\n<div class=\"section\">";
  slide0 += "\n  <h1 class=\"title\">"+pTitle+"</h1>";
  slide0 += "\n  <h2 class=\"author\">"+pAuthor+"</h2>";
  slide0 += "\n</div>\n";
  return slide0;
}

function replaceMathInline4Reveal(pMarkdown) {
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
    pMarkdown = pMarkdown.replace(/<\/div>/g,"</section>");
    return pMarkdown;
};

function replaceMathBlock4Reveal(pMarkdown) {
   // <math>(.*?)<\/math>
   var vSearch = /(\n[:]+[\s]*<math>)(.*?)(<\/math>)/i;
   var vResult;
    var vCount = 0;
    var vTagInsert = "";
    var vSearchStr = "";
    while (vResult = vSearch.exec(pMarkdown)) {
      vCount++;
      vSearchStr = vResult[1]+vResult[2]+vResult[3];
      pMarkdown = pMarkdown.replace(vSearchStr,'\n<XXXspan id="math'+vCount+'block" class="math display">\\[' + vResult[2] +'\\]</XXXspan>');
      console.log("Math Block Expression "+vCount+" found: '"+vResult[2]+"'");
      vCount++;
    };
    pMarkdown = pMarkdown.replace(/<\/div>/g,"</section>");
    return pMarkdown;
};


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
