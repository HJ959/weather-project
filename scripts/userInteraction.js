"use strict";

// user functionality vars
let startStopFlag = 'Start';
let pressToStartDiv = document.getElementById('pressToStartDiv');

// if the user leaves the tab and it becomes inactive stop playing sound and video
document.addEventListener("visibilitychange", event => {
  if (document.visibilityState != "visible") {
    filter.stop();
    oscOne.stop();
    oscTwo.stop();
    oscThree.stop();
    oscFour.stop();
    noise.stop();
    pingPong.wet.value = 0
    pitchShift.wet.value = 0.0
    pitchShift.feedback.value = 0.0
    player.pauseVideo();
    playerTwo.pauseVideo();
    playerThree.pauseVideo();
    playerFour.pauseVideo();
    startStopFlag = 'Start'
  }
});

// if mousedown event un mute all youtube videos
document.querySelector('#wholePage')?.addEventListener('mousedown', function (event) {
  // if mousedown and the flag is set to Start
  if (startStopFlag === 'Start') {
    pressToStartDiv.style.display = "none";
    oscOne.start();
    oscTwo.start();
    oscThree.start();
    oscFour.start();
    noise.start();

    pingPong.wet.value = 0.7

    player.seekTo(getRandomInt(0, 10800));
    playerTwo.seekTo(getRandomInt(0, 10800));
    playerThree.seekTo(getRandomInt(0, 10800));
    playerFour.seekTo(getRandomInt(0, 10800));

    player.playVideo();
    playerTwo.playVideo();
    playerThree.playVideo();
    playerFour.playVideo();

    player.unMute();
    playerTwo.unMute();
    playerThree.unMute();
    playerFour.unMute();
    startStopFlag = 'Stop'

    return
  }
  // if mousedown and the flag is set to Start
  if (startStopFlag === 'Stop') {
    filter.stop();
    oscOne.stop();
    oscTwo.stop();
    oscThree.stop();
    oscFour.stop();
    noise.stop();

    pingPong.wet.value = 0
    pitchShift.wet.value = 0.0
    pitchShift.feedback.value = 0.0

    player.pauseVideo();
    playerTwo.pauseVideo();
    playerThree.pauseVideo();
    playerFour.pauseVideo();

    startStopFlag = 'Start'
    return
  }
});