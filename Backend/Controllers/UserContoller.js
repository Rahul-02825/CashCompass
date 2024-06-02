const User=require('../Models/Usermodel')


//GET

exports.GetUser=async(req,res)=>{
    //const user=await User.findbyId(req.user.id)
    
}



//POST
exports.CreateUser=async(req,res)=>{
    const{username,password,firstname,secondname,contact,email,income}=req.body
    try{

        // Generate a salt and hash the password synchronously
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser=new User({
            username,
            password:hashedPassword,
            firstname,
            secondname,
            contact,
            email,
            income
        })
        
        await newUser.save()
        res.status(201).json(newUser)
    }catch(err){
        console.error(err)
        res.status(500).send("Server Error")
    }
}

//PUT
exports.updateUserDetails = async (req, res) => {
    //const user=await User.findById({req.user.id})
    const updates = req.body

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true, runValidators: true }
        )
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser)
    } catch (err) {
        res.status(500).send('Server error')
    }
};
