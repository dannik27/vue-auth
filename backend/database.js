const utils = require("./utils");

let users = [
  {
    id: 1,
    name: "Petya",
    login: "admin",
    hashPassword: "$2b$10$ROcg27BQnlRWVl3HoVkPuufs7v5csC0gZxDW0GsVJUMnGi2we/kX2"
  }
];

let nextId = 2;

module.exports.findAll = function() {
  return users;
};

module.exports.findById = function(id) {
  return users.find(user => {
    return user.id === id;
  });
};

module.exports.findByCredentials = function(login, password) {
  return users.find(user => {
    return (
      user.login === login && utils.comparePassword(password, user.hashPassword)
    );
  });
};

module.exports.findByLogin = function(login) {
  return users.find(user => {
    return user.login === login;
  });
};

module.exports.save = function(user) {
  user.id = nextId++;
  users.push(user);
  console.log(user);
};
