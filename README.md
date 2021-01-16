<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="generator" content="pandoc EN">
  <title>Wiki2Reveal Footer</title>
  <link rel="stylesheet" href="css/main.css">
  <!-- Original Settings do not have the following CSS inserted directly -->
  <script src="js/linkparam.js"></script>
  <script src="js/string.js"></script>
  <script src="js/showhide.js"></script>
  <script src="js/writedom.js"></script>
  <!-- Printing and PDF exports -->
    <!--[if lt IE 9]>
  <script src="reveal/lib/js/html5shiv.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML" type="text/javascript"></script>
  <![endif]-->

  <script>
  //---------------------------------------
  //------DEFAULT VALUES-------------------
  //---------------------------------------
  var vTitle = "Normen, Metriken, Topologie";
  var vShortTitle ="undefined";
  var vAuthor = "Kurs:Funktionentheorie";
  var vLanguage = "de";
  var vDomain = "wikiversity";
  var vDomainName = "Wikiversity";
  var vAudioSlide = "no";
  var vSlideType = "reveal";
  var vDemo = "no";
  //---------------------------------------
  var vOffline = false; // set to true for Debugging in offline mode
  //---------------------------------------
  // vDataJSON.wikipage will be populated by db/wikipage_db.js
  var vDataJSON = {
    "wikipage": "== My Title ==\nMy content of Wikipage"
  };
  //---------------------------------------

  //var vWikiConvert = new WikiConvert();

  function el(pID) {
    return document.getElementById(pID)
  };

  function setWikiID() {
    el("wikiid").value = el("sWikiLanguage").value + el("sWikiDomain").value
  };

  </script>
<script src="js/links4wiki2reveal.js"></script>

