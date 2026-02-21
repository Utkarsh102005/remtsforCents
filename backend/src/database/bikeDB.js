const mongoose = require('mongoose')




const bike_schema = new mongoose.Schema({
    brandName:String,
    modelNumber:String,
    vehicleNumber:String,
    rate:Number,
    vehicleType:String,
    vehicleImage:String,
    available:Boolean
})

const bike = new mongoose.model("bikeDetails",bike_schema)

module.exports=bike