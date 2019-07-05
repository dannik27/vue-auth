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
  return bcrypt.compareSync(plainPass, hashword);
};
