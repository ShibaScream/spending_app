'use strict'

require('./home.scss')

module.exports = ['$log', '$scope', 'transactionService', HomeController]

function HomeController ($log, $scope, transactionService) {
  let self = this
  let hideDonuts = false
  let hideCC = false
  self.transactions = {}

  self.fetchTransactions = () => {
    transactionService
      .fetchTransactions()
      .then( transactions => {
        self.transactions = transactions
      })
      .catch(err => $log.debug(err))
  }

  self.filterDonuts = () => {
    hideDonuts = !hideDonuts
    transactionService
      .filterTransactionsByCategory(hideDonuts, hideCC)
      .then( transactions => {
        self.transactions = transactions
      })
  }

  self.filterCC = () => {
    hideCC = !hideCC
    transactionService
      .filterTransactionsByCategory(hideDonuts, hideCC)
      .then( transactions => {
        self.transactions = transactions
      })
  }

  self.fetchTransactions()

}
