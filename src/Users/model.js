const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        // required:[ true,"please provide a username"],
        // unique:[true,"username must be unique"],
        // match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"],
    },

    email: {
         type: String,
        //  required: [true, "please provide an email"],
        //  unique: true,
        //  match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"] 
          },

    password: { 
        type: String,
        // required: [true],
        // unique: false,
        
          },
   
 roles:{type: String, enum: ['admin', 'user'], default: 'user' },


    // createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;