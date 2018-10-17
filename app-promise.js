const yargs = require('yargs')
//replacing request with axios, axios reurns a promise unlike request
const axios = require('axios')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


//to use axios encode address amd get the url
const encodedAddress = encodeURIComponent(argv.address)
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCf2fhPBsGoCDbZRUCnZGqUQJJRhGFRej8&address=${encodedAddress}`

//call axios method to make http request and handle errors
axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address')
  }
  //generaing weather url, request the data from the api
  const lat = response.data.results[0].geometry.location.lat
  const lng = response.data.results[0].geometry.location.lng
  const weatherUrl = `https://api.darksky.net/forecast/0fdd47dfff78770f0bebcf5b87825cd7/${lat},${lng}`
  console.log(response.data.results[0].formatted_address)
  //return weather forecast api
  return axios.get(weatherUrl)
}).then((response) => {
  const icon = response.data.currently.icon
  const temperature = response.data.currently.temperature
  const apparentTemperature = response.data.currently.apparentTemperature
  console.log(`Its a ${icon},Temperature is at ${temperature}.But It feels like ${apparentTemperature}`)
}).catch((err) => {
  if (err.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers')
  } else {
    console.log(err.message)
  }
});