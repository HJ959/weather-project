"use strict";
// video vars
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let player = undefined,
  playerTwo = undefined,
  playerThree = undefined,
  playerFour = undefined;
let vidElement1, vidElement2, vidElement3, vidElement4;
let wholeScreen;
let video1, video2, video3, video4;
let vidID1, vidID2, vidID3, vidID4;
let start, previousTimeStamp;
let opacityValues = {
  vidOpacity: getRandomInt(1000, 4000),
  vidReverse: false
};
let opacityValues2 = {
  vidOpacity: getRandomInt(1000, 4000),
  vidReverse: false
};
let opacityValues3 = {
  vidOpacity: getRandomInt(1000, 4000),
  vidReverse: false
};
let opacityValues4 = {
  vidOpacity: getRandomInt(1000, 4000),
  vidReverse: false
};
// for the youtube object  
let tag, firstScriptTag;
var playerVars = {
  'autoplay': 0,
  'mute': 1,
  'controls': 0,
  'rel': 0
}

let playersReady = 0;

let countPlayersReady = 0;

// List of random youtube embeded IDs
let youtubeIDs = ['5NS_RGXqljA', 'lXoH1oQJvHo', '3rDjPLvOShM', 'Y53k5YCL93c', '9Ej-0VRWmI8', 'fh3EdeGNKus', 'nMAzchVWTis', 'UuWr5TCbumI', 'wnhvanMdx4s', 'ADt_RisXY0U', 'qZ0_aa6RxvQ', 'Hndf5JRwUL0']

// rotate potential values
let rotateValues = ['0', '180']

// grab the videos
video1 = document.getElementById('video1');
video2 = document.getElementById('video2');

// to rotate the videos randomly to create interesting overlaps
video1.style.transform = 'rotate(' + rotateValues[getRandomInt(0, 2)] + 'deg)';
video2.style.transform = 'rotate(' + rotateValues[getRandomInt(0, 2)] + 'deg)';

// randomize which ones at the forefront
video1.style.zIndex = String(getRandomInt(0, 5));
video2.style.zIndex = String(getRandomInt(0, 5));

if (isMobile === false) {
  video3 = document.getElementById('video3');
  video4 = document.getElementById('video4');
  video3.style.transform = 'rotate(' + rotateValues[getRandomInt(0, 2)] + 'deg)';
  video4.style.transform = 'rotate(' + rotateValues[getRandomInt(0, 2)] + 'deg)';
  video3.style.zIndex = String(getRandomInt(0, 5));
  video4.style.zIndex = String(getRandomInt(0, 5));
}

// 2. This code loads the IFrame Player API code asynchronously.
tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  vidID1 = youtubeIDs[getRandomInt(0, youtubeIDs.length)];
  player = new YT.Player('playerOne', {
    videoId: vidID1,
    playerVars: playerVars,
    height: windowHeight,
    width: windowWidth,
    loop: 1,
    events: {
      'onReady': onPlayerReady,
    }
  });
  vidID2 = youtubeIDs[getRandomInt(0, youtubeIDs.length)];
  playerTwo = new YT.Player('playerTwo', {
    videoId: vidID2,
    playerVars: playerVars,
    height: windowHeight,
    width: windowWidth,
    loop: 1,
    events: {
      'onReady': onPlayerReady,
    }
  });
  if (isMobile === false) {
    vidID3 = youtubeIDs[getRandomInt(0, youtubeIDs.length)];
    playerThree = new YT.Player('playerThree', {
      videoId: vidID3,
      playerVars: playerVars,
      height: windowHeight,
      width: windowWidth,
      loop: 1,
      events: {
        'onReady': onPlayerReady,
      }
    });
    vidID4 = youtubeIDs[getRandomInt(0, youtubeIDs.length)];
    playerFour = new YT.Player('playerFour', {
      videoId: vidID4,
      playerVars: playerVars,
      height: windowHeight,
      width: windowWidth,
      loop: 1,
      events: {
        'onReady': onPlayerReady,
      }
    });
  }
}

