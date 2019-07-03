const passport = require("passport");
const LocalStrategy = require("passport-local");

const express = require("express");
const router = express.Router();

const JwtStrategy = require("passport-jwt").Strategy;
const jwt = require("jsonwebtoken");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwtsecret = "asld,d1[2pdlodkmcjrbh7fml30,slm";

const database = require("./database");
const utils = require("./utils");

// Стратегии проверки авторизации

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password",
      session: false
    },
    function(login, password, done) {
      let user = database.findByCredentials(login, password);
      if (!user) {
        return done(null, false, {
          message: "User does not exist or wrong password."
        });
      } else {
        return done(null, user);
      }
    }
  )
);

// JWT стратегия

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: jwtsecret
};

passport.use(
  new JwtStrategy(jwtOptions, function(payload, done) {
    let user = database.findById(payload.id);
    if (!user) {
      return done(null, false, {
        message: "Token validation failed."
      });
    } else {
      return done(null, user);
    }
  })
);

// Прослойка для проверки авторизации

let baseAuth = async function(req, res, next) {
  await passport.authenticate("local", function(err, user) {
    if (!user) {
      res.status(401).send("Login failed");
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

let jwtAuth = async function(req, res, next) {
  await passport.authenticate("jwt", function(err, user) {
    if (!user) {
      res.status(401).send("Login failed");
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

// Настройка роутера

router.post("/register", async function(req, res) {
  let request = req.body;

  if (database.findByLogin(request.login)) {
    res.status(400).send("Error! User with this name already exists");
  }

  database.save({
    name: req.body.name,
    login: req.body.login,
    passwordHash: await utils.cryptPassword(req.body.password)
  });
  res.send(`New user created, username:${req.body.name}`);
});

router.get("/check", jwtAuth, function(req, res) {
  res.send("Check success");
});

router.post("/login", baseAuth, function(req, res) {
  let user = req.user;

  const payload = {
    id: user.id,
    displayName: user.name
  };
  const token = jwt.sign(payload, jwtsecret, { expiresIn: "10s" });

  res.send({ user: user.name, token: "JWT " + token });
});

router.post("/logout", function(req, res) {
  res.send("Just remove your token on client side");
});

module.exports.baseAuth = baseAuth;
module.exports.jwtAuth = jwtAuth;
module.exports.authRouter = router;
