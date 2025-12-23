const {model, Schema} = require('mongoose')

let ContactSchema= new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,

    },

    phone:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }


})



module.exports= model('ContactModel', ContactSchema)