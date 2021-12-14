// // import fetch from 'node-fetch';
// const fetch = require('node-fetch')

// const checkStatus = (res) => {
//   if (res.ok) { // res.status >= 200 && res.status < 300
//       return res.json()
//   } else {
//       throw new Error(res.statusText);
//   }
// }

// exports.handler = async function(event, context, callback) {
//   try {
//     const coords = JSON.parse(event.body)
//     const response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + coords.latitude + "&lon=" + coords.longitude + "&units=metric&appid=" + process.env.WEATHER_API_KEY)
//     const data = await checkStatus(response)
//     callback(null, {
//       statusCode: 200,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     })
//   } catch (error) {
//     callback(error)
//   }
// }
// import fetch from 'node-fetch';
const fetch = require('node-fetch')

const checkStatus = (res) => {
  if (res.ok) { // res.status >= 200 && res.status < 300
      return res.json()
  } else {
      throw new Error(res.statusText);
  }
}

exports.handler = async function(event, context, callback) {
  try {
    const coords = JSON.parse(event.body)
    const coordsData = {coordsData: coordsData}
    const response = await fetch('https://cat-fact.herokuapp.com/facts')
    const data = await checkStatus(response)
    callback(null, {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coordsData)
    })
  } catch (error) {
    callback(error)
  }
}