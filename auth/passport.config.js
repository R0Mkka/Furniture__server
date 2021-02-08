const usernameField = 'email';

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['token'];
  }

  return token;
}

module.exports.jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

module.exports.localOptions = {
  usernameField,
  session: false,
};
