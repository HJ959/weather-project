"use strict";
// Tone JS vars
let oscOne, oscTwo, oscThree, oscFour;
let filter, filterTwo, filterThree, filterFour, pingPong;
let meter, meterTwo, meterThree;
let rms, rmsTwo, rmsThree;

// location vars
let lat, lon, lonLat;

// video vars
let youtubeIDs;

/////////////////////////////////////////////////////////////////////////
// on script load get the location and store to lat and lon
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  latLon = {
    latitude: lat,
    longitude: lon
  }
}
getLocation();

//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////


// add some super nice mega ping pong delay
pingPong = new Tone.PingPongDelay(30, 0.7).toDestination();

// filter to make less horrible
filter = new Tone.AutoFilter(0.13).toDestination().connect(pingPong);
filterTwo = new Tone.AutoFilter(0.05).toDestination().connect(pingPong);
filterThree = new Tone.AutoFilter(0.07).toDestination().connect(pingPong);
filterFour = new Tone.AutoFilter(0.11).toDestination().connect(pingPong);

// set up some RMS meters for use with the visuals
meter = new Tone.Meter();
meterTwo = new Tone.Meter();
meterThree = new Tone.Meter();

// connect RMS meters to the filters
filter.connect(meter);
filterTwo.connect(meterTwo);
filterThree.connect(meterThree);

// create ocsillator one
oscOne = new Tone.PulseOscillator({
  "detune": 5,
  "frequency": "F3",
  "phase": 0.25,
  "volume": -32
}).connect(filter);

// create ocsillator two
oscTwo = new Tone.PulseOscillator({
  "detune": -5,
  "frequency": "C3",
  "phase": -0.25,
  "volume": -32
}).connect(filterTwo);

// create ocsillator three
oscThree = new Tone.PulseOscillator({
  "detune": 7,
  "frequency": "E3",
  "phase": 0.5,
  "volume": -32
}).connect(filterThree);

// create ocsillator four
oscFour = new Tone.PulseOscillator({
  "detune": -7,
  "frequency": "G3",
  "phase": 0.3,
  "volume": -32
}).connect(filterFour);


/////////////////////////////////////////////////////////////////////////
function songStart(time) {
  // Function using fetch to POST to our API endpoint
function weatherLookup(data) {
  return fetch('/.netlify/functions/weatherLookup', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

// Todo data
lonLat = {
  latitude: lat,
  longitude: lon,
}

// create it!
weatherLookup(lonLat).then((response) => {
  console.log('API response', response)
  // set app state
}).catch((error) => {
  console.log('API error', error)
})
  filter.start();
  oscOne.start();
  oscTwo.start();
  oscThree.start();
  oscFour.start();

  // change the opacity of the videos 
  // grab the video elements
  let video1 = document.getElementById('playerOne');
  let video2 = document.getElementById('playerTwo');
  let video3 = document.getElementById('playerThree');
  rms = meter.getValue();
  rms = scale(rms, -100, 6, 0.1, 0.9)
  video1.style.opacity = rms;
  video1.style.filter = 'alpha(opacity=' + String(scale(rms, 0.1, 1.0, 1, 100)) + ')'; // IE fallback
}
/////////////////////////////////////////////////////////////////////////
function songStop(time) {
  filter.stop();
  oscOne.stop();
  oscTwo.stop();
  oscThree.stop();
  oscFour.stop();
}
/////////////////////////////////////////////////////////////////////////
// List of random youtube embeded IDs
youtubeIDs = ['viOkh9al0xM', 'AdUw5RdyZxI', 'Cp4RRAEgpeU', 'qQZILMyW88o', 'F109TZt3nRc', 'EoTrcNvDykY', '5jcU2MVkEy8', 'SQfE_-sSdc4', 'XBPjVzSoepo', 'aofxeUrkYQ4', 'A7oGJdUmVkg', 'QpqsJKI0Wfk', 'tbQqobLDCSg', 'jrVrO7VDccI', 'CRbOu0ygzLA', 'QbKEtWF6U2o']

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('playerOne', {
    videoId: youtubeIDs[getRandomInt(0, youtubeIDs.length)],
    playerVars: {
      'autoplay': 1,
      'mute': 1,
      'controls': 0,
      'rel': 0
    },
    events: {
      'onReady': onPlayerReady
    }
  });
  playerTwo = new YT.Player('playerTwo', {
    videoId: youtubeIDs[getRandomInt(0, youtubeIDs.length)],
    playerVars: {
      'autoplay': 1,
      'mute': 1,
      'controls': 0,
      'rel': 0
    },
    events: {
      'onReady': onPlayerReady
    }
  });
  playerThree = new YT.Player('playerThree', {
    videoId: youtubeIDs[getRandomInt(0, youtubeIDs.length)],
    playerVars: {
      'autoplay': 1,
      'mute': 1,
      'controls': 0,
      'rel': 0
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

//////////////////////////////////////////////////////////////////////////
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}
/////////////////////////////////////////////////////////////////////////
function scale(number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
/////////////////////////////////////////////////////////////////////////