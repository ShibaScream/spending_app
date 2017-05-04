'use strict'

require('./monthly-averages.scss')

module.exports = {
  template: require('./monthly-averages.html'),
  controller: ['$log', 'categoryFilterFilter', 'averagesFilterFilter','transactionService', MonthlyAveragesController],
  controllerAs: 'maCtrl',
  bindings: {
    transactions: '<'
  }
}

function MonthlyAveragesController ($log, categoryFilterFilter, averagesFilterFilter, transactionService) {
  let self = this
  let hideDonuts = false
  let hideCC = false
  let transactions_clone = angular.copy(self.transactions)
  self.convert = transactionService.convertToDollarsString
  self.averages = {income: 0, spent: 0}

  self.$doCheck = () => {
    if (!angular.equals(transactions_clone, self.transactions)) {
      $log.debug('doCheck called on maCtrl')
      self.getAverages()
      transactions_clone = angular.copy(self.transactions)
    }
  }

  self.getAverages = () => {
    return self.averages = averagesFilterFilter(categoryFilterFilter(self.transactions.monthsArray, hideDonuts, hideCC))
  }
}
