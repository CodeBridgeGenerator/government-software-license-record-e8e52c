const users = require("./users/users.service.js");
const sheet1 = require("./sheet1/sheet1.service.js");
const sheet2 = require("./sheet2/sheet2.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
  app.configure(sheet1);
  app.configure(sheet2);
    // ~cb-add-configure-service-name~
};
