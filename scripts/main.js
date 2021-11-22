let oscOne, oscTwo, ocsThree, oscFour;
let filter, filterTwo, filterThree, filterFour, pingPong

/////////////////////////////////////////////////////////////////////////
function setup() {
  // add some super nice mega ping pong delay
  pingPong = new Tone.PingPongDelay(30, 0.7).toDestination();

  // filter to make less horrible
  filter = new Tone.AutoFilter(0.13).toDestination().connect(pingPong);
  filterTwo = new Tone.AutoFilter(0.05).toDestination().connect(pingPong);
  filterThree = new Tone.AutoFilter(0.07).toDestination().connect(pingPong);
  filterFour = new Tone.AutoFilter(0.11).toDestination().connect(pingPong);

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
}

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
/////////////////////////////////////////////////////////////////////////
function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

/////////////////////////////////////////////////////////////////////////
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
    videoId: 'viOkh9al0xM',
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
    videoId: 'AdUw5RdyZxI',
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


/////////////////////////////////////////////////////////////////////
// Function using fetch to POST to our API endpoint
function getYoutubeSearch(data) {
  return fetch('/.netlify/functions/searchYoutube.js', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const youtubeSearch = '{"search": "live%webcam%feed"}'

// create it!
getYoutubeSearch(youtubeSearch).then((response) => {
  console.log('API response', response)
  // set app state
}).catch((error) => {
  console.log('API error', error)
})