const Categories = require("../Models/Categoriesmodel");

//POST
exports.CreateCategory = async (req, res) => {
  const { name, type, startdate } = req.body;

  try {
    const newCategory = new Categories({
      user: req.user.id,
      name,
      type,
      startdate,
    });
    res.status(201).json(newCategory);
    await newCategory.save();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
//GET
exports.GetCategory = async (req, res) => {
  try {
    console.log(req.body)
    console.log("getCategory")
    const category = await Categories.findById(req.user.id);
    category ? res.json(category) : res.send("no category found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
//PUT
exports.updateCategory = async (req, res) => {
  const userId = await Categories.findById(req.user.id);
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
