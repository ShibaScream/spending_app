'use strict'

require('./transaction-filters.scss')

module.exports = {
  template: require('./transaction-filters.html'),
  controller: ['$log', '$scope', 'transactionService', TransactionFiltersController],
  controllerAs: 'tfCtrl'
}

function TransactionFiltersController ($log, $scope, transactionService) {
  let self = this

  self.filterDonuts = () => {
    $log.debug('ngChange donuts')
    $scope.$emit('filter donuts')
  }

  self.filterCC = () => {
    $log.debug('ngChange cc')
    $scope.$emit('filter cc')
  }
}
