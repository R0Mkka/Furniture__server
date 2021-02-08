const getIP = require('ipware')().get_ip;
const passport = require('passport');
const express = require('express');
const entriesRouter = express.Router();

const entriesService = require('../services/entries-service');

entriesRouter.get('/today', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error) {
            return res.status(400).send({ message: error.message });
        }

        if (!user) {
            return res.status(401).send({ message: 'Ошибка авторизации.' });
        }

        entriesService
            .getAllTodaysEntries()
            .then(entries => res.status(200).send(entries))
            .catch(error => res.status(400).send({ message: error.message }));
    })(req, res, next);
});

entriesRouter.get('/today-unique', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error) {
            return res.status(400).send({ message: error.message });
        }

        if (!user) {
            return res.status(401).send({ message: 'Ошибка авторизации.' });
        }

        entriesService
            .getUniqueTodaysEntries()
            .then(entries => res.status(200).send(entries))
            .catch(error => res.status(400).send({ message: error.message }));
    })(req, res, next);
});

entriesRouter.post('/', (req, res) => {
    const { clientIp } = getIP(req);
    entriesService
        .addEntry(clientIp, req.body.date)
        .then(newEntry => res.status(201).send(newEntry))
        .catch(error => res.status(400).send({ message: error.message }));
});

module.exports = entriesRouter;
