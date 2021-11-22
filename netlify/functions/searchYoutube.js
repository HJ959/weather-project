import fetch from "node-fetch"

exports.handler = async (event, context, callback) => {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2))
    const youtubeAPI = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=live%20public%20webcam&key=${process.env.BEHANCE_API_KEY}`
    const response = await fetch(youtubeAPI)
    const data = await response.json()
    return  {
      statusCode: 200,
      body: JSON.stringify(data.projects)
    }
}