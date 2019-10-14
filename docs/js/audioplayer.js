
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
