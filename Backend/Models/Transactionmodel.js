// {
//     "_id": ObjectId("..."),
//     "userId": ObjectId("..."),
//     "type": "expense", // or "income"
//     "amount": 100.00,
//     "categoryId": ObjectId("..."), // Reference to categories collection
//     "date": ISODate("2024-07-16T00:00:00Z"),
//     "description": "Grocery shopping",
//     "createdAt": ISODate("2024-07-16T00:00:00Z")
//   }

const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TransactionSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    from:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Account'
    },
    type:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    group:{
        type:Schema.Types.ObjectId,
        ref:'Categories',
        required:true
    }, 
    description:{
        type:String,       
    },
    startdate: {
        type: Date,
    },

});
module.exports = mongoose.model('Transaction', TransactionSchema);