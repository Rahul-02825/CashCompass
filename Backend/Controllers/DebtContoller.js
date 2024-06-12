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
        res.status(201).json(newUser)

        await newUser.save()
    }
    catch(err){
        console.error(err)
        res.status(500).send('Server error')
    }
}


//GET where status is true and false (history)
exports.GetDebtHistory = async (req, res) => {
    try {
        const user = await Debt.find({user:req.user.id});
        //console.log(user);

        const truestatus=user.filter(item=>(item.debtstatus)==='true')
        const falsestatus=user.filter(item=>(item.debtstatus)==='false')
   
        // console.log(truestatus)
        if (!user) {
            console.log('no user')
            return res.status(404).json({ message: 'User not found' });
        }
        const response = {
            all: user,
            pending: falsestatus,
            completed: truestatus
        };
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error no id');
    }
};

//PUT (update the debt money getting the unique debt id)
exports.updateDebt = async (req, res) => {
    const { id, money } = req.body;
    
    try {
        let stat=false;
        let remainingDebt;

        const prevDebt=await Debt.findOne({_id:id})

        console.log(prevDebt)

        if(prevDebt.money>=parseInt(money) && prevDebt.money!==0){
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