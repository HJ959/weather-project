"use strict";

// location vars
let lat, lon;
let weatherJSON;
let windowHash = window.location.hash;

// set up some default params for if the weather lookup fails
let currentClouds = 7000;
let dayOneClouds = 6000;
let dayTwoClouds = 5000;
let dayThreeClouds = 8000;

let currentWindSpeed = 0.13;
let dayOneWindSpeed = 0.05;
let dayTwoWindSpeed = 0.07;
let dayThreeWindSpeed = 0.11;

let currentRainmm = "-24";

let currentDewPoint = 20.6;

let dayOneMaxTemp = 0
let dayTwoMaxTemp = 1
let dayThreeMaxTemp = 2
let dayFourMaxTemp = 4
let dayOneMinTemp = 1
let dayTwoMinTemp = 4
let dayThreeMinTemp = 2
let dayFourMinTemp = 4

let dayOneFeelsLikeTemp = 20;
let dayTwoFeelsLikeTemp = -10;
let dayThreeFeelsLikeTemp = 10;
let dayFourFeelsLikeTemp = -17;

let dayOneMoonPhase = 0.25;
let dayTwoMoonPhase = 0.50;
let dayThreeMoonPhase = 0.60;
let dayFourMoonPhase = 0.70;

let dayOneHumidity = 100;
let dayTwoHumidity = 200;
let dayThreeHumidity = 300;
let dayFourHumidity = 400;

// create some consts for picking notes 
const notes = ["F#", "G#", "A#", "C#", "D#"]
const octaves = ["2", "3", "4", "3", "2"]

// grab the latLon from the window hash send from the landing page
let windowHashAttributes = windowHash.split("#");

// assign to the latLon object
let latLon = {
  "latitude": windowHashAttributes[1],
  "longitude": windowHashAttributes[2]
}

// Function using fetch to POST to our API endpoint
async function weatherLookup(data) {
  const response = await fetch('/.netlify/functions/weatherLookup', {
    body: JSON.stringify(data),
    method: 'POST'
  });
  return await response.json();
}

// grab the weather data from the API on mousedown
// send the lat and lon as an object to the AWS Lambada function
weatherLookup(latLon).then((response) => {
  weatherJSON = response;
  // organise the json data into some useful variables for use later
  if (isEmpty(weatherJSON) === false) {
    // cloudiness controls each max opacity for the videos
    currentClouds = scale((100 - weatherJSON.current.clouds), 0, 100, 5000, 10000);
    dayOneClouds = scale((100 - weatherJSON.daily[1].clouds), 0, 100, 5000, 10000);
    dayTwoClouds = scale((100 - weatherJSON.daily[2].clouds), 0, 100, 5000, 10000);
    dayThreeClouds = scale((100 - weatherJSON.daily[3].clouds), 0, 100, 5000, 10000);

    // wind speed controls each auto filter frequency
    currentWindSpeed = weatherJSON.current.wind_speed * 0.01;
    dayOneWindSpeed = weatherJSON.daily[1].wind_speed * 0.01;
    dayTwoWindSpeed = weatherJSON.daily[2].wind_speed * 0.01;
    dayThreeWindSpeed = weatherJSON.daily[3].wind_speed * 0.01;

    // grab the dew point for the delay time of the ping pong delay
    currentDewPoint = scale(weatherJSON.current.dew_point, -20, 50, 0.7, 50);

    // if there is no current rain the API leaves the field out I think
    // so if no field then no rain in mm so set to lowest value
    if (typeof weatherJSON.current.rain == 'undefined') {
      currentRainmm = "-36";
    }
    // turn rain in mm from 0.0 - 1.5 into decibles -36db to 0db string
    else {
      currentRainmm = "-" + String(scale(weatherJSON.current.rain["1h"], 0.0, 1.5, 36, 1));
    }

    // grab the max min temps then wrap 5 so that they can pick somethign from the array
    dayOneMaxTemp = parseInt(weatherJSON.daily[0].temp.max) % 5
    dayTwoMaxTemp = parseInt(weatherJSON.daily[1].temp.max) % 5
    dayThreeMaxTemp = parseInt(weatherJSON.daily[2].temp.max) % 5
    dayFourMaxTemp = parseInt(weatherJSON.daily[3].temp.max) % 5
    dayOneMinTemp = parseInt(weatherJSON.daily[0].temp.min) % 5
    dayTwoMinTemp = parseInt(weatherJSON.daily[1].temp.min) % 5
    dayThreeMinTemp = parseInt(weatherJSON.daily[2].temp.min) % 5
    dayFourMinTemp = parseInt(weatherJSON.daily[3].temp.min) % 5

    // grab the feels like temp for the next 4 days to set the oscillators tuning
    // make some numbers either negative or positive for better tuning
    dayOneFeelsLikeTemp = (weatherJSON.daily[0].feels_like.day) / 10
    dayTwoFeelsLikeTemp = (weatherJSON.daily[1].feels_like.day * -1) / 10
    dayThreeFeelsLikeTemp = (weatherJSON.daily[2].feels_like.day) / 10
    dayFourFeelsLikeTemp = (weatherJSON.daily[3].feels_like.day * -1) / 10

    // control the phase of the oscillators with the daily moon phase
    dayOneMoonPhase = weatherJSON.daily[0].moon_phase;
    dayTwoMoonPhase = weatherJSON.daily[2].moon_phase;
    dayThreeMoonPhase = weatherJSON.daily[4].moon_phase;
    dayFourMoonPhase = weatherJSON.daily[7].moon_phase;

    // humidity % controls the base frequency of the autofilters
    dayOneHumidity = scale(weatherJSON.daily[0].humidity, 0, 100, 100, 500);
    dayTwoHumidity = scale(weatherJSON.daily[1].humidity, 0, 100, 100, 1000);
    dayThreeHumidity = scale(weatherJSON.daily[2].humidity, 0, 100, 100, 700);
    dayFourHumidity = scale(weatherJSON.daily[3].humidity, 0, 100, 100, 400);

    // call the sound and video elements now we have the weather data
    droneSynth();
    window.requestAnimationFrame(step);
  }
  // set app state
}).catch((error) => {
  console.log('API error', error);
  // playing default values
  window.requestAnimationFrame(step);
  droneSynth();
})

// some useful functions
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
/////////////////////////////////////////////////////////////////////////////////
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}