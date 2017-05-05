'use strict'

require('./monthly-averages.scss')

module.exports = {
  template: require('./monthly-averages.html'),
  controller: ['$log', '$scope', 'categoryFilter', 'averagesFilter','transactionService', MonthlyAveragesController],
  controllerAs: 'maCtrl',
  bindings: {
    transactions: '<'
  }
}

function MonthlyAveragesController ($log, $scope, categoryFilter, averagesFilter, transactionService) {
  let self = this
  let transactions_clone = angular.copy(self.transactions)
  self.convert = transactionService.convertToDollarsString
  self.averages = {income: 0, spent: 0}

  self.$doCheck = () => {
    if (!angular.equals(transactions_clone, self.transactions)) {
      self.getAverages()
      transactions_clone = angular.copy(self.transactions)
    }
  }

  self.getAverages = () => {
    self.averages = {income: 0, spent: 0}
    self.averages = averagesFilter(self.transactions.monthsArray)
  }
}
