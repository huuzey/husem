const mongoose = require("mongoose");

const evalschema = new mongoose.Schema({
  satisfy: {
    type: String,
    required: true,
  },
  weaknesses: {
    type: String,
    required: true,
  },
  suggestion: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  diff: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("eval", evalschema);
