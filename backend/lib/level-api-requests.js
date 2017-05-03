'use strict'

const request = require('superagent')

const URL = process.env.LEVEL_URL
const API_TOKEN = process.env.API_TOKEN

module.exports.getOverview = (user) => {
  return new Promise((resolve, reject) => {
    request
      .post(`${URL}/get-all-transactions`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        args: {
          uid: user.id,
          token: user.token,
          'api-token': API_TOKEN,
          'json-strict-mode': false,
          'json-verbose-response': false
        }
      })
      .end(function (err, response) {
        if (err) {
          reject(err)
        }
        resolve(response)
      })
  })
}

module.exports.getProjected = (user) => {
  let today = new Date()
  let year = today.getFullYear()
  // CAREFUL!! Month is zero-indexed because...javascript
  let month = today.getMonth() + 1

  return new Promise((resolve, reject) => {
    request
      .post(`${URL}/projected-transactions-for-month`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        args: {
          uid: user.id,
          token: user.token,
          'api-token': API_TOKEN,
          'json-strict-mode': false,
          'json-verbose-response': false
        },
        year: year,
        month: month
      })
      .end(function (err, response) {
        if (err) {
          reject(err)
        }
        resolve(response)
      })

  })
}
