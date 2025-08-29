const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        // required:[ true,"please provide a username"],
        // unique:[true,"username must be unique"],
       
    },

    email: {
         type: String,
        //  required: [true, "please provide an email"],
        //  unique: true,
      
          },

    password: { 
        type: String,
        // required: [true],
        // unique: false,
        
          },
   
 roles:{type: Number}


    // createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;