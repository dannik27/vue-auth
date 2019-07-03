let users = [
  {
    id: 1,
    name: "Petya",
    login: "admin",
    password: "admin"
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
    return user.login === login && user.password === password;
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
};
