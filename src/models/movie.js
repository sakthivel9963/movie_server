const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    movie_name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    cast: {
      type: Array,
    },
    genre: {
      type: String,
    },
    release_date: {
      type: Date,
    },
    created_by: {
      type: mongoose.ObjectId,
    },
    updated_by: {
      type: mongoose.ObjectId,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
