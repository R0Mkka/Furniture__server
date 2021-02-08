const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;

const usersService = require('../services/users-service');

const { jwtOptions } = require('./passport.config');

passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            const userId = jwtPayload.id;
            const user = await usersService.getUserById(userId);

            if (user) {
                return done(null, user);
            }
        
            return done({ message: `Не найден пользователь с таким id: ${userId}!` }, false);
        } catch (error) {
            done(error);
        }
    }),
);
