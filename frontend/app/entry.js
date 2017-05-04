'use strict'

require('./scss/main.scss')

const path = require('path')
const angular = require('angular')
const camelcase = require('camelcase')
const pascalcase = require('pascalcase')
const uiRouter = require('angular-ui-router')


angular.module('SpendingApp', [uiRouter])

angular.module('SpendingApp').config(['$httpProvider', corsSettings])

function corsSettings ($httpProvider) {
  $httpProvider.defaults.useXDomain = true
}

let context = require.context('./config/', true, /\.js$/)
context.keys().forEach( path => {
  angular.module('SpendingApp').config(context(path))
})

context = require.context('./view/', true, /\.js$/)
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'))
  let module = context(key)
  angular.module('SpendingApp').controller(name, module)
})

context = require.context('./service/', true, /\.js$/)
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'))
  let module = context(key)
  angular.module('SpendingApp').factory(name, module)
})

context = require.context('./component/', true, /\.js$/)
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'))
  let module = context(key)
  angular.module('SpendingApp').component(name, module)
})
//
// context = require.context('./filter/', true, /\.js$/)
// context.keys().forEach( key => {
//   let name = camelcase(path.basename(key, '.js'))
//   let module = context(key)
//   angular.module('SpendingApp').filter(name, module)
// })
