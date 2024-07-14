const express =require('express')
const router=express.Router()
const Usercontroller=require('../Controllers/UserContoller')


router.post('/user',Usercontroller.CreateUser)
router.put('/profileupdate',Usercontroller.updateUserDetails)


module.exports = router;
