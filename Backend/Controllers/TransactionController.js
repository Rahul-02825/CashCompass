const Transactions = require("../Models/Transactionmodel");

//POST
exports.createTransaction = async (req, res) => {
  console.log(req.body);
  const { From, type, amount, category, description ,date} = req.body;
  try {
    const newTransaction = new Transactions({
      user: req.user.id,
      From,
      type,
      amount,
      category,
      description,
      date,
    });
    console.log(newTransaction);
    res.status(201).json(newTransaction);
    await newTransaction.save();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//GET
exports.getTransaction = async (req, res) => {
  try {
    const account = await Accounts.findById(req.user.id);
    category ? res.json(account) : res.send("no account found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//PUT
exports.updateTransaction = async (req, res) => {
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