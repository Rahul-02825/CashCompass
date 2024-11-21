const express =require('express')
const router=express.Router()
const TransactionController=require('../Controllers/TransactionController')


router.post('/addtransaction',TransactionController.createTransaction)
router.put('/updatetransaction',TransactionController.updateTransaction)
router.get('./getTransaction',TransactionController.getTransaction)


module.exports = router;
