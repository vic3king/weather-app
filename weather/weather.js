const request = require('request')

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/0fdd47dfff78770f0bebcf5b87825cd7/${lng},${lat}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      })
    } else {
      callback('Unable to fetch weather')
    }
  })
}

module.exports = {
  getWeather,
}