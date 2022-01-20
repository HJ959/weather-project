"use strict";
// TONE JS SECTION

// Tone JS vars
let oscOne, oscTwo, oscThree, oscFour;
let filter, filterTwo, filterThree, filterFour, reverb;
let pitchFilter;
let noise, noiseHiPass;
let pitchShift;

function droneSynth() {
  "use strict";

  // main filter pitch shift
  pitchFilter = new Tone.AutoFilter(0.01).toDestination()

  // create a pitch shift with some feedback
  pitchShift = new Tone.PitchShift({
    delayTime: dayOneMoonPhase,
    feedback: dayTwoMoonPhase,
    pitch: 7,
    wet: 0.4,
    windowSize: 0.1
  }).connect(pitchFilter);

  reverb = new Tone.Reverb({
    "decay": currentDewPoint,
    "wet": 1.0,
  }).toDestination();
	
  // filter to make less horrible
  filter = new Tone.AutoFilter({
    "frequency": currentWindSpeed,
    "baseFrequency": dayOneHumidity,
     "octaves": octaves[dayOneMinTemp]
    }).connect(reverb);
  filterTwo = new Tone.AutoFilter({
    "frequency": dayOneWindSpeed,
    "baseFrequency": dayTwoHumidity,
     "octaves": octaves[dayTwoMinTemp]
    }).connect(reverb);
  filterThree = new Tone.AutoFilter({
    "frequency": dayTwoWindSpeed,
    "baseFrequency": dayThreeHumidity,
     "octaves": octaves[dayThreeMinTemp]
    }).connect(reverb);
  filterFour = new Tone.AutoFilter({
    "frequency": dayThreeWindSpeed,
    "baseFrequency": dayFourHumidity,
     "octaves": octaves[dayFourMinTemp]
    }).connect(reverb);

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
    "volume": -24
  }).connect(filter).connect(pitchShift);

  // create ocsillator two
  oscTwo = new Tone.FatOscillator({
    "type": "sawtooth",
    "spread": 20,
    "detune": dayTwoFeelsLikeTemp,
    "frequency": notes[dayTwoMaxTemp] + octaves[dayTwoMinTemp],
    "phase": dayTwoMoonPhase,
    "volume": -24
  }).connect(filterTwo);

  // create ocsillator three
  oscThree = new Tone.PulseOscillator({
    "detune": dayThreeFeelsLikeTemp,
    "frequency": notes[dayThreeMaxTemp] + octaves[dayThreeMinTemp],
    "phase": dayThreeMoonPhase,
    "volume": -24
  }).connect(filterThree);

  // create ocsillator four
  oscFour = new Tone.PulseOscillator({
    "detune": dayFourFeelsLikeTemp,
    "frequency": notes[dayFourMaxTemp] + octaves[dayFourMinTemp],
    "phase": dayFourMoonPhase,
    "volume": -24
  }).connect(filterFour);
}
/////////////////////////////////////////////////////////////////////////////////