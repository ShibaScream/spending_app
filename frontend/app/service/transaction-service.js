'use strict'

module.exports = ['$q', '$log', '$http', '$window', 'categoryFilter', 'orderByFilter', authService]

function authService ($q, $log, $http, $window, categoryFilter, orderByFilter) {
  let service = {}
  let token = null
  let today = new Date()
  let dateString = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}`
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
        service.transactions.monthsArray = orderByFilter(convertMonthsObjectToArray(service.transactions.monthlyTotals), 'date', true)
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
        service.projected = res.data.monthlyTotals[dateString]
        return $q.resolve(service.projected)
      })
      .catch(err => $q.reject(err))
  }

  service.filterTransactionsByCategory = function (hideDonuts, hideCC) {
    return $q((resolve, reject) => {
      try {
        $log.debug(service.transactions)
        let result = {
          monthlyTotals: service.transactions.monthlyTotals,
          monthsArray: categoryFilter(service.transactions.monthsArray, hideDonuts, hideCC),
        }
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }

  service.convertToDollarsString = function (centocents) {
    // gotta give credit where credit due: http://www.jacklmoore.com/notes/rounding-in-javascript/
    // properly rounding numbers in javascript is fun
    if (centocents === null) return ''
    if (isNaN(centocents)) return ''
    let amt = Number(Math.round((centocents / Math.pow(10, 4))+'e2')+'e-2')
    return (amt >= 0 ? '$' : '-$') + Math.abs(amt)
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
