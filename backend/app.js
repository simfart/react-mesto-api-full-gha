require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_ADRESS } = require('./utils/config');

const app = express();
mongoose.connect(MONGO_ADRESS);
// app.use(cors());

app.use(cors({
  origin: [
    'http://84.201.128.134',
    'http://84.201.128.134:3000',
    'http://84.201.128.134:3001',
    'http://localhost:3001',
    'http://127.0.0.1:27017',
    'http://simfart.nomoredomains.monster',
    'https://simfart.nomoredomains.monster',
  ],
  method: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
}));

app.use(requestLogger); // подключаем логгер запросов
app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(errorHandler);

// app.listen(PORT);
app.listen(PORT, () => { // Устанавливаем слушатель порта!
  console.log(`Сервер запущен на порту: ${PORT}, в ${new Date()}`); // Проверка сервера
});
