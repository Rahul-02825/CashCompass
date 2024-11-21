// "budgets": [
//     {
//       "_id": ObjectId("60c72b2f9b1d8b3a7c8e4ba0"),
//       "userId": ObjectId("60c72b2f9b1d8b3a7c8e4b9d"),
//       "categoryId": ObjectId("60c72b2f9b1d8b3a7c8e4b9f"),
//       "amount": 500.00,
//       "startDate": ISODate("2024-07-01T00:00:00Z"),
//       "endDate": ISODate("2024-07-31T00:00:00Z"),
//       "createdAt": ISODate("2024-07-01T00:00:00Z")
//     }
//   ],
const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BudgetSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    category:{
        type:Schema.Types.ObjectId,
        // required:true,
        ref:'Categories'
    },
    amount:{
        type:Number,
        required:true
    },
    startdate: {
        type: Date,
    },
    enddate:{
        type:Date,       
    },
    
});
          
module.exports = mongoose.model('Budget', BudgetSchema);
