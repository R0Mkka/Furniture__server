const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const usersService = require('../services/users-service');

const { localOptions } = require('./passport.config');
const ErrorCode = require('../constants/error-code');

passport.use(
  'login',
  new LocalStrategy(localOptions, async (email, password, done) => {
    try {
      const user = await usersService.getUserByEmail(email);

      if (!user) {
        done({ code: ErrorCode.INCORRECT_EMAIL, message: 'Введены неверные данные.' }, false);
      } else {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        }

        return done({ code: ErrorCode.INCORRECT_PASSWORD, message: 'Введены неверные данные.' }, false);
      }
    } catch (error) {
      done(error, false);
    }
  }),
);
