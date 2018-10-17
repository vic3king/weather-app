const request = require('request')

const getGeoCode = (address) => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address)
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCf2fhPBsGoCDbZRUCnZGqUQJJRhGFRej8&address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to google servers')
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find the address.')
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      }
    })
  })
}

getGeoCode('19147').then((location)=> {
  console.log(JSON.stringify(location, null, 2))
}).catch((errorMessage) => {
  console.log('errorMessage', errorMessage)
})
