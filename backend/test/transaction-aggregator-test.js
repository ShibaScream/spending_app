'use strict'

// this testing is by no means complete

const chai = require('chai')
const expect = chai.expect
const aggregator = require('../lib/transaction-aggregator')
const testData = require('./lib/testData')

describe('aggregator library', function () {

  describe('checking math for 1 month', function () {
    let results = {}
    before(function (done) {
      aggregator(testData.oneMonthData)
      .then( data => {
        results = data
        done()
      })
    })
    it('should show correct income amount', function () {
      expect(results.monthlyTotals['2014-10'].income).to.equal(17081500)
    })
    it('should show correct spent amount', function () {
      expect(results.monthlyTotals['2014-10'].spent).to.equal(-133300)
    })
  })

  describe('checking math for more than 1 month', function () {
    let results = {}
    before(function (done) {
      aggregator(testData.twoMonthsData)
      .then( data => {
        results = data
        done()
      })
    })
    it('should show correct income amount for 2014-10', function () {
      expect(results.monthlyTotals['2014-10'].income).to.equal(17081500)
    })
    it('should show correct spent amount for 2014-10', function () {
      expect(results.monthlyTotals['2014-10'].spent).to.equal(-133300)
    })
    it('should show correct income amount for 2014-11', function () {
      expect(results.monthlyTotals['2014-11'].income).to.equal(22038000)
    })
    it('should show correct spent amount for 2014-11', function () {
      expect(results.monthlyTotals['2014-11'].spent).to.equal(-5274400)
    })
  })

  describe('checking correct categorization', function () {
    let results = {}
    before(function (done) {
      aggregator(testData.twoMonthsData)
      .then( data => {
        results = data
        done()
      })
    })
    it('should show correct donut amount for 2014-10', function () {
      expect(results.monthlyTotals['2014-10'].totalsByCategory.donuts).to.equal(-99000)
    })
    it('should show correct donut amount for 2014-11', function () {
      expect(results.monthlyTotals['2014-11'].totalsByCategory.donuts).to.equal(-79900)
    })
    it('should show correct CC payment amounts for 2014-10', function () {
      expect(results.monthlyTotals['2014-10'].totalsByCategory.creditCard.debit).to.equal(0)
      expect(results.monthlyTotals['2014-10'].totalsByCategory.creditCard.credit).to.equal(0)
    })
    it('should show correct CC payment amounts for 2014-11', function () {
      expect(results.monthlyTotals['2014-11'].totalsByCategory.creditCard.debit).to.equal(-5194500)
      expect(results.monthlyTotals['2014-11'].totalsByCategory.creditCard.credit).to.equal(5194500)
    })
  })

  describe('checking error handling', function () {
    it('should throw an error for an empty array', function (done) {
      aggregator([])
        .then()
        .catch( err => {
          expect(err).to.not.be.null
          done()
        })
    })
    it('should throw an error if given no data', function (done) {
      aggregator()
        .then()
        .catch( err => {
          expect(err).to.not.be.null
          done()
        })
    })
  })
})
