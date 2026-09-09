const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    profileImage: {
        type: String
    },
       phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
    },
   
    
})

module.exports = mongoose.model("User", userSchema)