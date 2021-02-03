const WHITE_LIST = [undefined, 'http://127.0.0.1:5500', 'http://localhost:5500']; // TODO

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (WHITE_LIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS!'));
    }
  }
};

module.exports = corsOptions;
