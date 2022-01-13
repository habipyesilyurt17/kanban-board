const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  backlog: {
    type: Array,
    required: true
  },
  todo: {
    type: Array,
    required: true
  },
  inProgress: {
    type: Array,
    required: true
  },
  done: {
    type: Array,
    required: true
  }
  // lists: {
  //   type: Array,
  //   required: true,
  // }
});

module.exports = mongoose.model("Board", boardSchema);
