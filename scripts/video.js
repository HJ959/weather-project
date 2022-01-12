"use strict";
// video vars
let player, playerTwo, playerThree, playerFour;
let vidElement1, vidElement2, vidElement3, vidElement4;
let wholeScreen;
let video1, video2, video3, video4;
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

// List of random youtube embeded IDs
let youtubeIDs = ['5NS_RGXqljA', 'lXoH1oQJvHo', '3rDjPLvOShM', 'Y53k5YCL93c', '9Ej-0VRWmI8', 'fh3EdeGNKus', 'nMAzchVWTis', 'UuWr5TCbumI', 'wnhvanMdx4s']

// rotate potential values
let rotateValues = ['0', '180']

// grab the videos
video1 = document.getElementById('video1');
video2 = document.getElementById('video2');
video3 = document.getElementById('video3');
video4 = document.getElementById('video4');

// to rotate the videos randomly to create interesting overlaps
video1.style.transform = 'rotate(' + rotateValues[getRandomInt(0, 2)] + 'deg)';
video2.style.transform = 'rotate(' + rotateValues[getRandomInt(0, 2)] + 'deg)';
video3.style.transform = 'rotate(' + rotateValues[getRandomInt(0, 2)] + 'deg)';
video4.style.transform = 'rotate(' + rotateValues[getRandomInt(0, 2)] + 'deg)';

// randomize which ones at the forefront
video1.style.zIndex = String(getRandomInt(0,5));
video2.style.zIndex = String(getRandomInt(0,5));
video3.style.zIndex = String(getRandomInt(0,5));
video4.style.zIndex = String(getRandomInt(0,5));

// 2. This code loads the IFrame Player API code asynchronously.
tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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
}


function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    // iterate over 5 videos with different rates
    opacityValues = opacityIter(opacityValues, video1, 1, currentClouds);
    opacityValues2 = opacityIter(opacityValues2, video2, 1, dayOneClouds);
    opacityValues3 = opacityIter(opacityValues3, video3, 1, dayTwoClouds);
    opacityValues4 = opacityIter(opacityValues4, video4, 1, dayThreeClouds);
  }
  previousTimeStamp = timestamp
  window.requestAnimationFrame(step);
}

function opacityIter(opacityValues, element, incrementValue, currentClouds) {
  // iterate up
  if (opacityValues.vidReverse === false) {
    // control the players opacity
    element.style.opacity = String(opacityValues.vidOpacity / 10000);
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