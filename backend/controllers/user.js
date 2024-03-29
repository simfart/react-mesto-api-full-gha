const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;
const { NotFoundError, DuplicateKeyError, ValidationError } = require('../utils/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUsersMe = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
        return;
      }
      res.send(user);
    })
    .catch(next);
};

const getUserId = (req, res, next) => {
  const { userId } = req.params;
  User
    .findById(userId)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next, data) => {
  User.findByIdAndUpdate(req.user._id, data, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля. '));
      } else {
        next(err);
      }
    });
};

const updateName = (req, res, next) => {
  const { name, about } = req.body;
  updateUser(req, res, next, { name, about });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUser(req, res, next, { avatar });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании пользователя. '));
      } else if (err.code === 11000) {
        next(new DuplicateKeyError());
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = JWT.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      // вернём токен
      res
        .cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
          maxAge: 3600000,
          httpOnly: true,
          sameSite: 'none',
          SameSite: 'None',
          secure: true,
        });
      res.send({ token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt', {
    sameSite: 'none',
    SameSite: 'None',
    secure: true,
  }).send({ message: 'Выход' });
};

module.exports = {
  createUser,
  getUserId,
  getUsers,
  updateName,
  updateAvatar,
  login,
  getUsersMe,
  logout,
};
