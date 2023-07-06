const monogoose =require('mongoose');
const {schemaOptions} =require('./schemaOptions')

const userSchema =new monogoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }

},schemaOptions)

module.exports=monogoose.model('User',userSchema)