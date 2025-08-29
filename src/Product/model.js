const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname: { type: String, 
        required: true ,lowercase: true, trim: true ,},
    price: { type: Number },
    desc: { type: String },
    ratting: { type: Number, enum:[0,0.5,1,1.2,2,2.5],default: 0 },
    category: { type: String, enum: ['clothes', 'electronics', 'furniture'] },
    disconnect: { type: Number,default: 1 },
    createdAt: { type: Date, default: Date.now },
    color:{type:[String]},
    size:[],
    images: { type: String }
 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;