</head>
<body style="margin:10px;background:#C0C0C0;font-family:Arial,Helvetica,sans-serif">
  <H2 class="slides" id="headerfooter">
      Generator for Wiki Footer - Version: <span id4marker="version">2.1.14</span>
  </H2>
  <H2 class="slides" id="headerdemo" style="display:none">
      Generator for Wiki2Reveal Demo Page
  </H2>
  <hr>
  <input type="button" value=" Back to Wiki2Reveal " onclick="back2startpage()">
  <hr>
  <table border="1">
    <tr>
      <td>
        <b>Wiki Domain</b>
      </td>
      <td>
        <select name="domain" id="sWikiDomain" onchange="update_links()">
             <option value="wikiversity" selected>Wikiversity</option>
             <option value="wikipedia">Wikipedia</option>
             <option value="wikibook">WikiBook</option>
             <option value="wiktionary">Wikionary</option>
             <option value="wikiquote">WikiQuote</option>
             <option value="wikisource">WikiSource</option>
          </select>
        </td>
    </tr>
    <tr>
      <td>
        <b>Article</b>
      </td>
      <td>
        <input type="text" size="80" name="title" id="tTitle" value="Normen, Metriken, Topologie"  onchange="update_links()">
      </td>
    </tr>
    <tr>
      <td>
        <b>Course/Author</b>
      </td>
      <td>
        <input type="text" size="80" name="author" id="tAuthor" value="Kurs:Funktionalanalysis"  onchange="update_links()">
      </td>
    </tr>
    <tr>
        <td>
          <b>Audio Slides</b>
        </td>
        <td>
          <select name="slidetype" id="sSlideType"  onchange="update_links()">
               <option value="reveal" selected>Reveal JS</option>
               <option value="dzslides">DZ Slides</option>
          </select>
          <select name="audioslide" id="sAudioSlide"  onchange="update_links()">
            <option value="yes">Use Player for Audio Slides</option>
            <option value="no">NO Audio Slides</option>
          </select>
        </td>
    </tr>
    <tr>
        <td>
          <b>Language</b>
        </td>
        <td>
          <select name="language" id="sWikiLanguage"  onchange="update_links()">
               <option value="en">English</option>
               <option value="es">Spanish</option>
               <option value="de"  selected="selected">German</option>
               <option value="fr">French</option>
               <option value="it">Italian</option>
               <option value="nl">Dutch</option>
               <option value="ja">Japanese</option>
               <option value="pl">Polish</option>
               <option value="ru">Russian</option>
               <option value="sv">Swedish</option>
               <option value="vi">Vietnamese</option>
               <option value="ar">Arabic</option>
               <option value="id">Indonesian</option>
               <option value="ms">Malay</option>
               <option value="ca">Catalan</option>
               <option value="cs">Czech</option>
               <option value="eu">Basque</option>
               <option value="fa">Persian</option>
               <option value="ko">Korean</option>
               <option value="hu">Hungarian</option>
               <option value="no">Norwegian</option>
               <option value="pt">Portuguese</option>
               <option value="ro">Romanian</option>
               <option value="sr">Serbian</option>
               <option value="sh">Serbo-Croatian</option>
               <option value="fi">Finnish</option>
               <option value="tr">Turkish</option>
               <option value="uk">Ukrainian</option>
               <option value="zh">Chinese</option>
               <option value="bs">Bosnian</option>
               <option value="bg">Bulgarian</option>
               <option value="da">Danish</option>
               <option value="et">Estonian</option>
               <option value="el">Greek</option>
               <option value="eo">Esperanto</option>
               <option value="gl">Galician</option>
               <option value="he">Hebrew</option>
               <option value="hr">Croatian</option>
               <option value="lv">Latvian</option>
               <option value="lt">Lithuanian</option>
               <option value="nn">Norwegian Nynorsk</option>
               <option value="sk">Slovak</option>
               <option value="sl">Slovenian</option>
               <option value="th">Thai</option>
             </select>
        </td>
    </tr>
  </table>
  <h3>Footer Creator for Wiki2Reveal Presentation:</h3>
  Copy the link in the textbox below into your course page:
  <ul>
    <li>
      <b>Course Page:</b> Use the <a href="#" onclick="back2startpage()">Course Page Link Creator</a> for the Wiki Course Page <a id="courseurl" href="undefined" target="_blank">Undefined Course Page</a>.
    </li>
    <li>
      <b>Wikiversity Page:</b> The Wiki source article for Wiki2Reveal will be defined on <a id="wikiurl" href="undefined" target="_blank">Undefined Wiki Page</a>
    </li>
    <li>
      <b>Wiki2Reveal Page:</b> The Wiki2Reveal presentation will be defined on <a id="wiki2revealurl" href="undefined" target="_blank">Undefined Wiki2URL Page</a>
    </li>
  </ul>
  <hr>

  <textarea id="footerout" rows="35" cols="90"></textarea>
<div style="display:none">
  <b>Footer Wiki Source EN:</b></br>
    <textarea id="wikisrc" rows="12" cols="120">
== Page Information ==
You can display this page as '''[https://niebert.github.io/Wiki2Reveal/wiki2reveal.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___ Wiki2Reveal slides]'''

