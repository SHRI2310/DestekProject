require('dotenv').config(); 
const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process on connection failure
  }
};

// Call the connection function
connectDB();
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});