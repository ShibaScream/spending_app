'use strict'

require('./home.scss')

module.exports = [
  '$log',
  'transactionService',
  HomeController
]

function HomeController ($log, transactionService) {
  let self = this
  let today = new Date()
  let dateString = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}`

  self.transactions = {}
  self.currentMonthIncome = 0
  self.currentMonthSpent = 0

  self.fetchTransactions = () => {
    $log.debug('called home controller fetch')
    transactionService
      .fetchTransactions()
      .then( transactions => {
        self.transactions = transactions
        self.currentMonthIncome = transactions.monthlyTotals[dateString].income
        self.currentMonthSpent = transactions.monthlyTotals[dateString].spent
      })
      .catch(err => $log.debug(err))
  }

  self.fetchTransactions()

}
