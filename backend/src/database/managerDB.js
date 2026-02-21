const mongoose = require("mongoose")


const manager_schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:Number,
    loginToken:String
})


const managerCollection = new mongoose.model("managerCredentials",manager_schema)

module.exports = managerCollection;