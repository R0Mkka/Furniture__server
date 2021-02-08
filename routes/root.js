const passport = require('passport');
const express = require('express');
const rootRouter = express.Router();

const authService = require('../services/auth-service');

const ErrorCode = require('../constants/error-code');

rootRouter.get('/', (req, res) => {
    res.redirect('/admin');
});

rootRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

rootRouter.get('/login', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error || !user) {
            return res.render('pages/login');
        }

        res.redirect('/admin');
    })(req, res, next);
});

rootRouter.post('/login', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (user) {
            return res.redirect('/admin');
        }

        if (error) {
            return res.status(403).render('pages/login', { error, formData: req.body });
        }

        passport.authenticate('login', (error, user) => {
            if (error) {
                return res.status(403).render('pages/login', { error, formData: req.body });
            }
    
            if (!user) {
                return res.status(403).render('pages/login', {
                    error: { code: ErrorCode.INCORRECT_CREDENTIALS, message: 'Введены неверные данные.' },
                    formData: req.body,
                });
            }
    
            const token = authService.generateJwt(user);
            res.cookie('token', token);
            res.redirect('admin');
        })(req, res, next);
    })(req, res, next);
});

module.exports = rootRouter;