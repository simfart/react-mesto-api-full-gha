const JWT = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { AuthError } = require('../utils/errors');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = JWT.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch {
    return next(new AuthError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
module.exports = auth;
