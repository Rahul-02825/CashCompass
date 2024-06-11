const Debt=require('../Models/Debtmodel')

//POST
exports.CreateDebts=async(req,res)=> {
    //const user=await User.findbyId(req.user.id)
    const {firstname, secondname, email, contact,money,enddate } = req.body;
    debtstatus=req.body.checkbox?'true':'false'

    try{
        console.log(firstname)
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
        console.log(newUser)
        res.status(201).json(newUser)

        await newUser.save()
    }
    catch(err){
        console.error(err)
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
exports.GetDebtHistory = async (req, res) => {
    try {
        const user = await Debt.find({user:req.user.id});
        //console.log(user);

        if (!user) {
            console.log('no user')
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error no id');
    }
};


exports.updateDebt = async (req, res) => {
    const { id, money } = req.body;
    
    try {
        let stat=false;
        let remainingDebt;

        const prevDebt=await Debt.findOne({_id:id})

        console.log(prevDebt)

        if(prevDebt.money>parseInt(money)){
            if(prevDebt.money-parseInt(money)===0){
                remainingDebt=0
                stat=true;
            }
            else{
                remainingDebt=prevDebt.money-money
                stat=false;
            }
            updates={
                $set: {
                    money:remainingDebt,
                    debtstatus:stat
                }   
            }
            
            const updatedDebt = await Debt.findOneAndUpdate(
                {_id:id},
                updates,
                { new: true, runValidators: true }
            );
    
            if (!updatedDebt) {
                return res.status(404).json({ message: 'Debt not found' });
            }

            // const resp={
            //     message:'updated succesfully',
            //     stat:true
            // }
            res.json('updated succesfully')
        }
        else{
            res.send('Invalid balance')
        }
        
    } catch (err) {
        console.error('Error updating debt:', err);
        res.status(500).send('Server error');
    }
};