'use strict'

require('./cc-transactions.scss')

module.exports = {
  template: require('./cc-transactions.html'),
  controller: ['$log', 'transactionService', CCTransactionsController],
  controllerAs: 'ccTransactionsCtrl',
  bindings: {
    transactions: '<'
  }
}

function CCTransactionsController ($log, transactionService) {
  let self = this
  self.convert = transactionService.convertToDollarsString
}
