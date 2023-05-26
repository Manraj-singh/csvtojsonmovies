const mongoose = require("mongoose");

//mongoose schema defined as per the csv format
const movieSchema = new mongoose.Schema({
  imdb_title_id: { type: String, required: true },
  original_title: { type: String, required: true },
  year: { type: Number, required: true },
  date_published: { type: Date, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  language: { type: String, required: true },
  description: { type: String, required: true },
  reviews_from_users: { type: String, default: "N/A" },
  reviews_from_critics: { type: String, default: "N/A" },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
