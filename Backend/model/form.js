const mongoose = require("mongoose");

const formschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },

  company: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Form", formschema);
