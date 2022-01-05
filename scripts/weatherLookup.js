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
let currentRainmm = "-24";

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
  console.log('API lol', response);
  weatherJSON = response;
  // organise the json data into some useful variables for use later
  if (isEmpty(weatherJSON) === false) {
    // cloudiness controls each max opacity for the videos
    currentClouds = scale((100 - weatherJSON.current.clouds), 0, 100, 3000, 7000);
    dayOneClouds = scale((100 - weatherJSON.daily[1].clouds), 0, 100, 3000, 7000);
    dayTwoClouds = scale((100 - weatherJSON.daily[2].clouds), 0, 100, 3000, 7000);
    dayThreeClouds = scale((100 - weatherJSON.daily[3].clouds), 0, 100, 3000, 7000);

    // wind speed controls each auto filter frequency
    currentWindSpeed = weatherJSON.current.wind_speed * 0.1;
    
    // if there is no current rain the API leaves the field out I think
    // so if no field then no rain in mm so set to lowest value
    if (typeof weatherJSON.current.rain == 'undefined') {
      currentRainmm = "-36";
    }
    // turn rain in mm from 0.0 - 1.5 into decibles -36db to 0db string
    else {
      currentRainmm = "-" + String(scale(weatherJSON.current.rain["1h"], 0.0, 1.5, 36, 1));
    }
  }
  // set app state
}).catch((error) => {
  console.log('API error', error);
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