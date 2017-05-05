'use strict'

require('./monthly-transactions.scss')

module.exports = {
  template: require('./monthly-transactions.html'),
  controller: ['$log', '$scope', 'orderByFilter', 'categoryFilter', 'transactionService', MonthlyTransactionsController],
  controllerAs: 'mtCtrl',
  bindings: {
    transactions: '<'
  }
}

function MonthlyTransactionsController ($log, $scope, orderByFilter, categoryFilter, transactionService) {
  let self = this
  let transactions_clone = angular.copy(self.transactions)
  self.convert = transactionService.convertToDollarsString
}
