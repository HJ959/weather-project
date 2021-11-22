//import fetch from "node-fetch"

exports.handler = async (event, context, callback) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body)
  console.log("Function `todo-create` invoked", data)
  const youtubeAPI = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=live%20public%20webcam&key=${process.env.BEHANCE_API_KEY}`
  const response = await fetch(youtubeAPI)
  const data = await response.json()
  return {
    statusCode: 200,
    body: JSON.stringify(data.projects)
  }
}