[![Tests](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml/badge.svg)](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml)

# Mesto

Cервис Mesto: интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки.

Состоит из frontend и backend частей.

## Demo

Frontend:

[mesto-demo.surge.sh](https://mesto-demo.surge.sh/)

Email: testuser@test.com  
Пароль: 11111111

## Functional

Frontend:

- регистрация и авторизация пользователей
- реализовано добавление/удаление лайка
- добавление и удаление собственной карточки
- редактирование профиля и аватара
- модальные окна открываются при нажатии на соответствующий элемент интерфейса

Backend:

- при запуске приложение подключается к серверу mongo
- в приложении описаны схемы пользователя, карточки. Все поля схем пользователя и карточки валидируются
- во всех контроллерах предусмотрена гарантированная отправка сообщения об ошибке, сообщение об ошибке соответствует её типу, нет обработки невозможных ошибок
- приложение корректно обрабатывает запросы по роутам, все роуты, кроме /signin и /signup , защищены авторизацией
- централизованный обработчик ошибок в единой middleware
- запросы и ответы записываются в файл request.log, все ошибки записываются в файл error.log ;
- поддержка CORS запросов

## Tech Stack

<span>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Иконка React">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="Иконка React Router">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="Иконка 'JavaScript'">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="Иконка CSS3">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Иконка HTML5">
  <a href=""><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Иконка 'Express'"></a>
  <a href=""><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Иконка 'Node JS'"></a>
  <a href=""><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="Иконка 'MongoDB'"></a>
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Иконка 'NGINX'">
</span>

## Screenshots

![Desktop app screenshot](./screenshot/mesto_desk.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/simfart/react-mesto-api-full-gha.git
```

Go to the project directory backend

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server (hot reload)

```bash
  npm run dev
```

Go to the project directory frontend

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server (localhost:3000)

```bash
  npm start
```

## Author

e-mail: artzbox7@gmail.com

Telegram: @artzina
