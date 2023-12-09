const { PORT = 3001 } = process.env;
const { MONGO_ADRESS = "mongodb://127.0.0.1:27017/mestodb" } = process.env;

module.exports = {
  PORT,
  MONGO_ADRESS,
};
