const express =require('express')
const router=express.Router()
const Accountcontroller=require('../Controllers/AccountsController')


router.post('/accounts',Accountcontroller.CreateAccounts)
router.put('/accountsupdate',Accountcontroller.updateAccounts)
router.get('/getaccounts',Accountcontroller.GetAccounts)


module.exports = router;
