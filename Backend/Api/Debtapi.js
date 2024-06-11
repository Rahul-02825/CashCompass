const express =require('express')
const router=express.Router()
const Debtcontroller=require('../Controllers/DebtContoller')
//const { ensureAuthenticated } = require('../Server'); 



router.post('/donor',Debtcontroller.CreateDebts)
router.route('/historydebts').get(Debtcontroller.GetDebtHistory)
router.put('/debtupdate',Debtcontroller.updateDebt)

module.exports = router;