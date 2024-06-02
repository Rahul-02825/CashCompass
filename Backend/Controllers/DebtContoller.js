const Debt=require('../Models/Debtmodel')

//POST
exports.createDebts=async(req,res)=> {
    const user=await User.findbyId(req.user.id)
    const {firstname, secondname, email, contact,money,enddate } = req.body;
    debtstatus=req.body.checkbox?'true':'false'

    try{
        const newUser=new User({
            user:req.user.id,
            firstname,
            secondname,
            email,
            contact,
            money,
            debtstatus,
            enddate
        })
        await newUser.save()
    }
    catch(err){
        console.error(error)
        res.status(500).send('Server error')
    }
}