const User = require("./model");

// Get all users
const getAll = async (req, res) => {

  try {
    const users = await User.find();
   return res.status(200).json({
      data: users,
      msg: "All users",
    });

  } catch (error) {

    console.error(error);
    return res.status(500).json({
       msg: "Internal server error ",
      error: error
    });
  }
};

// Get one product by ID
const getOne = async (req, res) => {

  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.json({ data: user, msg: "User found" });

  }
  catch (error) {
    console.error(error);
    return res.status(200).json({ msg: "Internal server error" });
  }

};

// Update one product
const updateOne = async (req, res) => {
  try {

    const id = req.params["id"];
    const user = await User.findById(id);
    if (!user) return res.json({ msg: "User not found" });
    // , ratting, category, disconnect, createdAt, color
    const { username, email, password } = req.body;

    await User.findOneAndUpdate(
      { _id: id },
      // , ratting, category, disconnect, createdAt, color
      { username, email, password }
    );

    return res.status(200).json({ msg: "User updated successfully" });

  } catch (error) {
    console.error(error);
    return res.status(404).json({ msg: "failed to update" });
  }
};

// Delete one product
const deleteOne = async (req, res) => {
 try{

   const id = req.params["id"];
  const result = await User.findByIdAndDelete(id);
   return res.status(200).json({ msg: `User deleted successfully, ${JSON.stringify(result)}` });

 }catch(error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  } 
};

module.exports = { getAll, getOne,  updateOne, deleteOne };