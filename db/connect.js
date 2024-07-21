const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url); //Here we have not written newURL parser etc because we are using version above 6 of mongoose
};
module.exports = connectDB;
