var bcrypt = require("bcrypt");

exports.cryptPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return reject(err);

      bcrypt.hash(password, salt, function(err, hash) {
        return resolve(hash);
      });
    });
  });
};

exports.comparePassword = function(plainPass, hashword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
      return err == null ? resolve(isPasswordMatch) : reject(err);
    });
  });
};
