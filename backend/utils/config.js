const { PORT = 3001 } = process.env;
const {
  MONGO_ADRESS = "mongodb+srv://artzbox7:simsim77@cluster0.fws7jx6.mongodb.net/?retryWrites=true&w=majority",
} = process.env;

module.exports = {
  PORT,
  MONGO_ADRESS,
};
