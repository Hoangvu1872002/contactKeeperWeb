const mongoose = require("mongoose");
const schema = mongoose.Schema;
const user = require("../model/userModel");

const contactSchema = new schema({
  user: {
    type: mongoose.Schema.Types.String,
    ref: user,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("contact", contactSchema);
