const Debt=require('../Models/Debtmodel')

//POST
exports.CreateDebts=async(req,res)=> {
    //const user=await User.findbyId(req.user.id)
    const {firstname, secondname, email, contact,money,enddate } = req.body;
    debtstatus=req.body.checkbox?'true':'false'

    try{
        const newUser=new Debt({
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

//GET where status is true or false based on (req.query.status) by query in endpoint url
exports.GetDebts=async(req,res)=>{
    try{
        const filter={_id:req.user.id}
        req.query.status?filter.debtstatus='true':filter.debtstatus=req.query.status

        const users = await Debt.find(filter);    

        users.length===0?res.status(404).json({message:'user not found'}):res.json(users)
    
    }catch(err){
        console.error(err)
        res.status(500).send('Server error')
    }
}

//GET where status is true and false (history)

exports.GetDebts=async(req,res)=>{
    try{
        const users = await Debt.findbyId(user.req.id);    

        users.length===0?res.status(404).json({message:'user not found'}):res.json(users)
        
    }catch(err){
        console.error(err)
        res.status(500).send('Server error')
    }
}