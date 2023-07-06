const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const {schemaOptions} = require('./schemaOptions')

const diarySchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    title:{
        type:String,
        default:'Untitled'
    },

    description:{
        type:String,
        default:`📍Add description here`
    },
   
    favorites:{
        type:Boolean,
        default:false
    },

    content:{
        type:String,
        default:''
    },

    position:{
        type:Number
    },

    favoritesPosition:{
        type:Number,
        default:0
    }
   
},schemaOptions)

module.exports=mongoose.model('Diary',diarySchema)