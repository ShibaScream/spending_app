'use strict'

const createError = require('http-errors')

module.exports = (req, res, next) => {
  if (!req.headers.authorization) next(createError(401, 'Invalid Authentication'))

  let [check, encodedAuthorization]  = req.headers.authorization.split(' ')

  if (check.toLowerCase() !== 'basic') {
    return next(createError(401, 'Invalid authorization header'))
  }

  // if this were a real app, this is where I decode the base64 data and verify username and password

  next()
}
