/**
 * Tranforma um método assíncrono "error-first-callback" em uma Promise.
 * @param {function} method
 * @returns {function:Promise}
 */
function asPromise(method) {
  return (...args) => new Promise((resolve, reject) => {
    method(...args, (error, ...returns) => {
      if (error)
        reject(error)
      resolve([...returns])
    })
  })
}

module.exports = asPromise
