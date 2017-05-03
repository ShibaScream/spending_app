'use strict'

require('./home.scss')

module.exports = [
  '$log',
  HomeController
]

function HomeController ($log) {
  let self = this
  self.title = 'Welcome to the home page!'
}
