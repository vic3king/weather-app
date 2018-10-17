const asynAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b)
      } else {
        reject('Arguments must be numbers')
      }
    }, 1500);
  })
}


// const somePromise = new Promise((resolve, reject) => {

//   setTimeout(() => {
//    // resolve('It worked')
//    reject('Unable to fulfil promise')
//   }, 2000)

// })

// somePromise.then((message) => {
//   console.log('Success', message)
// }, (errorMessage) => {
//   console.log('Error: ', errorMessage)
// })

asynAdd(5, 7).then((result) => {
  console.log('Result:', result)
  return asynAdd(result, 33)
}).then((result) => {
  console.log('Result:', result)
}).catch((errorMessage) => {
  console.log(errorMessage)
})