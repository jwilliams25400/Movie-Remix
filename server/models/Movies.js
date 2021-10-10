const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const movieSchema = new Schema({
  title: {
    type: String,
    required: 'You need a movie title',
    trim: true,
  },
  director: {
    type: String,
    trim: true,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
