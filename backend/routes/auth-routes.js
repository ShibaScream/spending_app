'use strict'

const basicAuth = require('../lib/basic-auth')

module.exports = (router) => {

  // router.get('/', (req, res) => {
  //   res.json({msg: 'Dan\'s Spending App is functioning'})
  // })

  router.get('/api/v1/login', basicAuth, (req, res) => {
    // if this were a real app, this is where I would generate an actual json web token
    res.json({token: 'success'})
  })

}
