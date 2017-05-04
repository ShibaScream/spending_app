'use strict'

module.exports = ['$q', '$log', '$http', '$window', authService]

function authService ($q, $log, $http, $window) {
  let service = {}
  let token = null
  service.transactions = {}
  service.projected = {}

  service.fetchTransactions = function () {
    // typically would fetch auth token here but skipping that step
    token = 'fakeJWT'
    let url = `${__API_URL__}/api/v1/overview`
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    return $http
      .get(url, config)
      .then( res => {
        service.transactions = res.data
        return $q.resolve(service.transactions)
      })
      .catch(err => $q.reject(err))
  }

  service.fetchProjected = function () {
    // typically would fetch auth token here but skipping that step
    token = 'fakeJWT'
    let url = `${__API_URL__}/api/v1/projected`
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    return $http
      .get(url, config)
      .then( res => {
        service.projected = res.data
        return $q.resolve(service.projected)
      })
      .catch(err => $q.reject(err))
  }

  return service
}
