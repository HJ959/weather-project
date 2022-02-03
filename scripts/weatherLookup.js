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

let currentCloudsBrightness = "brightness(2)";
let currentCloudsSaturation = "saturate(3)";
let currentCloudsContrast = "contrast(1.5)";
let currentCloudsBlur = "blur(35px)";
let currentCloudsCSSFilter = "blur(35px) saturate(3) contrast(1) brightness(3)";

let currentWindSpeed = 0.13;
let dayOneWindSpeed = 0.05;
let dayTwoWindSpeed = 0.07;
let dayThreeWindSpeed = 0.11;

let currentDewPoint = 15;

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

    // video css filter variables
    currentCloudsBrightness = "brightness(" + scale((100 - weatherJSON.current.clouds), 0, 100, 1, 5) + ")";
    currentCloudsSaturation = "saturate(" + scale((100 - weatherJSON.current.clouds), 0, 100, 1.5, 4) + ")";
    currentCloudsContrast = "contrast(" + scale((100 - weatherJSON.current.clouds), 0, 100, 0.75, 1.25) + ")";
    currentCloudsBlur = "blur(" + scale((100 - weatherJSON.current.clouds), 0, 100, 40, 20) + ")";
    currentCloudsCSSFilter = currentCloudsBlur + " " + currentCloudsSaturation + " " + currentCloudsContrast + " " + currentCloudsBrightness;

    // wind speed controls each auto filter frequency

    currentWindSpeed = +(weatherJSON.current.wind_speed * 0.01).toFixed(3);
    dayOneWindSpeed = +(weatherJSON.daily[1].wind_speed * 0.01).toFixed(3);
    dayTwoWindSpeed = +(weatherJSON.daily[2].wind_speed * 0.01).toFixed(3);
    dayThreeWindSpeed = +(weatherJSON.daily[3].wind_speed * 0.01).toFixed(3);

    // grab the dew point for the delay time of the ping pong delay
    currentDewPoint = +(Math.abs(scale(weatherJSON.current.dew_point, -20, 50, 100, 1))).toFixed(3);

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

    // grab the feels like temp for the next 4 days to set the oscillators tuning
    // make some numbers either negative or positive for better tuning
    dayOneFeelsLikeTemp = (weatherJSON.daily[0].feels_like.day)
    dayTwoFeelsLikeTemp = (weatherJSON.daily[1].feels_like.day * -1)
    dayThreeFeelsLikeTemp = (weatherJSON.daily[2].feels_like.day)
    dayFourFeelsLikeTemp = (weatherJSON.daily[3].feels_like.day * -1)

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

      document.getElementById("weatherCloudiness").innerHTML = "Current: " + weatherJSON.current.clouds + "%<br>Day 1: " + weatherJSON.daily[1].clouds + "%<br>Day 2: " + weatherJSON.daily[2].clouds + "%<br>Day 3: " + weatherJSON.daily[3].clouds + "%";
      document.getElementById("mappedCloudiness").innerHTML = "Current: " + currentClouds + "<br>Day 1: " + dayOneClouds + "<br>Day 2: " + dayTwoClouds + "<br>Day 3: " + dayThreeClouds + "<br>Video filters: " + currentCloudsCSSFilter;

      document.getElementById("weatherWindSpeed").innerHTML = "Current: " + weatherJSON.current.wind_speed + "m/s<br>Day 1: " + weatherJSON.daily[1].wind_speed + "m/s<br>Day 2: " + weatherJSON.daily[2].wind_speed + "m/s<br>Day 3: " + weatherJSON.daily[2].wind_speed + "m/s";
      document.getElementById("mappedWindSpeed").innerHTML = "Current: " + currentWindSpeed + "m/s<br>Day 1: " + dayOneWindSpeed + "m/s<br>Day 2: " + dayTwoWindSpeed + "m/s<br>Day 3: " + dayThreeWindSpeed + "m/s";

      document.getElementById("weatherHumidity").innerHTML = "Current: " + weatherJSON.daily[0].humidity + "%<br>Day 1: " + weatherJSON.daily[1].humidity + "%<br>Day 2: " + weatherJSON.daily[2].humidity + "%<br>Day 3: " + weatherJSON.daily[3].humidity + "%";
      document.getElementById("mappedHumidity").innerHTML = "Current: " + dayOneHumidity + "<br>Day 1: " + dayTwoHumidity + "<br>Day 2: " + dayThreeHumidity + "<br>Day 3: " + dayFourHumidity;

      document.getElementById("weatherDewPoint").innerHTML = "Day 1: " + weatherJSON.current.dew_point + "°C<br>Day 2: " + weatherJSON.daily[1].dew_point + "°C";
      document.getElementById("mappedDewPoint").innerHTML = "Day 1: " + currentDewPoint;

      document.getElementById("weatherMinMaxTemp").innerHTML = "Day 1: " + weatherJSON.daily[0].temp.max + "°C " + weatherJSON.daily[0].temp.min + "°C<br>Day 2: " + weatherJSON.daily[1].temp.max + "°C " + weatherJSON.daily[1].temp.min + "°C<br>Day 3: " + weatherJSON.daily[2].temp.max + "°C " + weatherJSON.daily[2].temp.min + "°C<br>Day 4: " + weatherJSON.daily[2].temp.max + "°C " + weatherJSON.daily[2].temp.min + "°C";
      document.getElementById("mappedMinMaxTemp").innerHTML = "OSC1: " + notes[dayOneMaxTemp] + octaves[dayOneMinTemp] + "<br>OSC2: " + notes[dayTwoMaxTemp] + octaves[dayTwoMinTemp] + "<br>OSC3: " + notes[dayThreeMaxTemp] + octaves[dayThreeMinTemp] + "<br>OSC4: " + notes[dayFourMaxTemp] + octaves[dayFourMinTemp];

      document.getElementById("weatherMaxTemp").innerHTML = "Day 1: " + dayOneMaxTempVidSpeed + "°C<br>Day 2: " + dayTwoMaxTempVidSpeed + "°C<br>Day 3: " + dayThreeMaxTempVidSpeed + "°C";

      document.getElementById("weatherFeelsLike").innerHTML = "Day 1: " + weatherJSON.daily[0].feels_like.day + "°C<br>Day 2: " + weatherJSON.daily[1].feels_like.day + "°C<br>Day 3: " + weatherJSON.daily[2].feels_like.day + "°C<br>Day 4: " + weatherJSON.daily[3].feels_like.day + "°C";
      document.getElementById("mappedFeelsLike").innerHTML = "Day 1: " + dayOneFeelsLikeTemp + "cent<br>Day 2: " + dayTwoFeelsLikeTemp + "cent<br>Day 3: " + dayThreeFeelsLikeTemp + "cent<br>Day 4: " + dayFourFeelsLikeTemp + "cent";

      document.getElementById("weatherMoonPhase").innerHTML = "Day 1: " + weatherJSON.daily[0].moon_phase + "<br>Day 2: " + weatherJSON.daily[1].moon_phase + "<br>Day 3" + weatherJSON.daily[2].moon_phase + "<br>Day 4: " + weatherJSON.daily[0].moon_phase;
    }
    if (loadedWeatherParams === false) {
      document.getElementById("weatherCloudiness").innerHTML = "default";
      document.getElementById("mappedCloudiness").innerHTML = "default";

      document.getElementById("weatherWindSpeed").innerHTML = "default";
      document.getElementById("mappedWindSpeed").innerHTML = "default";

      document.getElementById("weatherHumidity").innerHTML = "default";
      document.getElementById("mappedHumidity").innerHTML = "default";

      document.getElementById("weatherDewPoint").innerHTML = "default";
      document.getElementById("mappedDewPoint").innerHTML = "default";

      document.getElementById("weatherMinMaxTemp").innerHTML = "default";
      document.getElementById("mappedMinMaxTemp").innerHTML = "OSC1: " + notes[dayOneMaxTemp] + octaves[dayOneMinTemp] + "<br>OSC2: " + notes[dayTwoMaxTemp] + octaves[dayTwoMinTemp] + "<br>OSC3: " + notes[dayThreeMaxTemp] + octaves[dayThreeMinTemp] + "<br>OSC4: " + notes[dayFourMaxTemp] + octaves[dayFourMinTemp];

      document.getElementById("weatherMaxTemp").innerHTML = "default";

      document.getElementById("weatherFeelsLike").innerHTML = "default";
      document.getElementById("mappedFeelsLike").innerHTML = "default";

      document.getElementById("weatherMoonPhase").innerHTML = "default";
    }
  }
}