const express =require('express')
const router=express.Router()
const Usercontroller=require('../Controllers/UserContoller')


router.post('/user',Usercontroller.CreateUser)

module.exports = router;
