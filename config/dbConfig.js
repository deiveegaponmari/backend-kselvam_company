const mongoose = require("mongoose");
require('dotenv').config()
const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully!!!");
  } catch(error) {
    console.log("Database Connection Failed",error.message);
  }
};
module.exports = connectDB;