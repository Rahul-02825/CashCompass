const mongoose = require('mongoose');

//Ensure it's exactly 10 digits(phone number)
function validatenumber(value) {
    const stringValue = value.toString();
    return stringValue.length === 10 && /^\d+$/.test(stringValue); 
}

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    firstname: {
        type: String,
        required: true,
    },
    secondname:{
        type:String,
        required:false,
    },
    contact:{
        type:Number,
        validate: [validatenumber, 'Number should be exactly 10 digits'],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    income: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema);
