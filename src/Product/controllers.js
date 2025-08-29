const Product = require("./model");
const Users = require("../Users/model")
const express = require("express");
const mongoose = require("mongoose");

// getAll products
const getAll = async (req, res) => {
  try {
    const products = await Product.find().populate("user","password__")

    // console.log("Session data:", req.session.data);
    // if (req.session?.data) {
    //   req.session.data = req.session.data + 1;
    // } else {
    //   req.session.data = 1;
    // }

    return res.status(200).json({
      data: products,
      msg: "All products",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

// get product
const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ msg: "Product not found" });
    return res.json({ data: product, msg: "Product found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Create product
const createOne = async (req, res) => {
  try {
    let imagepath = "";
    if (req.file) {
      imagepath = "/images/" + req.file.filename;
    }

    const { productname, price, desc } = req.body;
    console.log(req.body);
    if (!productname || !price || !desc) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const product = await Product.create({
      productname,
      price,
      desc,
      images: imagepath,
    });

    res.status(201).json({ msg: "Product created", data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Update product
const updateOne = async (req, res) => {
  try {
    const id = req.params.id;
    const { productname, price, desc } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { productname, price, desc },
      { new: true }
    );

    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.status(200).json({ msg: "Product updated successfully", data: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Failed to update" });
  }
};

// Delete one product
const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);

    if (!result) return res.status(404).json({ msg: "Product not found" });

    res.status(200).json({
      msg: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };