"use strict";

// location vars
let lat, lon;
let weatherJSON;
let windowHash = window.location.hash;
let loadedWeatherParams = false;

// set up some default params for if the weather lookup fails
let currentClouds = 7000;
let dayOneClouds = 6000;
let dayTwoClouds = 5000;
let dayThreeClouds = 8000;

let currentCloudsBrightness = 2.0;

let currentWindSpeed = 0.13;
let dayOneWindSpeed = 0.05;
let dayTwoWindSpeed = 0.07;
let dayThreeWindSpeed = 0.11;

let currentDewPoint = 15;
let dayTwoDewPoint = 10;

let dayOneMaxTemp = getRandomInt(0, 11);
let dayTwoMaxTemp = getRandomInt(0, 11);
let dayThreeMaxTemp = getRandomInt(0, 11);
let dayFourMaxTemp = getRandomInt(0, 11);
let dayOneMinTemp = getRandomInt(0, 11);
let dayTwoMinTemp = getRandomInt(0, 11);
let dayThreeMinTemp = getRandomInt(0, 11);
let dayFourMinTemp = getRandomInt(0, 11);

let dayOneMaxTempVidSpeed = 9;
let dayTwoMaxTempVidSpeed = 12;
let dayThreeMaxTempVidSpeed = 7;
let dayFourMaxTempVidSpeed = 15;

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
const notes = ["F#", "G#", "A#", "C#", "D#", "A#", "C#", "D#", "F#", "G#", "A#"]
const octaves = ["2", "3", "4", "3", "2", "3", "4", "3", "2", "3", "4"]

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

weatherLookup(latLon).then((response) => {
  weatherJSON = response;
  // organise the json data into some useful variables for use later
  if (isEmpty(weatherJSON) === false) {
    // cloudiness controls each max opacity for the videos
    currentClouds = scale((100 - weatherJSON.current.clouds), 0, 100, 5000, 10000);
    dayOneClouds = scale((100 - weatherJSON.daily[1].clouds), 0, 100, 5000, 10000);
    dayTwoClouds = scale((100 - weatherJSON.daily[2].clouds), 0, 100, 5000, 10000);
    dayThreeClouds = scale((100 - weatherJSON.daily[3].clouds), 0, 100, 5000, 10000);

    // brightness for the videos
    currentCloudsBrightness = scale((100 - weatherJSON.current.clouds), 0, 100, 0, 4);

    // wind speed controls each auto filter frequency
    currentWindSpeed = weatherJSON.current.wind_speed * 0.01;
    dayOneWindSpeed = weatherJSON.daily[1].wind_speed * 0.01;
    dayTwoWindSpeed = weatherJSON.daily[2].wind_speed * 0.01;
    dayThreeWindSpeed = weatherJSON.daily[3].wind_speed * 0.01;

    // grab the dew point for the delay time of the ping pong delay
    currentDewPoint = Math.abs(scale(weatherJSON.current.dew_point, -20, 50, 100, 1));
    dayTwoDewPoint = Math.abs(scale(weatherJSON.daily[1].dew_point, -20, 50, 100, 1));

    // grab the max min temps then wrap 5 so that they can pick somethign from the array
    dayOneMaxTemp = parseInt(weatherJSON.daily[0].temp.max) % 11
    dayTwoMaxTemp = parseInt(weatherJSON.daily[1].temp.max) % 11
    dayThreeMaxTemp = parseInt(weatherJSON.daily[2].temp.max) % 11
    dayFourMaxTemp = parseInt(weatherJSON.daily[3].temp.max) % 11
    dayOneMinTemp = parseInt(weatherJSON.daily[0].temp.min) % 11
    dayTwoMinTemp = parseInt(weatherJSON.daily[1].temp.min) % 11
    dayThreeMinTemp = parseInt(weatherJSON.daily[2].temp.min) % 11
    dayFourMinTemp = parseInt(weatherJSON.daily[3].temp.min) % 11

    // grab the max temp again for controlling the speed of the video faders
    dayOneMaxTempVidSpeed = weatherJSON.daily[0].temp.max
    dayTwoMaxTempVidSpeed = weatherJSON.daily[1].temp.max
    dayThreeMaxTempVidSpeed = weatherJSON.daily[2].temp.max
    dayFourMaxTempVidSpeed = weatherJSON.daily[3].temp.max

    // grab the feels like temp for the next 4 days to set the oscillators tuning
    // make some numbers either negative or positive for better tuning
    dayOneFeelsLikeTemp = (weatherJSON.daily[0].feels_like.day) * 0.1
    dayTwoFeelsLikeTemp = (weatherJSON.daily[1].feels_like.day * -1) * 0.1
    dayThreeFeelsLikeTemp = (weatherJSON.daily[2].feels_like.day) * 0.1
    dayFourFeelsLikeTemp = (weatherJSON.daily[3].feels_like.day * -1) * 0.1

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

    loadedWeatherParams = true;
  }
  // set app state
}).catch((error) => {
  console.log('API error, using default values', error);
  loadedWeatherParams = false;
});

function updateLiveTable() {
  // function that takes all the weather variables and mapped vars and 
  // updates them for the user to see
  if (pageLoadedFlag === true) {
    if (loadedWeatherParams === true) {
      document.getElementById("weatherCloudiness").innerHTML = "Current: " + weatherJSON.current.clouds + "<br>Day 1: " + weatherJSON.daily[1].clouds + "<br>Day 2: " + weatherJSON.daily[2].clouds + "<br>Day 3: " + weatherJSON.daily[3].clouds;
    }
    if (loadedWeatherParams === false) {
      document.getElementById("weatherCloudiness").innerHTML = "default";
    }
  }
}