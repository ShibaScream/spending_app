'use strict'

module.exports = ['$q', '$log', '$http', '$window', authService]

function authService ($q, $log, $http, $window) {
  let service = {}
  let token = null
  service.transactions = {}
  service.projected = {}

  service.fetchTransactions = function () {
    $log.debug('called fetchTransactions()')
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
        service.transactions.monthsArray = convertMonthsObjectToArray(service.transactions.monthlyTotals)
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

  service.convertToDollarsString = function (centocents) {
    // gotta give credit where credit due: http://www.jacklmoore.com/notes/rounding-in-javascript/
    // properly rounding numbers in javascript is fun
    if (centocents === null) return ''
    let amt = Number(Math.round((centocents / Math.pow(10, 4))+'e2')+'e-2')
    return (amt > 0 ? '$' : '-$') + Math.abs(amt)
  }

  function convertMonthsObjectToArray (object) {
    let result = []
    Object.keys(object).forEach( key => {
      object[key].date = key
      result.push(object[key])
    })
    return result
  }

  return service
}
