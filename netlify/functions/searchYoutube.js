// const fetch = require('node-fetch');

// exports.handler = async (event, context, callback) => {
//   /* parse the string body into a useable JS object */
//   const jsonBody = JSON.parse(event.body)
//   console.log("Function `todo-create` invoked", jsonBody)
//   const youtubeAPI = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=live%20public%20webcam&key=${process.env.BEHANCE_API_KEY}`
//   const response = await fetch(youtubeAPI)
//   const data = await response.json()
//   return {
//     statusCode: 200,
//     body: JSON.stringify(data.projects)
//   }
// }

const fetch = require('node-fetch')

const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts'

exports.handler = async (event, context) => {
  let response
  try {
    response = await fetch(API_ENDPOINT)
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