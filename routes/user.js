const express = require('express');
const app = express();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const _ = require('lodash')


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

 app.get('/users/:id',function(req,res){

     let id = req.params.id
     User.findById(id,function(err,user){
         if(err){
             res.status(400).json({
                 err : err
             })
         }

         res.json({
             user : user
         })
     })
 })

 app.put('/users/:id', function(req,res){
     let id = req.params.id

     let body = _.pick(req.body,['name'])
     User.findOneAndUpdate(id,body , {new: true, useFindAndModify: false},function (err, updateUser){
         if(err){
             res.status(400).json({
                 err : err
             })
         }

         res.json({
             user : updateUser
         })
     })
 })

 app.delete('/users/:id', function (req,res){
     let id = req.params.id

     User.findByIdAndRemove(id,{new: true, useFindAndModify: false},function(err,dele){
        if(err){
             res.status(400).json({
                 err : err
             })
         }

        if(dele === null){
            res.json({
                err: ' this user doesnt exist'
            })
        }else{
        res.json({
            message : 'this user was delete succesfuly'
        })

        }  

     })
 })

module.exports = app;