const movieRouter = require('express').Router();
const { Movie } = require('../models');

movieRouter.post('/', async (request, response) => {
  try {
    const cookie = request.cookies.login_cookie;
    const movie = new Movie(request.body);
    movie.created_by = cookie;
    movie.updated_by = cookie;
    await movie.save();
    response.send(movie);
  } catch (error) {
    response.status(500).send(error);
  }
});

movieRouter.get('/', async (request, response) => {
  try {
    const result = await Movie.find();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

movieRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const result = await Movie.findById(id);
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

movieRouter.put('/:id', async (request, response) => {
  try {
    const cookie = request.cookies.login_cookie;
    const id = request.params.id;
    const requestBody = request.body;
    requestBody['updated_by'] = cookie;
    const result = await Movie.findByIdAndUpdate(id, requestBody, {
      returnDocument: 'after',
    });
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

movieRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const result = await Movie.findByIdAndDelete(id);
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = movieRouter;
