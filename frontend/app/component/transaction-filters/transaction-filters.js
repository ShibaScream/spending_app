'use strict'

require('./transaction-filters.scss')

module.exports = {
  template: require('./transaction-filters.html'),
  controller: ['$log', '$scope', TransactionFiltersController],
  controllerAs: 'tfCtrl'
}

function TransactionFiltersController ($log, $scope) {
  let self = this
  self.hideDonuts = false
  self.hideCC = false
}
