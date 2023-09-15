function getShortTitle(pTitle) {
  var vShort = pTitle;
  if (pTitle) {
    vShort = pTitle.replace(/_/g," ");
    //var vSearch = vCourse+"/";
    if (vTitle.lastIndexOf("/") >= 0) {
      //vShort = replaceString(pTitle,vSearch,"");
      var arr = vTitle.split("/");
      vShort = arr[arr.length-1];
      console.log("pTitle: '"+pTitle+"' ShortTitle='"+vShort+"'");
    } else {
      console.log("pTitle contains no '/': '"+pTitle+"' not found!");
    }
  } else {
    console.warn("getShortTitle(pTitle) - parameter pTitle not defined");
  }
  return vShort;
}

function getCourseTitle(pTitle,pCourse) {
  var retCourseTitle = pCourse || " Default";
  if (pTitle) {
    if (pTitle.indexOf("/") > 0) {
      retCourseTitle = pTitle.split("/")[0];
    } else {
      console.log("pTitle '"+pTitle+"' contains no slash '/'");
    }
  } else {
    console.warn("getCourseTitle(pTitle) - parameter pCourse not defined");
  }
  return retCourseTitle;
}


function replace_marker(pTemplate) {
    var vTemplate = pTemplate || "undefined replace_marker template";
    vTemplate = replaceString(vTemplate,"___AUDIO___",vAudioSlide);
    vTemplate = replaceString(vTemplate,"___COURSE___",vCourse);
    vTemplate = replaceString(vTemplate,"___COURSE_ENCODED___",encodeURI(vCourse));
    vTemplate = replaceString(vTemplate,"___COURSE_TITLE_ENCODED___",encodeURI(vCourseTitle));
    vTemplate = replaceString(vTemplate,"___DOMAIN___",vDomain);
    vTemplate = replaceString(vTemplate,"___DOMAINNAME___",vDomainName);
    vTemplate = replaceString(vTemplate,"___LANGUAGE___",vLanguage);
    vTemplate = replaceString(vTemplate,"___SLIDETYPE___",vSlideType);
    vTemplate = replaceString(vTemplate,"___TITLE___",vTitle);
    vTemplate = replaceString(vTemplate,"___SHORT_TITLE___",vShortTitle);
    vTemplate = replaceString(vTemplate,"___SHORT_TITLE_ENCODED___",encodeURI(vShortTitle));
    vTemplate = replaceString(vTemplate,"___TITLE_ENCODED___",encodeURI(vTitle));
    return vTemplate;
}

function getWikiDisplayURL() {
  return replace_marker("https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___");
};

function getWiki2RevealURL() {
  return replace_marker("https://niebert.github.io/Wiki2Reveal/wiki2reveal.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___&shorttitle=___SHORT_TITLE_ENCODED___&coursetitle=___COURSE_TITLE_ENCODED___");
}

function getWikiCourseURL() {
  return replace_marker("https://___LANGUAGE___.___DOMAIN___.org/wiki/___COURSE_ENCODED___");
}

function callWikiDisplay() {
  var vURL = getWikiDisplayURL();
  document.location.href=vURL;
};

function goto2page(pPageID) {
    document.location=replace_marker("wiki2reveal_"+pPageID+".html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___&shorttitle=___SHORT_TITLE_ENCODED___&coursetitle=___COURSE_TITLE_ENCODED___")
}

function back2startpage() {
    document.location=replace_marker("index.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___&shorttitle=___SHORT_TITLE_ENCODED___&coursetitle=___COURSE_TITLE_ENCODED___")
}

function update_short_title() {
  console.log("update_short_title()");
  vTitle = el("tTitle").value;
  vCourse = el("tCourse").value;
  vShortTitle = getShortTitle(vTitle,vCourse);
  el("tShortTitle").value = vShortTitle;
  if (vTitle && vTitle.indexOf("/")) {
    vCourseTitle = getCourseTitle(vTitle,vCourse);
    vCourse = vCourseTitle;
    el("tCourse").value = vCourseTitle;
    el("tCourseTitle").value = vCourseTitle;}
}

