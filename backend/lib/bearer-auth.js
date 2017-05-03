'use strict'

const createError = require('http-errors')

const UID = Number(process.env.USER_ID)
const TOKEN = process.env.AUTH_TOKEN

module.exports = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return next(createError(401, 'Invalid Authentication'))
  }

  let [method, token] = req.headers.authorization.split(' ')

  if (method.toLowerCase() !== 'bearer' || token === undefined) {
    return next(createError(401, 'Invalid Authentication'))
  }

  // if this were a real app, this is where I decode the jwt data and verify
  // this is fake user data sent for now
  req.user = {
    id: UID,
    token: TOKEN
  }

  next()

}
