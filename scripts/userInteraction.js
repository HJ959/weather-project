"use strict";

// user functionality vars
let startStopFlag = 'Loading';
let pressToStartDiv = document.getElementById('pressToStartDiv');

// if the user leaves the tab and it becomes inactive stop playing sound and video
document.addEventListener("visibilitychange", event => {
  if (document.visibilityState != "visible") {
    if (startStopFlag === 'Stop') {
      filter.stop();
      oscOne.stop();
      oscTwo.stop();
      oscThree.stop();
      oscFour.stop();
      noise.stop();
      reverb.wet.value = 0;
      reverbTwo.wet.value = 0;
      pitchShift.wet.value = 0.0;
      player.pauseVideo();
      playerTwo.pauseVideo();
      playerThree.pauseVideo();
      playerFour.pauseVideo();

      startStopFlag = 'Start'
    }
  }
});

// if mousedown event un mute all youtube videos
document.querySelector('#wholePage')?.addEventListener('mousedown', function (event) {
  if (startStopFlag === "readyForFirstClick") {
    Tone.start()
  	console.log('audio is ready')
    // call the sound and video elements now we have the weather data
    droneSynth();
    window.requestAnimationFrame(step);
    startStopFlag = 'Start';
  }
  // if mousedown and the flag is set to Start
  if (startStopFlag === 'Start') {
    pressToStartDiv.style.display = "none";
    oscOne.start();
    oscTwo.start();
    oscThree.start();
    oscFour.start();
    noise.start();

    reverb.wet.value = 0.7
    reverbTwo.wet.value = 0.7

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

    reverb.wet.value = 0;
    reverbTwo.wet.value = 0;
    pitchShift.wet.value = 0;
    pitchShift.feedback.value = 0;

    player.pauseVideo();
    playerTwo.pauseVideo();
    playerThree.pauseVideo();
    playerFour.pauseVideo();

    startStopFlag = 'Start'
    return
  }
});