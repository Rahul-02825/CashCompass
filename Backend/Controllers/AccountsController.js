const Accounts=require('../Models/Accountmodel')

//POST
exports.CreateAccounts=async(req,res)=> {
    console.log(req.body)
    const {name,group,balance } = req.body;
    console.log(group)
    try{ 
        const newAccount=new Accounts({
            user:req.user.id,
            name,
            group,
            balance,
        })
        console.log(newAccount)
        res.status(201).json(newAccount)
        await newAccount.save()
    }
    catch(err){
        console.error(err)
        res.status(500).send('Server error')
    }
}

//GET
exports.GetAccounts=async (req,res)=>{
  
    try{
        const account = await Accounts.find({ user: req.user.id });
        account?res.json(account):res.send("no account found")
    }
    catch(err){
        console.error(err)
        res.status(500).send("Server error")
    }

}
//PUT
exports.updateAccounts = async (req, res) => {
    const userId = await Accounts.findById(req.user.id);
    const updates = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(updatedUser);
    } catch (err) {
      res.status(500).send("Server error");
    }
  };