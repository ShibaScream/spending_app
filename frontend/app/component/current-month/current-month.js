'use strict'

require('./current-month.scss')

module.exports = {
  template: require('./current-month.html'),
  controller: ['$log', 'sumFilter', 'transactionService', CurrentMonthController],
  controllerAs: 'cmCtrl',
  bindings: {
    transactions: '<'
  }
}

function CurrentMonthController ($log, sumFilter, transactionService) {
  let self = this
  let projectedHidden = true
  let transactions_clone = angular.copy(self.transactions)
  self.header = 'Current Month'
  self.projectedSpent = 0
  self.projectedIncome = 0
  self.buttonText = 'Show Projected Budget'
  self.convert = transactionService.convertToDollarsString
  self.displayIncome = 0
  self.displaySpent = 0

  self.$doCheck = () => {
    if (!angular.equals(transactions_clone, self.transactions)) {
      if (Object.keys(self.transactions).length > 0) updateTotals()
      transactions_clone = angular.copy(self.transactions)
    }
  }

  self.showProjected = () => {
    if (projectedHidden) {
      self.buttonText = 'Hide Projected Budget'
      self.header = 'Current Month with Projected Budget'
      projectedHidden = !projectedHidden
      transactionService
        .fetchProjected()
        .then( totals => {
          self.projectedIncome = totals.income
          self.projectedSpent = totals.spent
          updateTotals()
        })
    } else {
      self.projectedSpent = 0
      self.projectedIncome = 0
      self.header = 'Current Month'
      self.buttonText = 'Show Projected Budget'
      projectedHidden = !projectedHidden
      updateTotals()
    }
  }

  function updateTotals () {
    self.displayIncome = sumFilter(self.transactions.monthsArray[0].income, self.projectedIncome)
    self.displaySpent = sumFilter(self.transactions.monthsArray[0].spent, self.projectedSpent)
  }

}
