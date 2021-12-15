"use strict";
// video vars
let player, playerTwo, playerThree, playerFour, playerFive;
let opacity1 = 0,
  opacity2 = 0,
  opacity3 = 0;
let wholeScreen;
let video1, video2, video3, video4, video5;
let start, previousTimeStamp;
let opacityValues = {
  vidOpacity: 0,
  vidReverse: false
};
let opacityValues2 = {
  vidOpacity: 0,
  vidReverse: false
};
let opacityValues3 = {
  vidOpacity: 0,
  vidReverse: false
};
let opacityValues4 = {
  vidOpacity: 0,
  vidReverse: false
};
let opacityValues5 = {
  vidOpacity: 0,
  vidReverse: false
};
// List of random youtube embeded IDs
let youtubeIDs = ['3rDjPLvOShM','BlVJviK0ci4','9Ej-0VRWmI8','nMAzchVWTis','UuWr5TCbumI']

video1 = document.getElementById('video1');
video2 = document.getElementById('video2');
video3 = document.getElementById('video3');
video4 = document.getElementById('video4');
video5 = document.getElementById('video5');

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerVars = {
  'autoplay': 0,
  'mute': 1,
  'controls': 0,
  'rel': 0
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('playerOne', {
    videoId: youtubeIDs[getRandomInt(0, youtubeIDs.length)],
    playerVars: playerVars
  });
  playerTwo = new YT.Player('playerTwo', {
    videoId: youtubeIDs[getRandomInt(0, youtubeIDs.length)],
    playerVars: playerVars
  });
  playerThree = new YT.Player('playerThree', {
    videoId: youtubeIDs[getRandomInt(0, youtubeIDs.length)],
    playerVars: playerVars
  });
  playerFour = new YT.Player('playerFour', {
    videoId: youtubeIDs[getRandomInt(0, youtubeIDs.length)],
    playerVars: playerVars
  });
  playerFive = new YT.Player('playerFive', {
    videoId: youtubeIDs[getRandomInt(0, youtubeIDs.length)],
    playerVars: playerVars
  });
}

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    // iterate over 5 videos with different rates
    opacityValues = opacityIter(opacityValues, video1, 1);
    opacityValues2 = opacityIter(opacityValues2, video2, 2);
    opacityValues3 = opacityIter(opacityValues3, video3, 5);
    opacityValues4 = opacityIter(opacityValues4, video4, 10);
    opacityValues5 = opacityIter(opacityValues5, video5, 20);
  }
  previousTimeStamp = timestamp
  window.requestAnimationFrame(step);
}

function opacityIter(opacityValues, element, incrementValue) {
  // iterate up
  if (opacityValues.vidReverse === false) {
    // control the players opacity
    element.style.opacity = String(opacityValues.vidOpacity / 10000);
    element.style.filter = 'alpha(opacity=' + String(opacityValues.vidOpacity);
    opacityValues.vidOpacity = opacityValues.vidOpacity + incrementValue;
    if (opacityValues.vidOpacity % 10000 === 0) {
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
    if (opacityValues.vidOpacity === 0) {
      opacityValues.vidReverse = !opacityValues.vidReverse;
    }
    return {
      vidOpacity: opacityValues.vidOpacity,
      vidReverse: opacityValues.vidReverse
    };
  }
}
/////////////////////////////////////////////////////////////////////////////////