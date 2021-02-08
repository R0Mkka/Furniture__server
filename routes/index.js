const passport = require('passport');

const rootRouter = require('./root');
const feedbacksRouter = require('./feedbacks');
const usersRouter = require('./users');
const entriesRouter = require('./entries');
const adminRouter = require('./admin');

function initRouter(app) {
  app.use('/', rootRouter);
  app.use('/feedbacks', feedbacksRouter);
  app.use('/users', usersRouter);
  app.use('/entries', entriesRouter);
  app.use(
    '/admin',
    passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
    adminRouter,
  );
}

module.exports = initRouter;
