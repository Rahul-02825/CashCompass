const express =require('express')
const router=express.Router()
const Debtcontroller=require('../Controllers/DebtContoller')


router.post('/user',Debtcontroller.createDebts)

module.exports = router;