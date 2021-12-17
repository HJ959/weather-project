"use strict";

// location vars
let lat, lon, latLon;

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
}
getLocation();

// function that writes the lat lon in the URL for use in the 
// weather synth 
function takeMeToYourLeader() {
  window.open("weatherSynth.html#" + String(lat) + '#' + String(lon), "_self"); 
}
//////////////////////////////////////////////////////////////////////////////