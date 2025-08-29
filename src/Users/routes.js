const express = require("express");
const router = express.Router();
const user = require ("./controllers");
const authUser = require("../Auth/middleware");

//1.read All-

router.get("/getAllUsers", user.getAll);

//2.read One
router.get("/GetOneUser/:id", authUser, user.getOne);

//5.update
router.put("/UpdateUser/:id", authUser, user.updateOne);

//4.delete
router.delete("/DeleteUser/:id", authUser, user.deleteOne);



module.exports = router;