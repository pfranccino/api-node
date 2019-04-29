const express = require('express')

const app = express()


app.use(require('./user.js'))
app.use(require('./account.js'))



module.exports  = app