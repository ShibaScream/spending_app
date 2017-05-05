'use strict'

module.exports = function () {
  return (monthsArray, filterDonuts, filterCC) => {
    console.log('category filter called with', filterDonuts, filterCC)
    if (angular.isUndefined(monthsArray)) return []
    let result = monthsArray.map( month => {
      let filteredMonth = {
        date: month.date,
        income: month.income,
        spent: month.spent,
        totalsByCategory: month.totalsByCategory
      }
      if (filterDonuts) {
        filteredMonth.spent -= month.totalsByCategory.donuts
      }
      if (filterCC) {
        filteredMonth.income -= month.totalsByCategory.creditCard.credit
        filteredMonth.spent -= month.totalsByCategory.creditCard.debit
      }
      return filteredMonth
    })
    console.log('result:', result)
    return result
  }
}
