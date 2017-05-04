'use strict'

const token = 'fakeJWT'
const URL = `${__API_URL__}/api/v1`
const fakeData = {
  average: {
    income: 0,
    spent: 0
  },
  monthlyTotals: {
    month1: {
      income: 0,
      spent: 0
    },
    month2: {
      income: 0,
      spent: 0
    }
  }
}

describe('transaction service tests', function() {
  beforeEach(() => {
    angular.mock.module('SpendingApp')
    angular.mock.inject(($rootScope, $httpBackend, transactionService) => {
      this.$rootScope = $rootScope
      this.$httpBackend = $httpBackend
      this.transactionService = transactionService
    })
  })

  afterEach(() => {
    this.$httpBackend.flush()
    this.$httpBackend.verifyNoOutstandingExpectation()
    this.$httpBackend.verifyNoOutstandingRequest()
    this.$rootScope.$apply()
  })

  describe('fetchTransactions()', () => {
    it('should make a correct GET request', () => {
      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
      this.$httpBackend
        .expectGET(`${URL}/overview`, headers)
        .respond(200, fakeData)

      this.transactionService.fetchTransactions()
    })
  })

  describe('fetchProjected()', () => {
    it('should make a correct GET request', () => {
      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
      this.$httpBackend
        .expectGET(`${URL}/projected`, headers)
        .respond(200, {foo: 'bar'})

      this.transactionService.fetchProjected()
    })
  })
})
