const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/magesDB");

// Name (Input box)
// Mobile (Input box) – must be unique
// Referral Code (Input box)
// Gender (Radio buttons): Male, Female
// Technology (Checkboxes): Node.js, React, SQL
// Profile Pictures – multiple image upload
// Date of Birth (Date picker)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    Mobile: {
        type: String,
        require: true
    },
    Referral: {
        type: Number,
        require: true
    },
    Gender: {
        type: String,
        require: true,
        default: 'male',
        enum:['male','female']
    },
    profilePictures: {
        type: [String],
    },
    dob: {
        type: date,
        
    },
    password: {
        type: String,
        require: true
    },
});
const User = mongoose.model('User', userSchema);
module.exports = User;