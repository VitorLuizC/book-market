const levelup = require('levelup')
const errors = require('level-errors')
const asPromise = require('../util/asPromise.js')

const database = levelup('./data', { createIfMissing: true })

function create() {

}

function get(callback) {
  database.get('books', (error, data) => {
    if (error && !(error instanceof errors.NotFoundError))
      throw new Error(error);
    callback(error ? [] : JSON.parse(data))
  })
}

function add(book, callback) {
  get(books => {
    database.put('books', JSON.stringify([...books, book]), error => {
      if (error)
        throw new Error(error)
      callback();
    })
  });
}

module.exports = { get, add }
