const { cookieAuth } = require('../middleware');
const movieRouter = require('./movie');
const userRouter = require('./user');

const router = require('express').Router();

router.use('/', [userRouter]);
router.use('/movie', cookieAuth, [movieRouter]);

module.exports = router;
