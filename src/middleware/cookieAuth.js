const cookieAuth = (request, response, next) => {
  const cookie = request.cookies.login_cookie;
  if (!cookie) {
    return response.status(401).send();
  }
  next();
};

module.exports = cookieAuth;
