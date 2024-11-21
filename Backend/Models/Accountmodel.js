
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccountSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    group:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
    startdate: {
        type: Date,
        default:Date.now()
    },

});
module.exports = mongoose.model('Account', AccountSchema);