'use strict'

const bearerAuth = require('../lib/bearer-auth')
const levelApiRequests = require('../lib/level-api-requests')
const transactionAggregator = require('../lib/transaction-aggregator')
const createError = require('http-errors')

module.exports = (router) => {

  router.get('/api/v1/overview', bearerAuth, (req, res, next) => {
    levelApiRequests()
      .then( data => {
        let transactions = JSON.parse(data.res.text).transactions
        return transactionAggregator(transactions)
      })
      .then( aggregateData => {
        res.json(aggregateData)
      })
      .catch( err => {
        console.error(err)
        next(createError(500, err))
      })
  })

}
