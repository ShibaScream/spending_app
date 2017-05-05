'use strict'

module.exports = function () {
  return (monthlyTotals) => {
    if (angular.isUndefined(monthlyTotals)) return {income: 0, spent: 0}
    let result = monthlyTotals.reduce( (sums, month) => {
      sums.income += month.income
      sums.spent += month.spent
      return sums
    }, {income: 0, spent: 0})
    result.income /= monthlyTotals.length
    result.spent /= monthlyTotals.length
    return result
  }
}
