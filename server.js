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


mongoose.connect('mongodb://localhost:27018/api', (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});


app.listen(port, ()=>{
    console.log('Escuchando Puerto' ,port)
})
