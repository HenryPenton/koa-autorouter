const Koa = require("koa");
app = new Koa();
autorouter = require("./autorouter.js");

module.exports = function autoroute(directory) {
  app.use(autorouter(directory));
  return app;
};
