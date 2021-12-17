"use strict";

// location vars
let lat, lon, latLon;
let weatherJSON;

// Function using fetch to POST to our API endpoint
async function weatherLookup(data) {
  const response = await fetch('/.netlify/functions/weatherLookup', {
    body: JSON.stringify(data),
    method: 'POST'
  });
  return await response.json();
}

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
    "latitude": lat,
    "longitude": lon
  }
}
getLocation();

//////////////////////////////////////////////////////////////////////////////

// organise the json data into some useful variables for use later
// grab the weather data from the API on mousedown
weatherLookup(latLon).then((response) => {
  console.log('API response', response)
  weatherJSON = response.data;
  // set app state
}).catch((error) => {
  console.log('API error', error)
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