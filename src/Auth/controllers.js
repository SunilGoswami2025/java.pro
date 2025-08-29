const User = require("../Users/model");
// const bcrypt = require("bcryptjs");
// const soltRound = process.env.


// Register user

const register = async (req, res) => {
  try {
    const { username, email, password, roles} = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }
    // roles = roles || "user"; // Default to 'user' if no role is provided
 

    const user = await User.create({ username, email, password, roles });
    return res.status(201).json({ msg: "User created", data: user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Login user

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // bcrypt.compare(password, user.password)
    // if(!password) {
    //   return res.status(400).json({ msg: "Please provide a password" });
    // }

    if (user.password !== password) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    return res
      .status(200)
      .json({
        msg: "User logged in successfully",
        data: { username: user.username, email: user.email },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

// Logout user
const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ msg: "Internal server error", error: err });
      }
      return res.status(200).json({ msg: "User logged out successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

module.exports = {register, login, logout};