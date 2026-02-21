const mongoose = require('mongoose')



const contact_schema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
        
    },
    phone:Number,
    message:String,
    messageReceived:{
        type:Date,
        default: Date.now
    }
})

const contact = new mongoose.model("queryFeedback",contact_schema)

module.exports=contact