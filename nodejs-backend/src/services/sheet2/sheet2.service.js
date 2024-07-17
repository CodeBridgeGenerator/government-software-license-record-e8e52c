const { Sheet2 } = require('./sheet2.class');
const createModel = require('../../models/sheet2.model');
const hooks = require('./sheet2.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/sheet2', new Sheet2(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sheet2');

  service.hooks(hooks);
};