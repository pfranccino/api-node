const mongoose = require('mongoose')
let Schema  = mongoose.Schema;



let userSchema =  new Schema({

name  : {
    type : String,
    required: [true,'Need a name']
},
email  : {
    type : String,
    required : [true,'Need a email']
    
},
  password: {
    type : String,
    required : [true,'Need a password'],
    select : false
    
}

})


module.exports = mongoose.model('User', userSchema)