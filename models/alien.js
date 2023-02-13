const mongoose = require('mongoose')

const aliensSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        default: false
    }

})

module.exports = mongoose.model('Alien',aliensSchema)