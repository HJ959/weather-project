let oscOne, oscTwo, ocsThree, oscFour;
let filter, filterTwo, filterThree, filterFour, pingPong

/////////////////////////////////////////////////////////////////////////
function setup() {
    // add some super nice mega ping pong delay
    pingPong = new Tone.PingPongDelay(30, 0.7).toDestination();

    // filter to make less horrible
    filter = new Tone.AutoFilter(0.13).toDestination().connect(pingPong);
    filterTwo = new Tone.AutoFilter(0.05).toDestination().connect(pingPong);
    filterThree = new Tone.AutoFilter(0.07).toDestination().connect(pingPong);
    filterFour = new Tone.AutoFilter(0.11).toDestination().connect(pingPong);

    // create ocsillator one
    oscOne = new Tone.PulseOscillator({
        "detune": 5,
        "frequency": "F3",
        "phase": 0.25,
        "volume": -32
    }).connect(filter);

    // create ocsillator two
    oscTwo = new Tone.PulseOscillator({
        "detune": -5,
        "frequency": "C3",
        "phase": -0.25,
        "volume": -32
    }).connect(filterTwo);

    // create ocsillator three
    oscThree = new Tone.PulseOscillator({
        "detune": 7,
        "frequency": "E3",
        "phase": 0.5,
        "volume": -32
    }).connect(filterThree);

    // create ocsillator four
    oscFour = new Tone.PulseOscillator({
        "detune": -7,
        "frequency": "G3",
        "phase": 0.3,
        "volume": -32
    }).connect(filterFour);
}

/////////////////////////////////////////////////////////////////////////
function songStart(time) {
    filter.start();
    oscOne.start();
    oscTwo.start();
    oscThree.start();
    oscFour.start();
}
/////////////////////////////////////////////////////////////////////////
function songStop(time) {
    filter.stop();
    oscOne.stop();
    oscTwo.stop();
    oscThree.stop();
    oscFour.stop();
}
/////////////////////////////////////////////////////////////////////////
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

/////////////////////////////////////////////////////////////////////////
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    var youtubeID = 'https://www.youtube.com/embed/' + result + '?autoplay=1&mute=1&enablejsapi=1&controls=0&rel=0'
    return youtubeID;
}