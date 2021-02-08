const express = require('express');
const usersRouter = express.Router();

const usersService = require('../services/users-service');

const { USER_CREATION_PASSWORD } = process.env;

usersRouter.post('/', (req, res) => {
    const { userCreationPassword } = req.body;

    if (!userCreationPassword || userCreationPassword !== USER_CREATION_PASSWORD) {
        return res.status(403).send({ message: 'Неверный пароль для создания пользователей!' });
    }

    usersService.createUser(req.body)
        .then(newUser => {
            if (newUser) {
                return res.status(201).send('Ок');
            }

            res.status(400).send({ message: 'Ошибка создания пользователя!' });
        })
        .catch(error => res.status(400).send({ message: error.message }));
});

module.exports = usersRouter;
