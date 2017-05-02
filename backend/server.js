'use strict'

const Express = require('express')
const router = Express.Router()
const morgan = require('morgan')
const app = Express()
const httpErrors = require('./lib/custom-http-errors')

require('dotenv').load()

app.use(morgan('dev'))

const PORT = process.env.BACKEND_PORT

require('./routes/api-routes')(router)
require('./routes/auth-routes')(router)

app.use(router)
app.use(httpErrors)

if(require.main === module) {
  app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}

module.exports = app
