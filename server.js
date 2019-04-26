require('./config/config')
const express = require('express')
const app  = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


let db = process.env.DB
let port = process.env.PORT


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(require('./routes/index'))



mongoose.connect(db, { useNewUrlParser: true },(err, res) => {

    if (err) throw err;

    console.log('Data base online');

});


app.listen(port, ()=>{
    console.log('Listening port :' ,port)
})
