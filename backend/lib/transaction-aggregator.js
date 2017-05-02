'use strict'

module.exports = (transactionArray) => {
  return new Promise( (resolve, reject) => {
    let aggregate = {
      average: {
        income: 0,
        spent: 0
      },
      monthlyTotals: {}
    }

    transactionArray.forEach( transaction => {
      let date = transaction['transaction-time'].slice(0,7)
      if (!aggregate.monthlyTotals.hasOwnProperty(date)) {
        aggregate.monthlyTotals[date] = {
          income: 0,
          spent: 0
        }
      }
      if (transaction.amount > 0) {
        aggregate.monthlyTotals[date].income += transaction.amount
      } else {
        aggregate.monthlyTotals[date].spent += transaction.amount
      }
    })

    let dates = Object.keys(aggregate.monthlyTotals)

    dates.forEach( date => {
      let currentDate = aggregate.monthlyTotals[date]
      aggregate.average.income += currentDate.income
      aggregate.average.spent += currentDate.spent
      currentDate.income /= Math.pow(10, 4)
      currentDate.spent /= Math.pow(10, 4)
    })

    console.log('sums:', aggregate.average)

    aggregate.average.income = (aggregate.average.income / dates.length) / Math.pow(10, 4)
    aggregate.average.spent = (aggregate.average.spent / dates.length) / Math.pow(10, 4)

    resolve(aggregate)
  })
}
