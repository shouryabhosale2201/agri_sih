const mongoose = require('mongoose')
const {Schema} = mongoose;

const FarmerSchema = new Schema({
    name:{
        type:String,
        require : true
    },
    email:{
        type:String,
        unique:true,
        require : true
    },
    password:{
        type:String,
        require : true 
    },
    phone:{
        type:Number,
        require : true
    }
})


const FarmerModel = mongoose.model('Farmer',FarmerSchema);

module.exports = FarmerModel;