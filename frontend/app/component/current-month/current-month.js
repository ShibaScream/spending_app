'use strict'

require('./current-month.scss')

module.exports = {
  template: require('./current-month.html'),
  controller: ['$log', 'transactionService', CurrentMonthController],
  controllerAs: 'cmCtrl',
  bindings: {
    spent: '<',
    income: '<'
  }
}

function CurrentMonthController ($log, transactionService) {
  let self = this

  self.convert = transactionService.convertToDollarsString
  self.showProjected = false

}
