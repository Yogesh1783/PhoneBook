const mongoose = require("mongoose");

const mobileBookSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requires: true,
  },
});

const mobileBook = mongoose.model("mobileBook", mobileBookSchema);

module.exports = mobileBook;
