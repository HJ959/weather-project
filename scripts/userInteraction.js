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
      reverb.wet.value = 0;
      reverbTwo.wet.value = 0;
      player.pauseVideo();
      playerTwo.pauseVideo();
      if (isMobile === false) {
        playerThree.pauseVideo();
        playerFour.pauseVideo();
      }

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
    player.seekTo(getRandomInt(0,7200));
    playerTwo.seekTo(getRandomInt(0,7200));
    if (isMobile === false) {
      playerThree.seekTo(getRandomInt(0,7200));
      playerFour.seekTo(getRandomInt(0,7200));
    }

    startStopFlag = 'Start';
  }
  // if mousedown and the flag is set to Start
  if (startStopFlag === 'Start') {
    pressToStartDiv.style.display = "none";
    oscOne.start();
    oscTwo.start();
    oscThree.start();
    oscFour.start();

    reverb.wet.value = 0.7
    reverbTwo.wet.value = 0.7

    player.playVideo();
    playerTwo.playVideo();
    player.unMute();
    playerTwo.unMute();

    if (isMobile === false) {
      playerThree.playVideo();
      playerFour.playVideo();
      playerThree.unMute();
      playerFour.unMute();
    }
    startStopFlag = 'Stop'

    return
  }
  // if mousedown and the flag is set to Start
  if (startStopFlag === 'Stop') {
    pressToStartDiv.style.display = "grid";
    document.getElementById('waitingText').innerHTML = "Paused, tap screen to start, tap screen to stop!";
    filter.stop();
    oscOne.stop();
    oscTwo.stop();
    oscThree.stop();
    oscFour.stop();

    reverb.wet.value = 0;
    reverbTwo.wet.value = 0;

    player.pauseVideo();
    playerTwo.pauseVideo();
    if (isMobile === false) {
      playerThree.pauseVideo();
      playerFour.pauseVideo();
    }

    startStopFlag = 'Start'
    return
  }
});