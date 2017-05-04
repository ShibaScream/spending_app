'use strict'

require('./monthly-averages.scss')

module.exports = {
  template: require('./monthly-averages.html'),
  controller: ['$log', 'transactionService', MonthlyAveragesController],
  controllerAs: 'maCtrl',
  bindings: {
    transactions: '<'
  }
}

function MonthlyAveragesController ($log, transactionService) {
  let self = this
  self.convert = transactionService.convertToDollarsString
}
