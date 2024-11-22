const Transactions = require("../Models/Transactionmodel");
const Accounts = require("../Models/Accountmodel");

//POST
exports.createTransaction = async (req, res) => {
  console.log(req.body);
  const { from, type, amount, group, description, date } = req.body;
  try {
    const newTransaction = new Transactions({
      user: req.user.id,
      from,
      type,
      amount,
      group,
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
    const transactions = await Transactions.find({ user: req.user._id });
    transactions ? res.json(transactions) : res.send("no transactions found");
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

// PUT request for checking balance and updating
exports.balanceValidator = async (req, res) => {
  console.log(req.body);
  params = req.body;
  try {
    const result = await Accounts.find({ _id: params.accountsId });
    updates = {
      $set: {
        balance: result[0].balance - params.amount,
      },
    };
    if (result[0].balance >= params.amount) {
      const updatedAccounts = await Accounts.findOneAndUpdate(
        { _id: params.accountsId },
        updates,
        {
          new: true,
          runValidators: true,
        }
      );
      if(!updatedAccounts){
        res.status(404).send("not updated properly or accounts not found");
      }
      res.send({result:true})

    } else {
      res.json({ result: false });
    }
  } catch (err) {
    res.status(500).send("server error in validation and balance updataion");
  }
};
