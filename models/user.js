const mongoose = require('mongoose')
let mongooseHidden = require('mongoose-hidden')({ defaultHidden: { password: true } })
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
    
}

})

userSchema.plugin(mongooseHidden)




module.exports = mongoose.model('User', userSchema)