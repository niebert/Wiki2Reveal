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

function update_links() {
  vLanguage = el("sWikiLanguage").value;
  vCourse = el("tCourse").value;
  vCourseTitle = el("tCourseTitle").value;
  vDomain = el("sWikiDomain").value;
  vDomainName = firstUpperCase(vDomain);
  vSlideType = el("sSlideType").value;
  vTitle = el("tTitle").value;
  vShortTitle = el("tShortTitle").value;
  vAudioSlide = el("sAudioSlide").value;
  update_dom_links();
}

function update_dom_links() {
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

  createFooter();
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
