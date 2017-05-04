'use strict'

module.exports = (transactionArray = []) => {
  return new Promise( (resolve, reject) => {
    try {
      if (transactionArray.length === 0) throw Error('no transactions')
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
            spent: 0,
            totalsByCategory: {
              creditCard: {
                debit: 0,
                credit: 0
              },
              donuts: 0
            }
          }
        }

        let month = aggregate.monthlyTotals[date]

        if (transaction.amount > 0) {
          month.income += transaction.amount

          if (isCCPayment(transaction.merchant)) {
            month.totalsByCategory.creditCard.credit += transaction.amount
          }

        } else {
          month.spent += transaction.amount

          if (isCCPayment(transaction.merchant)) {
            month.totalsByCategory.creditCard.debit += transaction.amount
          }

          if (isDonutPayment(transaction.merchant)) {
            month.totalsByCategory.donuts += transaction.amount
          }
        }

      })

      // TODO: POSSIBLY MOVE AVERAGING TO FRONTEND??
      //       WOULD ALLOW FOR CALCULATING ON THE FLY WITH FILTERING
      let dates = Object.keys(aggregate.monthlyTotals)
      dates.forEach( date => {
        let month = aggregate.monthlyTotals[date]
        aggregate.average.income += month.income
        aggregate.average.spent += month.spent
      })

      aggregate.average.income = aggregate.average.income / dates.length
      aggregate.average.spent = aggregate.average.spent / dates.length

      return resolve(aggregate)
    } catch (error) {
      return reject(error)
    }
  })

  function isCCPayment (merchant) {
    return merchant === 'CC Payment' || merchant === 'Credit Card Payment'
  }

  function isDonutPayment (merchant) {
    return merchant === 'Dunkin #336784' || merchant === 'Krispy Kreme Donuts'
  }

}
