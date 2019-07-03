const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");

const authConfig = require("./auth-config");

// Для кросс-доменных запросов
app.use(cors());

// Необходимо, для передачи данных в теле запроса
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Маршрутизация
app.use("/auth", authConfig.authRouter);

// Паспорт
app.use(passport.initialize());

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
