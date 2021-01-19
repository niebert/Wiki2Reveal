/* ---------------------------------------
 Exported Module Variable: Wiki2Reveal
 Package:  wiki2reveal
 Version:  2.1.16  Date: 2021/01/19 12:57:27
 Homepage: https://github.com/niebert/Wiki2Reveal#readme
 Author:   Engelbert Niehaus
 License:  MIT
 Date:     2021/01/19 12:57:27
 Require Module with:
    const Wiki2Reveal = require('wiki2reveal');
 JSHint: installation with 'npm install jshint -g'
 ------------------------------------------ */

/*jshint  laxcomma: true, asi: true, maxerr: 150 */
/*global alert, confirm, console, prompt */


function toggle_audio(pAudioID) {
  var vNode = document.getElementById(pAudioID);
  if (vNode) {
    var vPlayerStatus = vNode.getAttribute("playerstatus");
    if (vPlayerStatus) {
      if (vNode.playerstatus == 'pause') {
        vNode.setAttribute("playerstatus","play");
        vNode.play();
        console.log("PLAY Player with Audio ID: '" + pAudioID + "'");
      } else {
        console.log("PAUSE Player with Audio ID: '" + pAudioID + "'");
        vNode.playerstatus = 'pause';
        vNode.pause();
      }
    } else {
      console.warn("WARNING: toggle_audio('"+pAudioID+"') 'playerstatus' Attribute undefined!");
    }
  } else {
    console.warn("WARNING: toggle_audio('"+pAudioID+"') Audio Node [" + pAudioID + "] not defined");
  }
}

var vCurrentAudio = "";

function play_audio(pAudioID){
    console.log("Play audio with ID='"+pAudioID+"'");
    if (pAudioID != ""){
        if(vCurrentAudio != "" ) {
            document.getElementById(vCurrentAudio).pause();
        }
        var pAudioIDEl = document.getElementById(pAudioID);
        pAudioIDEl.currentTime = 0;
        pAudioIDEl.play();
        vCurrentAudio = pAudioID;
    }
    return false;
}

function pause_audio(pAudioID){
    console.log("Pause audio with ID='"+pAudioID+"'");
    if (pAudioID != ""){
        if(vCurrentAudio != "" ) {
            document.getElementById(vCurrentAudio).pause();
        }
        var pAudioIDEl = document.getElementById(pAudioID);
        pAudioIDEl.currentTime = 0;
        pAudioIDEl.pause();
        vCurrentAudio = pAudioID;
    };
    return false;
}

function stop_audio(pAudioID){
    console.log("Stop audio with ID='"+pAudioID+"'");
    if (pAudioID != ""){
        if(vCurrentAudio != "" ) {
            document.getElementById(vCurrentAudio).pause();
        }
        var pAudioIDEl = document.getElementById(pAudioID);
        pAudioIDEl.currentTime = 0;
        pAudioIDEl.pause();
        vCurrentAudio = pAudioID;
    }
    return false;
}

