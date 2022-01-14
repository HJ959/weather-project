"use strict";
// TONE JS SECTION

// Tone JS vars
let oscOne, oscTwo, oscThree, oscFour;
let filter, filterTwo, filterThree, filterFour, pingPong;
let pitchFilter;
let noise, noiseHiPass;
let pitchShift;

function droneSynth() {
  "use strict";

  // main filter pitch shift
  pitchFilter = new Tone.AutoFilter(0.01).toDestination()

  // create a pitch shift with some feedback
  pitchShift = new Tone.PitchShift({
    delayTime: 0,
    feedback: 0.7,
    pitch: 7,
    wet: 0.4,
    windowSize: 0.1
  }).connect(pitchFilter);


  // add some super nice mega ping pong delay
  pingPong = new Tone.PingPongDelay({
    "delayTime": 0.1,
    "feedback": 0.9,
  }).toDestination();


  // filter to make less horrible
  filter = new Tone.AutoFilter(currentWindSpeed).connect(pingPong);
  filterTwo = new Tone.AutoFilter(dayOneWindSpeed).connect(pingPong);
  filterThree = new Tone.AutoFilter(dayTwoWindSpeed).connect(pingPong);
  filterFour = new Tone.AutoFilter(dayThreeWindSpeed).connect(pingPong);

  // initialize the noise and start
  // noise will be blended into the piece as more 
  // percipitation is present in the local weather
  noiseHiPass = new Tone.Filter(4000, "bandpass", "-24").connect(filter).connect(filterTwo).connect(filterThree).connect(filterFour);
  noise = new Tone.Noise({
    type: "pink",
    volume: currentRainmm
  }).connect(noiseHiPass);

  // create ocsillator one
  oscOne = new Tone.PulseOscillator({
    "detune": dayOneFeelsLikeTemp,
    "frequency": notes[dayOneMaxTemp] + octaves[dayOneMinTemp],
    "phase": dayOneMoonPhase,
    "volume": dayOneHumidity
  }).connect(filter).connect(pitchShift);

  // create ocsillator two
  oscTwo = new Tone.PulseOscillator({
    "detune": dayTwoFeelsLikeTemp,
    "frequency": notes[dayTwoMaxTemp] + octaves[dayTwoMinTemp],
    "phase": dayTwoMoonPhase,
    "volume": dayTwoHumidity
  }).connect(filterTwo);

  // create ocsillator three
  oscThree = new Tone.PulseOscillator({
    "detune": dayThreeFeelsLikeTemp,
    "frequency": notes[dayThreeMaxTemp] + octaves[dayThreeMinTemp],
    "phase": dayThreeMoonPhase,
    "volume": dayThreeHumidity
  }).connect(filterThree);

  // create ocsillator four
  oscFour = new Tone.PulseOscillator({
    "detune": dayFourFeelsLikeTemp,
    "frequency": notes[dayFourMaxTemp] + octaves[dayFourMinTemp],
    "phase": dayFourHumidity,
    "volume": -24
  }).connect(filterFour);
}
/////////////////////////////////////////////////////////////////////////////////