const express = require('express')
const parser = require('body-parser')
const config = require('./config.js')
const book = require('./book/index.js')

/**
 * Instância do express.
 * @type {Express.Application}
 */
const application = express()

application.use(parser.json())

application
  .use('/', express.static('../client'))
  .use('/book', book)

application.listen(config.port, config.callback)
