const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  movieId: { type: Number, required: true },
  user: { type: String, required: true },
  content: { type: String, required: true },
});

const Reviews = mongoose.model("Reviews", ReviewSchema);

module.exports = Reviews;
