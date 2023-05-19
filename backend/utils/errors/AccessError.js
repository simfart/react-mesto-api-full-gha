class AccessError extends Error {
  constructor(message = 'Ошибка доступа') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = AccessError;
