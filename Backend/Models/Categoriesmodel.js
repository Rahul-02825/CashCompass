// {
//     "_id": ObjectId("..."),
//     "name": "Groceries",
//     "type": "expense", // or "income"
//     "userId": ObjectId("..."), // optional, if categories can be user-specific
//     "createdAt": ISODate("2024-07-16T00:00:00Z")
//   }
const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategoriesSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },   
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    startdate: {
        type: Date,
        default:Date.now(),
    },
    
});
   
module.exports = mongoose.model('Categories', CategoriesSchema);
