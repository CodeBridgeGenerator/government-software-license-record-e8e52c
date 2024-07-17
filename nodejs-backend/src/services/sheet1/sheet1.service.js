const { Sheet1 } = require('./sheet1.class');
const createModel = require('../../models/sheet1.model');
const hooks = require('./sheet1.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/sheet1', new Sheet1(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sheet1');

  service.hooks(hooks);
};