=== Wiki2Reveal ===
The '''[https://niebert.github.io/Wiki2Reveal/index.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___ Wiki2Reveal slides]''' were created for the '''[https://de.wikiversity.org/wiki/____COURSE_ENCODED___ ___COURSE___]'''' and the Link for the [[v:en:Wiki2Reveal|Wiki2Reveal Slides]] was created with the [https://niebert.github.io/Wiki2Reveal/ link generator].
<!--
* Contents of the page are based on:
** [https://___LANGUAGE___.wikipedia.org/wiki/___TITLE_ENCODED___ https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___]
-->
* [https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___ This page] is designed as a [https://en.wikiversity.org/wiki/PanDocElectron-Presentation PanDocElectron-SLIDE] document type.
* Source: ___DOMAINNAME___  https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___
* see [[v:en:Wiki2Reveal|Wiki2Reveal]] for the functionality of [https://niebert.github.io/Wiki2Reveal/index.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___ Wiki2Reveal].
&lt;!-- * Next contents of the course are [[]] --&gt;

[[Category:Wiki2Reveal]]

  </textarea>
  <b>Footer Wiki Source DE:</b></br>
    <textarea id="wikisrc_de" rows="12" cols="120">
== Seiteninformation ==
Diese Lernresource können Sie als '''[https://niebert.github.io/Wiki2Reveal/wiki2reveal.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___ Wiki2Reveal-Foliensatz]''' darstellen.

=== Wiki2Reveal ===

Dieser '''[https://niebert.github.io/Wiki2Reveal/wiki2reveal.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___ Wiki2Reveal Foliensatz]''' wurde für den Lerneinheit '''[https://de.wikiversity.org/wiki/____COURSE_ENCODED___ ___COURSE___]'''' erstellt der Link für die [[v:en:Wiki2Reveal|Wiki2Reveal-Folien]] wurde mit dem  [https://niebert.github.io/Wiki2Reveal/ Wiki2Reveal-Linkgenerator] erstellt.
<!--
* Die Inhalte der Seite basieren auf den folgenden Inhalten:
** [https://___LANGUAGE___.wikipedia.org/wiki/___TITLE_ENCODED___ https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___]
-->
* [https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___ Die Seite] wurde als Dokumententyp [https://___LANGUAGE___.wikiversity.org/wiki/PanDocElectron-Presentation PanDocElectron-SLIDE] erstellt.
* Link zur Quelle in  ___DOMAINNAME___:  https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___
* siehe auch weitere Informationen zu [[v:en:Wiki2Reveal|Wiki2Reveal]] und unter [https://niebert.github.io/Wiki2Reveal/index.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___ Wiki2Reveal-Linkgenerator].
&lt;!-- * Nächster Inhalt des Kurses ist [[]] --&gt;

[[Category:Wiki2Reveal]]

  </textarea>

  <b>Footer Wiki Source FR:</b></br>
    <textarea id="wikisrc_fr" rows="12" cols="120">
== Informations de Page ==

=== Wiki2Reveal ===
Ce jeu de '''[https://niebert.github.io/Wiki2Reveal/wiki2reveal.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___ diapositives Wiki2Reveal]''' a été créé pour la session '''[https://de.wikiversity.org/wiki/____COURSE_ENCODED___ ___COURSE___]''' et le lien pour les diapositives Wiki2Reveal a été créé à l'aide du [https://niebert.github.io/Wiki2Reveal/ générateur de liens Wiki2Reveal].
<!--
* Le contenu de la page est basé sur le contenu suivant:
** [https://___LANGUAGE___.wikipedia.org/wiki/___TITLE_ENCODED___ https://___LANGUAGE___.wikipedia.org/wiki/___TITLE_ENCODED___]
-->
* [https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___ Le site] a été créé comme un type de document [https://en.wikiversity.org/wiki/PanDocElectron-Presentation PanDocElectron-SLIDE].
* Lien vers la source  ___DOMAINNAME___: https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___
* Voir les détails sur [[v:fr:Wiki2Reveal|Wiki2Reveal]] et [https://niebert.github.io/Wiki2Reveal/index.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___ générateur Wiki2Reveal-Link].
&lt;!-- * Le contenu suivant du cours est [[]] --&gt;

[[Category:Wiki2Reveal]]

  </textarea>


  <b>Footer Wiki Source ES:</b></br>
    <textarea id="wikisrc_es" rows="12" cols="120">
== Información de la Página ==

=== Wiki2Reveal ===
Este conjunto de '''[https://niebert.github.io/Wiki2Reveal/wiki2reveal.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___ diapositivas de Wiki2Reveal]''' se creó para la sesión '''[https://de.wikiversity.org/wiki/____COURSE_ENCODED___ ___CURSO___]''', y el enlace para las diapositivas de Wiki2Reveal se creó con el [https://niebert.github.io/Wiki2Reveal/ generador de enlaces de Wiki2Reveal].
<!--
* El contenido de la página se basa en el siguiente contenido:
** [https://___LANGUAGE___.wikipedia.org/wiki/___TITLE_ENCODED___ https://___LANGUAGE___.wikipedia.org/wiki/___TITLE_ENCODED___]
-->
* [https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___ La página] se creó como tipo de documento [https://en.wikiversity.org/wiki/PanDocElectron-Presentation PanDocElectron-SLIDE].
* Enlace a la fuente en  ___DOMAINNAME___: https://___LANGUAGE___.___DOMAIN___.org/wiki/___TITLE_ENCODED___
* Consulte también más información sobre [[v:en:Wiki2Reveal|Wiki2Reveal]] y [https://niebert.github.io/Wiki2Reveal/index.html?domain=___DOMAIN___&title=___TITLE_ENCODED___&author=___COURSE_ENCODED___&language=___LANGUAGE___&audioslide=___AUDIO___ Wiki2Reveal link generator].
&lt;!-- * El siguiente contenido del curso es [[]] --&gt;

[[Categoría: Wiki2Reveal]]
</textarea>

</div>
</body>

    <script>
    //---------------------------------------
    //------READ LINKPARAMETER---------------
    //---------------------------------------
    var vLinkParam = new LinkParam();
    vLinkParam.init(document);
    //------ TiTLE --------------------------
    if (vLinkParam.exists("title")) {
      // e.g. index.html?title=Normen,_Metriken,_Topologie
      vTitle= vLinkParam.getValue("title");
      el("tTitle").value = vLinkParam.getValue("title");
    };
    //------ AUTHOR -------------------------
    if (vLinkParam.exists("author")) {
      // e.g. index.html?author=Engelbert_Niehaus
      vAuthor = vLinkParam.getValue("author");
      el("tAuthor").value = vLinkParam.getValue("author");
    };
    //------ COURSE NAME ---------------------
    if (vLinkParam.exists("course")) {
      // e.g. index.html?author=Engelbert_Niehaus
      vAuthor = vLinkParam.getValue("course");
      el("tAuthor").value = vLinkParam.getValue("course");
    };
    //------CALC SHORT TiTLE --------------------------
    vShortTitle = getShortTitle(vTitle);
    //------ SLIDETYPE -----------------------
    if (vLinkParam.exists("slidetype")) {
      // e.g. index.html?author=Engelbert_Niehaus
      vSlideType = vLinkParam.getValue("slidetype");
      el("sSlideType").value = vLinkParam.getValue("slidetype");
    };
    //------ DEMO -------------------------
    if (vLinkParam.exists("demo")) {
      // e.g. index.html?author=Engelbert_Niehaus
      console.log("Demo Slides added");
      vDemo = vLinkParam.getValue("demo");
      hide("headerfooter");
      show("headerdemo");
    };
    //------ LANGUAGE ----------------------
    if (vLinkParam.exists("language")) {
      // e.g. index.html?language=de
      vLanguage = vLinkParam.getValue("language");
      el("sWikiLanguage").value = vLinkParam.getValue("language");
    };
    //------ DOMAIN ------------------------
    if (vLinkParam.exists("domain")) {
      // e.g. index.html?domain=wikipedia
      vDomain = vLinkParam.getValue("domain");
      el("sWikiDomain").value  = vLinkParam.getValue("domain");
      vDomainName = firstUpperCase(vDomain);
  };
    //------ AUDIO SLIDE ------------------------
    if (vLinkParam.exists("audioslide")) {
      // e.g. index.html?domain=wikipedia
      vAudioSlide = vLinkParam.getValue("audioslide");
      el("sAudioSlide").value = vLinkParam.getValue("audioslide");
    };
    //--------------------------------------
    function createFooter() {
      var vTemplate = "";
      console.log("Check vDemo='" + vDemo +"'");
      if (vDemo == "yes") {
        for (var i = 1; i < 4; i++) {
          vTemplate += "== Header " + i + " ==\nText of Slide " + i + "\n\n"
        }
      }
      switch (vLanguage) {
        case "de":
          vTemplate += el("wikisrc_de").value
        break;
        case "en":
          vTemplate += el("wikisrc").value
        break;
        case "es":
          vTemplate += el("wikisrc_es").value
        break;
        case "fr":
          vTemplate += el("wikisrc_fr").value
        break;
        default:
          vTemplate += el("wikisrc").value
      };
      setDomainName();
      vTemplate = replace_marker(vTemplate);
      el("footerout").value = vTemplate
    };


    update_links();
    </script>

</html>
