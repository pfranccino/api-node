const express = require('express');
const app = express();
const User = require('../models/user')
const bcrypt = require('bcrypt')


 app.post('/users', function(req,res){

    let body = req.body 

    let user = new User({
        name : body.name,
        email: body.email,
        password : bcrypt.hashSync(body.password,10)
    })

    user.save((err, userdb) =>{
        if(err){
            return res.status(400).json({
                err : err
            })
        }

        res.json({
            user : userdb
        })
    })

 })   

 app.get('/users',function(req,res){
     User.find({}, function(err,users){
         if(err){
             res.status(400).json({
                 err : err
             })
         }

         res.json({
             users : users
         })
     })
 })

module.exports = app;