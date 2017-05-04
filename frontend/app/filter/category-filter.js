'use strict'

module.exports = function () {
  return (monthsArray, filterDonuts, filterCC) => {
    if (angular.isUndefined(monthsArray)) return []
    return monthsArray.map( month => {
      let categories = month.totalsByCategory
      month.income -= (filterCC ? categories.creditCard.credit : 0)
      month.spent -= (filterDonuts ? categories.donuts : 0) + (filterCC ? categories.creditCard.debit : 0)
      return month
    })
  }
}
