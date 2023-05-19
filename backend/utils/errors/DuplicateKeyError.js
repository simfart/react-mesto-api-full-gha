class DuplicateKeyError extends Error {
  constructor(message = 'E-mail уже зарегестрирован') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = DuplicateKeyError;
