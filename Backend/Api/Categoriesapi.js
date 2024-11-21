const express =require('express')
const router=express.Router()
const CategoriesController=require('../Controllers/CategoriesController')


router.post('/addCategory',CategoriesController.CreateCategory)
router.put('/updateCategory',CategoriesController.updateCategory)
router.get('/getCategory',CategoriesController.GetCategory)


module.exports = router;