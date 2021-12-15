"use strict";

// location vars
let lat, lon, latLon;

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
function handlePermission() {
  navigator.permissions.query({
    name: 'geolocation'
  }).then(function (result) {
    if (result.state == 'granted') {
      report(result.state);
      // create it!
      weatherLookup(latLon).then((response) => {
        console.log('API response', response)
        // set app state
      }).catch((error) => {
        console.log('API error', error)
      })
    } else if (result.state == 'prompt') {
      report(result.state);
      navigator.geolocation.getCurrentPosition(revealPosition, positionDenied, geoSettings);
    } else if (result.state == 'denied') {
      report(result.state);
    }
    result.onchange = function () {
      report(result.state);
    }
  });
}

function report(state) {
  console.log('Permission ' + state);
}

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