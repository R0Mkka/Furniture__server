const jwt = require('jsonwebtoken');

class AuthService {
    generateJwt({ id, email }) {
        const expiry = new Date();
      
        expiry.setDate(expiry.getDate() + 7);
      
        return jwt.sign(
            {
                id,
                email,
                exp: parseInt(expiry.getTime() / 1000),
            },
            process.env.SECRET_KEY,
        );
    }

    isJwtValid(token) {
        if (!token) {
            return false;
        }

        const decodedToken = jwt.decode(token);

        if (!decodedToken) {
            return false;
        }
         
        const expiry = decodedToken.exp;
        const now = new Date();
        return now.getTime() > expiry * 1000;
    }
}

module.exports = new AuthService();