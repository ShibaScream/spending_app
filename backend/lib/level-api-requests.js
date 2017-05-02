'use strict'

const request = require('superagent')
const createError = require('http-errors')

const URL = process.env.LEVEL_URL
const UID = Number(process.env.USER_ID)
const TOKEN = process.env.AUTH_TOKEN
const API_TOKEN = process.env.API_TOKEN

function levelApiRequests () {
  return new Promise((resolve, reject) => {
    request
      .post(`${URL}/get-all-transactions`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({args: {
	       uid: UID,
         token: TOKEN,
         'api-token': API_TOKEN,
         'json-strict-mode': false,
         'json-verbose-response': false
       }
      })
      .end(function (err, response) {
        if (err) {
          console.error('we hit an error in the api request')
          reject(err)
        }
        console.log('api request success!')
        resolve(response)
      })
  })
}

module.exports = levelApiRequests
