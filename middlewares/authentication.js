const jwt = require('jsonwebtoken')
require('../config/config')

let check_token = (req,res,next) =>{
    let token = req.get('authorization')

    jwt.verify(token,process.env.SEED,(err, decoded) =>{

        if(err){
            return res.status(400).json({
                message : 'Invalid token'
            })
        }

        req.user = decoded.user
        next()

    })
}

module.exports = {
    check_token
}