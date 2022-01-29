# WeatherHum

This project uses your location (if you allow) to check your local weather and use the data to tune a drone synth and calibrate some video faders.

The synth is powered by Tone.js and the visuals powered by YouTube's iframe API and some JavaScript to fade the videos
Below is a mapping of the weather data to the parts of the piece

## You are advised to wear headphones :)

### Day 1-4 cloudiness (%)
#### Video 1-4 max opacity and volume. As well as volume of the oscillators
##### Cloudiness controls how vibrant the videos are and how loud the piece can be

### Current wind speed and day 1-3 wind speed
#### Auto filter LFO speeds, phaser frequency and the frequency of the auto panners
##### The faster the current and future wind the faster the filters oscillate, phaser phases and panners pan

### Day 1-4 humidity (%)
#### Controls the base frequency of the auto filters
##### Humidity % controls where the auto filters begin oscillating at

### Current dew point and day 2 dew point
#### Reverb 1 and 2 decay time
##### Running the whole piece through two reverb should take off any harsh edges the higher the dew point the longer the decay time

### Daily min and max temperature
#### Selected notes for the oscillators
##### An array of 11 notes in the G-flat pentatonic scale and an array of 11 octaves are used with the max and min temperature for the first 4 days forecast, each temperature is wrapped to 11 using the modulo operator.

### Day 1-4 max temperature
#### Video fader step size
##### Day 1-4 max temp is the step size for each video fader, controlling how quickly the piece pulses, Math.abs() is used to clean any negative numbers

### Day 1-4 daytime "feels like" temperature
#### Controls how detuned the oscillators are
##### The temperature is scaled by an order of magnitude and two of the oscillators have the temperature value inverted so to provide a better detuning effect sonically

### Day 1, 2, 4 and 7 moon phase
#### Controls the phase position of the oscillators
##### Moon phase directly corresponds to oscillator phase, should create some interesting phasing effect.

