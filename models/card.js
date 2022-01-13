const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board"
  }
});

module.exports = mongoose.model("Card", cardSchema);
