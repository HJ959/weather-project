"use strict";
// Tone JS vars
let oscOne, oscTwo, oscThree, oscFour;
let filter, filterTwo, filterThree, filterFour, pingPong;
let meter, meterTwo, meterThree;
let rms, rmsTwo, rmsThree;

// TONE JS SECTION

// add some super nice mega ping pong delay
pingPong = new Tone.PingPongDelay(30, 0.7).toDestination();

// filter to make less horrible
filter = new Tone.AutoFilter(filterLFOSpeed).toDestination().connect(pingPong);
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
  "volume": -24
}).connect(filter);

// create ocsillator two
oscTwo = new Tone.PulseOscillator({
  "detune": -5,
  "frequency": "C3",
  "phase": -0.25,
  "volume": -24
}).connect(filterTwo);

// create ocsillator three
oscThree = new Tone.PulseOscillator({
  "detune": 7,
  "frequency": "E3",
  "phase": 0.5,
  "volume": -24
}).connect(filterThree);

// create ocsillator four
oscFour = new Tone.PulseOscillator({
  "detune": -7,
  "frequency": "G3",
  "phase": 0.3,
  "volume": -24
}).connect(filterFour);
/////////////////////////////////////////////////////////////////////////////////