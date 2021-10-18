const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const movieSchema = new Schema({
  title: {
    type: String,
    required: "You need a movie title",
    trim: true,
  },
  poster: {
    type: String,
    trim: true,
  },
  movieId: {
    type: String,
  },
});

// const Movies = model('Movies', movieSchema);

module.exports = movieSchema;
