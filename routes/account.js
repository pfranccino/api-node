const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {check_token} = require('../middlewares/authentication')

app.post('/signIn',(req,res)=>{

    
    let body = req.body
    

    User.findOne({email :body.email},function(err,user){    
        console.log('email', body.email)
        console.log('password',body.password)
        console.log('user',user)
        
        if(err){
            return res.status(400).json({
                err : err
            })
        }

        if(!bcrypt.hashSync(body.password , user.password)){
            return res.status(400).json({
                message : 'Incorrect credentials'
            })
        }
        if(!user){
            return res.status(400).json({
                message : 'Incorrect credencialssss'
            })
        }
        
       

        let token = jwt.sign({
            user : user,
        },process.env.SEED,{
            expiresIn : '24h'
        })

        res.json({
            user: user,
            token : token
        })
        

    })
})

app.post('/signUp',function(req,res){

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
 module.exports = app;