const mongoose=require('mongoose')


const parkingSchema=mongoose.Schema({
vno:String,
vtype:String,
vin:{type:Date,default:new Date()},
status:{type:String,default:'Parked'},
vout:Date,
amount:Number,
})


module.exports=mongoose.model('parking',parkingSchema)