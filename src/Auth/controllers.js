const User = require("../Users/model");
const bcrypt = require("bcryptjs");
const User_Role = require("./createAdmin");
// const soltRound = process.env.


// Register user


const register = async (req, res) => {

    const { username, email, password, role} = req.body;

       if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }
  try {

if(role === User_Role.ADMIN)return res.status(403).json({msg:"U can't Register"})

    const user = await User.create({ username, email, password, role });
    return res.status(201).json({ msg: "User created", data:{id:newUser._id, username:user.username, email:user.email} });

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
if(user.password !== password)return res.status(401).json({msg:"Invalid Password"})
 

  // Session
  req.session.user = {
    id:user._id,
    username: user.username,
    email: user.email
  }

    return res
      .status(200)
      .json({
        msg: "User logged in successfully",
       user:req.session.user
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