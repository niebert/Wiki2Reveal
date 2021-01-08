
  function replace_marker(pTemplate) {
    var vTemplate = pTemplate || "undefined replace_marker template";
    vTemplate = replaceString(vTemplate,"___AUDIO___",vAudioSlide);
    vTemplate = replaceString(vTemplate,"___COURSE___",vAuthor);
    vTemplate = replaceString(vTemplate,"___COURSE_ENCODED___",encodeURI(vAuthor));
    vTemplate = replaceString(vTemplate,"___DOMAIN___",vDomain);
    vTemplate = replaceString(vTemplate,"___DOMAINNAME___",vDomainName);
    vTemplate = replaceString(vTemplate,"___LANGUAGE___",vLanguage);
    vTemplate = replaceString(vTemplate,"___TITLE___",vTitle);
    vTemplate = replaceString(vTemplate,"___SHORT_TITLE___",vShortTitle);
    vTemplate = replaceString(vTemplate,"___TITLE_ENCODED___",encodeURI(vTitle));
    return vTemplate;
  }


    function getShortTitle(pTitle) {
      var vShort = pTitle;
      if (pTitle) {
        vShort = pTitle.replace(/_/g," ");
        var vSearch = vAuthor+"/";
        if (vTitle.indexOf(vSearch) >= 0) {
          vShort = replaceString(pTitle,vSearch,"");
          console.log("Prefix: '"+vSearch+"' removed!");
        } else {
          console.log("Prefix: '"+vSearch+"' not found!");
        }
      } else {
        console.warn("getShortTitle(pTitle) - parameter pTitle not defined");
      }
      return vShort;
    }

    function back2startpage() {
      update_dom2vars();
      document.location=replace_marker("index.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___");
    }



    function getWikiDisplayURL() {
        return replace_marker("https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___");
    }

    function getWiki2RevealURL() {
        return replace_marker("https://niebert.github.io/Wiki2Reveal/wiki2reveal.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___");
    }

    function getWikiCourseURL() {
        return replace_marker("https://___LANGUAGE___.___DOMAIN___.org/wiki/___COURSE_ENCODED___");
    }

    function callWikiDisplay() {
        var vURL = getWikiDisplayURL();
        document.location.href=vURL;
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


            function update_dom_links() {
              var vID = "courseurl"; // wikiurl, wiki2revealurl
              var vCourse = vAuthor;

              //----- set the Wiki URLs in DOM ------
              write2innerHTML(vID,vCourse);
              write2attribute(vID,"href",getWikiCourseURL());
              vID = "wikiurl"; // wikiurl, wiki2revealurl
              write2innerHTML(vID,vTitle);
              write2attribute(vID,"href",getWikiDisplayURL());
              vID = "wiki2revealurl"; // wikiurl, wiki2revealurl
              write2innerHTML(vID,"Wiki2Reveal "+vShortTitle);
              write2attribute(vID,"href",getWiki2RevealURL());

              createFooter();
            }


            function update_dom2vars() {
              vLanguage = el("sWikiLanguage").value;
              vCourse = el("tAuthor").value;
              vDomain = el("sWikiDomain").value;
              vDomainName = firstUpperCase(vDomain);
              vTitle = el("tTitle").value;
              vShortTitle = getShortTitle(vTitle);
              vAudioSlide = el("sAudioSlide").value;
            }

           function update_links() {
             update_dom2vars();
             update_dom_links();
           }