function onchange_short_title() {
  console.log("onchange_short_title()");
  vShortTitle = el("tShortTitle").value;
}

function update_course_title() {
  console.log("update_course_title()");
  vCourse = el("tCourse").value;
  vCourseTitle = vCourse;
  //vCourse = vCourseTitle;
  el("tCourse").value = vCourseTitle;
  el("tCourseTitle").value = vCourseTitle;
}

function update_links(pType) {
  console.log("update_links('"+pType+"')");
  vLanguage = el("sWikiLanguage").value;
  vCourse = el("tCourse").value;
  vCourseTitle = el("tCourseTitle").value;
  vDomain = el("sWikiDomain").value;
  vDomainName = firstUpperCase(vDomain);
  vSlideType = el("sSlideType").value;
  vTitle = el("tTitle").value;
  vShortTitle = el("tShortTitle").value;
  if (!vShortTitle) {
    vShortTitle = vTitle;
  }
  vAudioSlide = el("sAudioSlide").value;
  update_dom_links(pType);
}

function createHeader() {
  console.log("createHeader()-CALL");
  var vTemplate = "";
  //console.log("Check vDemo='" + vDemo +"'");
  switch (vLanguage) {
      case "de":
        vTemplate += el("wikiheader_de").value
      break;
      case "en":
        vTemplate += el("wikiheader").value
      break;
      case "es":
        vTemplate += el("wikiheader_es").value
      break;
      case "fr":
        vTemplate += el("wikiheader_fr").value
      break;
      default:
        vTemplate += el("wikiheader").value
  };
  setDomainName();
  vTemplate = replace_marker(vTemplate);
  el("headerout").value = vTemplate
};


function createFooter() {
  console.log("createFooter()-CALL");
  var vTemplate = "";
  var id4lang = "en";
  // ---- DEMO PAGE ------------
  if (vDemo == "yes") {
    if (vDataJSON.page4demo[vLanguage]) {
      id4lang = vLanguage;
    }
    vTemplate += vDataJSON.page4demo[id4lang];
  }
  // ---- FOOTER ---------------
  id4lang = "en";
  if (vDataJSON.footer4lang[vLanguage]) {
    id4lang = vLanguage;
  }
  vTemplate += vDataJSON.footer4lang[id4lang];
  // ---- PROCESS TEMPLATE ------
  setDomainName();
  vTemplate = replace_marker(vTemplate);
  el("footerout").value = vTemplate
};


function update_dom_links(pType) {
  console.log("update_dom_links('"+pType+"')");
  var vID = "courseurl"; // wikiurl, wiki2revealurl

  //----- set the Wiki URLs in DOM ------
  write2innerHTML(vID,vCourse);
  write2attribute(vID,"href",getWikiCourseURL());
  vID = "wikiurl"; // wikiurl, wiki2revealurl
  write2innerHTML(vID,vTitle);
  write2attribute(vID,"href",getWikiDisplayURL());
  vID = "wiki2revealurl"; // wikiurl, wiki2revealurl
  write2innerHTML(vID,"Wiki2Reveal - "+vShortTitle);
  write2attribute(vID,"href",getWiki2RevealURL());

  if (pType && (pType == "header")) {
    if (window.createHeader) {
      createHeader()
    } else {
      alert("Function createHeader() is not defined")
    }

  } else {
    if (window.createFooter) {
      createFooter();
    } else {
      alert("Function createFooter() is not defined")
    }
  }
}

function setDomainName() {
    switch (vDomain) {
      case "wikipedia":
        vDomainName = "Wikipedia";
      break;
      case "wikiversity":
        vDomainName = "Wikiversity";
      break;
      default:
        vDomainName = vDomain;
    }
}
