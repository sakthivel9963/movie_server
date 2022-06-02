const userRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');

userRouter.post('/add_user', async (request, response) => {
  try {
    const requestBody = request.body;
    const userData = await User.findOne({ email: requestBody.email });
    if (userData) {
      return response.status(400).send({
        message: 'User already exits.',
      });
    }
    const user = new User(requestBody);
    user.password = bcrypt.hashSync(requestBody.password, 10);
    await user.save();
    response.send(user);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
});

userRouter.post('/user_login', async (request, response) => {
  try {
    const requestBody = request.body;
    const userData = await User.findOne({ email: requestBody.email }).select(
      'password'
    );
    if (!userData) {
      return response.status(400).send({
        message: 'User or Password incorrect.',
      });
    }
    const checkPassword = bcrypt.compareSync(
      requestBody.password,
      userData.password
    );
    if (!checkPassword) {
      return response.status(400).send({
        message: 'User or Password incorrect.',
      });
    }
    response.cookie(`login_cookie`, `${userData._id}`, {
      maxAge: 1000 * 60 * 60,
      expires: new Date(),
      secure: false,
      httpOnly: true,
      sameSite: true,
    });
    response.send({
      message: 'success',
      data: {
        id: userData._id,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
});

userRouter.get('/user_logout', (request, response) => {
  const cookie = request.cookies.login_cookie;
  console.log(`🚀 ~ file: user.js ~ line: 54 ~ cookie : `, cookie);
  response.clearCookie(cookie);
  response.status(201).send();
});

module.exports = userRouter;
