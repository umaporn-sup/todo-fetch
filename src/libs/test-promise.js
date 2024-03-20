async function doSomething(done) {
  return new Promise((resolve, reject) => {
    console.log('waiting...')
    setTimeout(() => {
      done ? resolve('success') : reject('failure')
    }, 5000)
  })
}

async function waitingSomething(result) {
  try {
    const x = await doSomething(result)
    console.log(x + ', your activity is success')
  } catch (e) {
    console.log(`${error}, your activity fails`)
  }
}

async function thenDoSomething(result) {
  doSomething(result)
    .then((x) => {
      console.log(x + ', your activity is success')
    })
    .catch((error) => {
      console.log(`${error}, your activity fails`)
    })
}
// waitingSomething(true)
thenDoSomething(false)
