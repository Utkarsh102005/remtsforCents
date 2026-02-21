const mongoose = require("mongoose")



const bikeBook_Schema = new mongoose.Schema({
        userID:String,
        name:String,
        vehicleNumber:String,
        bookingId:String,
        modelNumber:String,
        brandName:String,
        requestedAt:String,
        bookedAt: String,
        returnedAt:String,
        bookingDuration:String,
        confirm:Boolean,
        return:Boolean,
        rate:Number,
        price:Number
})


const bookingCollection = new mongoose.model("bikeBooking",bikeBook_Schema)
module.exports = bookingCollection;

