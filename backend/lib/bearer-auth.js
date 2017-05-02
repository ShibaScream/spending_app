'use strict'

const createError = require('http-errors')

module.exports = (req, res, next) => {
  if (!req.headers.authorization) next(createError(401, 'Invalid Authentication'))

  let [method, token] = req.headers.authorization.split(' ')

  if (method.toLowerCase() !== 'bearer') {
    next(createError(401, 'Invalid Authentication'))
  }

  next()

}
