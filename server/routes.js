import apiRouter from './api/v1';

module.exports = function(app) {
  app.use('/api/v1', apiRouter);
};
