"use strict";
// TONE JS SECTION

// Tone JS vars
let oscOne, oscTwo, oscThree, oscFour;
let filter, filterTwo, filterThree, filterFour, reverb, reverbTwo;
let phaser;
let autoPan1, autoPan2, autoPan3, autoPan4;

function droneSynth() {
  "use strict";
  
  // not mobile version //////////////////////////////////////////////////////
  // not mobile version has 4 oscillators, two reverbs 
  // and 4 auto panners and a phaser
  if (isMobile === false) {
    reverbTwo = new Tone.Reverb({
      "decay": currentDewPoint,
      "wet": 0.7,
    }).toDestination();

    reverb = new Tone.Reverb({
      "decay": currentDewPoint,
      "wet": 0.7,
    }).connect(reverbTwo);

    // create some auto panners for the oscillators
    autoPan1 = new Tone.AutoPanner({
      "frequency": currentWindSpeed,
      "depth": 1
    }).connect(reverb).start();
    autoPan2 = new Tone.AutoPanner({
      "frequency": dayOneWindSpeed,
      "depth": 1
    }).connect(reverb).start();
    autoPan3 = new Tone.AutoPanner({
      "frequency": dayTwoWindSpeed,
      "depth": 1
    }).connect(reverb).start();
    autoPan4 = new Tone.AutoPanner({
      "frequency": dayThreeWindSpeed,
      "depth": 1
    }).connect(reverb).start();

    phaser = new Tone.Phaser({
      frequency: currentWindSpeed,
      octaves: octaves[dayOneMinTemp],
      baseFrequency: 1000
    }).connect(autoPan1).connect(autoPan2).connect(autoPan3).connect(autoPan4);

    // filter to make less horrible
    filter = new Tone.AutoFilter({
      "frequency": currentWindSpeed,
      "baseFrequency": dayOneHumidity,
      "octaves": octaves[dayOneMinTemp]
    }).connect(phaser).start();

    filterTwo = new Tone.AutoFilter({
      "frequency": dayOneWindSpeed,
      "baseFrequency": dayTwoHumidity,
      "octaves": octaves[dayTwoMinTemp]
    }).connect(phaser).start();

    filterThree = new Tone.AutoFilter({
      "frequency": dayTwoWindSpeed,
      "baseFrequency": dayThreeHumidity,
      "octaves": octaves[dayThreeMinTemp]
    }).connect(phaser).start();

    filterFour = new Tone.AutoFilter({
      "frequency": dayThreeWindSpeed,
      "baseFrequency": dayFourHumidity,
      "octaves": octaves[dayFourMinTemp]
    }).connect(phaser).start();

    // create ocsillator one
    oscOne = new Tone.PulseOscillator({
      "detune": dayOneFeelsLikeTemp,
      "frequency": notes[dayOneMaxTemp] + octaves[dayOneMinTemp],
      "phase": dayOneMoonPhase,
      "volume": -24
    }).connect(filter);

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
    oscThree = new Tone.FatOscillator({
      "type": "square32",
      "spread": 20,
      "detune": dayThreeFeelsLikeTemp,
      "frequency": notes[dayThreeMaxTemp] + octaves[dayThreeMinTemp],
      "phase": dayThreeMoonPhase,
      "volume": -24
    }).connect(filterTwo);

    // create ocsillator four
    oscFour = new Tone.PulseOscillator({
      "detune": dayFourFeelsLikeTemp,
      "frequency": notes[dayFourMaxTemp] + octaves[dayFourMinTemp],
      "phase": dayFourMoonPhase,
      "volume": -24
    }).connect(filterFour);
  }

  // mobile version //////////////////////////////////////////////////////////
  if (isMobile === true) {
    reverb = new Tone.Reverb({
      "decay": currentDewPoint,
      "wet": 0.7,
    }).toDestination();

    // create some auto panners for the oscillators
    autoPan1 = new Tone.AutoPanner({
      "frequency": currentWindSpeed,
      "depth": 1
    }).connect(reverb).start();
    autoPan2 = new Tone.AutoPanner({
      "frequency": dayOneWindSpeed,
      "depth": 1
    }).connect(reverb).start();

    phaser = new Tone.Phaser({
      frequency: currentWindSpeed,
      octaves: octaves[dayOneMinTemp],
      baseFrequency: 1000
    }).connect(autoPan1).connect(autoPan2);

    // filter to make less horrible
    filter = new Tone.AutoFilter({
      "frequency": currentWindSpeed,
      "baseFrequency": dayOneHumidity,
      "octaves": octaves[dayOneMinTemp]
    }).connect(phaser).start();

    filterTwo = new Tone.AutoFilter({
      "frequency": dayOneWindSpeed,
      "baseFrequency": dayTwoHumidity,
      "octaves": octaves[dayTwoMinTemp]
    }).connect(phaser).start();

    // create ocsillator one
    oscOne = new Tone.PulseOscillator({
      "detune": dayOneFeelsLikeTemp,
      "frequency": notes[dayOneMaxTemp] + octaves[dayOneMinTemp],
      "phase": dayOneMoonPhase,
      "volume": -24
    }).connect(filter);

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
    oscThree = new Tone.FatOscillator({
      "type": "square32",
      "spread": 20,
      "detune": dayThreeFeelsLikeTemp,
      "frequency": notes[dayThreeMaxTemp] + octaves[dayThreeMinTemp],
      "phase": dayThreeMoonPhase,
      "volume": -24
    }).connect(filter);

    // create ocsillator four
    oscFour = new Tone.PulseOscillator({
      "detune": dayFourFeelsLikeTemp,
      "frequency": notes[dayFourMaxTemp] + octaves[dayFourMinTemp],
      "phase": dayFourMoonPhase,
      "volume": -24
    }).connect(filterTwo);
  }
}
/////////////////////////////////////////////////////////////////////////////////