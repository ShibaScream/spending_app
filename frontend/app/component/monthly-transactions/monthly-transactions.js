'use strict'

require('./monthly-transactions.scss')

module.exports = {
  template: require('./monthly-transactions.html'),
  controller: ['$log', 'transactionService', MonthlyTransactionsController],
  controllerAs: 'monthlyTransactionsCtrl',
  bindings: {
    transactions: '<'
  }
}

function MonthlyTransactionsController ($log, transactionService) {
  let self = this
  self.convert = transactionService.convertToDollarsString
}
