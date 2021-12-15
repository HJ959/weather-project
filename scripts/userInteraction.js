"use strict";

// user functionality vars
let startStopFlag = 'Start';

/////////////////////////////////////////////////////////////////////////
function songStart(time) {
  filter.start();
  oscOne.start();
  oscTwo.start();
  oscThree.start();
  oscFour.start();
}
/////////////////////////////////////////////////////////////////////////
function songStop(time) {
  filter.stop();
  oscOne.stop();
  oscTwo.stop();
  oscThree.stop();
  oscFour.stop();
}

// if mousedown event un mute all youtube videos
document.querySelector('#wholePage')?.addEventListener('mousedown', function (event) {
  // if mousedown and the flag is set to Start
  if (startStopFlag === 'Start') {
    filter.start();
    oscOne.start();
    oscTwo.start();
    oscThree.start();
    oscFour.start();

    player.seekTo(getRandomInt(0,10800));
    playerTwo.seekTo(getRandomInt(0,10800));
    playerThree.seekTo(getRandomInt(0,10800));
    playerFour.seekTo(getRandomInt(0,10800));

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
      // grab the weather data from the API on mousedown
      weatherLookup(latLon).then((response) => {
        console.log('API response', response)
        // set app state
      }).catch((error) => {
        console.log('API error', error)
      })
  
      filter.stop();
      oscOne.stop();
      oscTwo.stop();
      oscThree.stop();
      oscFour.stop();

      player.pauseVideo();
      playerTwo.pauseVideo();
      playerThree.pauseVideo();
      playerFour.pauseVideo();
  
      startStopFlag = 'Start'
      return
    }
});

window.requestAnimationFrame(step);