function onPlayerReady() {
  countPlayersReady++;
  if (countPlayersReady === 3 && isMobile === false) {
    document.getElementById('waitingText').innerHTML = "Wear some headphones for the best experience, tap screen to start, tap screen to stop!";
    playersReady = 1;
    startStopFlag = 'readyForFirstClick'
  }
  if (countPlayersReady === 1 && isMobile === true) {
    document.getElementById('waitingText').innerHTML = "Wear some headphones for the best experience, tap screen to start, tap screen to stop!";
    playersReady = 1;
    startStopFlag = 'readyForFirstClick'
  }
}

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    // iterate over 5 videos with different rates
    opacityValues = opacityIter(opacityValues, video1, dayOneMaxTempVidSpeed, currentClouds);
    opacityValues2 = opacityIter(opacityValues2, video2, dayTwoMaxTempVidSpeed, dayOneClouds);
    if (isMobile === false) {
      opacityValues3 = opacityIter(opacityValues3, video3, dayThreeMaxTempVidSpeed, dayTwoClouds);
      opacityValues4 = opacityIter(opacityValues4, video4, dayFourMaxTempVidSpeed, dayThreeClouds);
    }

    if (playersReady === 1) {
      try {
        player.setVolume(parseInt(opacityValues.vidOpacity * 0.01));
        playerTwo.setVolume(parseInt(opacityValues2.vidOpacity * 0.01));
        if (isMobile === false) {
          playerThree.setVolume(parseInt(opacityValues3.vidOpacity * 0.01));
          playerFour.setVolume(parseInt(opacityValues4.vidOpacity * 0.01));
        }
      } catch (e) {
        if (e instanceof TypeError) {
          // for some reason not always there just carry on
        } else {
          throw e; // re-throw the error unchanged
        }
      }

    }

    oscOne.volume.value = scale(opacityValues.vidOpacity, 5000, 10000, -30, -24);
    oscTwo.volume.value = scale(opacityValues2.vidOpacity, 5000, 10000, -30, -24);
    if (isMobile === false) {
      oscThree.volume.value = scale(opacityValues3.vidOpacity, 5000, 10000, -30, -24);
      oscFour.volume.value = scale(opacityValues4.vidOpacity, 5000, 10000, -30, -24);
    }
    if (isMobile === true) {
      oscThree.volume.value = scale(opacityValues.vidOpacity, 5000, 10000, -30, -24);
      oscFour.volume.value = scale(opacityValues2.vidOpacity, 5000, 10000, -30, -24);
    }

    // combination of the oscillators volume controls the pitch shifter
    pitchShift.feedback.value = scale((opacityValues.vidOpacity + opacityValues2.vidOpacity), 0, 20000, 0, 1);
  }
  previousTimeStamp = timestamp
  window.requestAnimationFrame(step);
}

function opacityIter(opacityValues, element, incrementValue, currentClouds) {
  // iterate up
  if (opacityValues.vidReverse === false) {
    // control the players opacity
    element.style.opacity = String(opacityValues.vidOpacity * 0.0001);
    element.style.filter = 'alpha(opacity=' + String(opacityValues.vidOpacity);
    opacityValues.vidOpacity = opacityValues.vidOpacity + incrementValue;
    if (opacityValues.vidOpacity % currentClouds === 0 || opacityValues.vidOpacity > currentClouds) {
      opacityValues.vidReverse = !opacityValues.vidReverse;
    }
    return {
      vidOpacity: opacityValues.vidOpacity,
      vidReverse: opacityValues.vidReverse
    };
  }
  // iterate down
  if (opacityValues.vidReverse === true) {
    // control the players opacity
    element.style.opacity = String(opacityValues.vidOpacity / 10000);
    element.style.filter = 'alpha(opacity=' + String(opacityValues.vidOpacity);
    opacityValues.vidOpacity = opacityValues.vidOpacity - incrementValue;
    if (opacityValues.vidOpacity === 0 || opacityValues.vidOpacity < 0) {
      opacityValues.vidReverse = !opacityValues.vidReverse;
    }
    return {
      vidOpacity: opacityValues.vidOpacity,
      vidReverse: opacityValues.vidReverse
    };
  }
}
/////////////////////////////////////////////////////////////////////////////////