const express = require('express')
const dao = require('./dao.js')

/**
 * Routeador (semelhante a uma controller) para as rotas de "/book".
 * @type {Express.Router}
 */
const router = express.Router()

router
  .get('/', (request, response) => {
    dao.get(books => response.send(books))
  })
  .post('/', (request, response) => {
    let book = request.body
    dao.add(book, () => response.status(200).send('Success!'))
  })

module.exports = router
