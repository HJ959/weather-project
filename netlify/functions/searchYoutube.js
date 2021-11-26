// const {google} = require('googleapis');
// const path = require('path');
// const {authenticate} = require('@google-cloud/local-auth');
// var OAuth2 = google.auth.OAuth2;

YOUTUBE_API_ENDPOINT = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=live%20public%20webcam&key=' + String(process.env.YT_API_KEY)

// initialize the Youtube API library
const youtube = google.youtube('v3');

exports.handler = async function (event, context) {
  // a very simple example of searching for youtube videos
  // const auth = await authenticate({
  //   keyfilePath: JSON.parse(process.env.OAUTH_JSON),
  //   scopes: ['https://www.googleapis.com/auth/youtube'],
  // });
  // google.options({auth});

  return JSON.stringify(YOUTUBE_API_ENDPOINT);

  // const res = await youtube.search.list({
  //   part: 'id,snippet',
  //   q: 'Node.js on Google Cloud',
  // });
  // console.log(res.data);
}