# WeatherHum

This project uses your location (if you allow) to check your local weather and use the data to tune a drone synth and calibrate some video faders.

The synth is powered by Tone.js and the visuals powered by YouTube's iframe API and some JavaScript to fade the videos
Below is a mapping of the weather data to the parts of the piece

## You are advised to wear headphones :)

#### Cloudiness controls how vibrant the videos are

#### The faster the current and future wind the faster the filters oscillate

#### The more rain per mm the louder the pink noise becomes

#### Dew point will have a metallic effect on the audio the lower the dew point

#### An array of notes in the G-flat pentatonic scale and an array of octaves are used with the max and min temperature for the first 4 days forecast, each temperature is wrapped to 5 using the modulo operator.

#### Day 1 to 4 daytime feels like temperature controls how detuned the oscillators are

#### Humidity % controls how loud the oscillators are between -30dB and -20dB
