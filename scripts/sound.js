"use strict";
// Tone JS vars
let oscOne, oscTwo, oscThree, oscFour;
let filter, filterTwo, filterThree, filterFour, pingPong;
let meter, meterTwo, meterThree;
let rms, rmsTwo, rmsThree;
let pitchFilter;

// TONE JS SECTION

// main filter pitch shift
pitchFilter = new Tone.AutoFilter(0.01).toDestination()

// create a pitch shift with some feedback
const pitchShift = new Tone.PitchShift({
  delayTime: 0,
  feedback: 0.7,
  pitch: 7,
  wet: 0.4,
  windowSize: 0.1
}).connect(pitchFilter);

// add some super nice mega ping pong delay
pingPong = new Tone.PingPongDelay(30, 0.7).toDestination();

// filter to make less horrible
filter = new Tone.AutoFilter(filterLFOSpeed).connect(pingPong);
filterTwo = new Tone.AutoFilter(0.05).connect(pingPong);
filterThree = new Tone.AutoFilter(0.07).connect(pingPong);
filterFour = new Tone.AutoFilter(0.11).connect(pingPong);

// create ocsillator one
oscOne = new Tone.PulseOscillator({
  "detune": 5,
  "frequency": "F3",
  "phase": 0.25,
  "volume": -24
}).connect(filter).connect(pitchShift);

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