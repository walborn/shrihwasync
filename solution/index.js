module.exports = (Homework) => async (array, fn, initialValue, cb) => {
  const promisify = (fn, ...args) => new Promise(resolve => fn(...args, resolve))
  
  const length = await promisify(array.length)
  let promise = Promise.resolve(initialValue)
  Array.from({ length }, async (_, i) => {
    promise = promise
      .then(result => promisify(array.get, i)
        .then(value => promisify(fn, result, value, i, array)))
  })

  cb(await promise)
}
