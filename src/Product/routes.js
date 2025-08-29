const express = require("express");
const router = express.Router();
const product = require ("./controllers");
const authUser = require("../Auth/middleware");
const upload = require("../config/multerconfig");

//1.read All
router.get("/ReadAllProducts", product.getAll);

//2.read One
router.get("/ReadOneProduct/:id", product.getOne);

// 3.create
router.post("/CreateProduct", upload.single("images"), product.createOne);

//4.update
router.put("/UpdateProduct/:id", product.updateOne);

//5.delete
router.delete("/DeleteProduct/:id", product.deleteOne );


module.exports = router;