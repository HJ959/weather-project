const fetch = require('node-fetch');

YOUTUBE_API_ENDPOINT = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=live%20public%20webcam&key=' + String(process.env.YT_API_KEY)

exports.handler = async (event, context) => {
  let response
  try {
    response = await fetch(YOUTUBE_API_ENDPOINT)
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  }
}