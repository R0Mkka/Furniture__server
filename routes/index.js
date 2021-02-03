const feedbacksRouter = require('./feedbacks');

function initRouter(app) {
  app.use('/feedbacks', feedbacksRouter);
}

module.exports = initRouter;
