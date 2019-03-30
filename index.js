const Koa = require('koa');
app = new Koa();
autorouter = require('./autorouter.js');

app.use(autorouter);
module.exports = function autoroute(){
	return app;
}