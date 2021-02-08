const bcrypt = require('bcrypt');

const idGenerationService = require('./id-generation-service');

const User = require('../schemas/user');

class UsersService {
    getUserByEmail(email) {
        return User.findOne({ email });
    }

    getUserById(id) {
        return User.findOne({ id });
    }

    async createUser(userData) {
        return this.getUserByEmail(userData.email)
            .then(user => {
                if (!user) {
                    return this.createUserEntity(userData);
                }

                throw new Error('User with such email exists!');
            })
            .then(userEntity => userEntity.save());
    }

    async createUserEntity(userData) {
        const { email, password } = userData;
        const id = idGenerationService.generate();
        const hashedPassword = await bcrypt.hash(password, 10);
        return new User({
            id,
            email,
            password: hashedPassword,
        });
    }
}

module.exports = new UsersService();
