const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Ensure it's exactly 10 digits(phone number)
function validatenumber(value) {
    const stringValue = value.toString();
    return stringValue.length === 10 && /^\d+$/.test(stringValue); 
  }

const DebtSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    firstname:{
        type:String,
        required:true,
    },
    secondname:{
        type:String,
    },
    email: {
        type: String,
        unique: true,
    },
    contact:{
        type:Number,
        required:true,
        validate: [validatenumber, 'Number should be exactly 10 digits']
    },
    money:{
        type:Number,
        required:true,
    },
    debtstatus:{
        type:String,
        required:true,
        default:false,
    },
    curdate:{
        type:Date,
        default:Date.now()
    },
    enddate:{
        type:Date,
    } 
});
          
module.exports = mongoose.model('Debt', DebtSchema);
