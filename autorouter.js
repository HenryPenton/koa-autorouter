const send = require('koa-send'),
  fs = require('fs'),
  render = require('koa-ejs'),
  path = require('path'),
  run = require('../../../run.js');
  
const publicFolder =  path.join(__dirname, '../../../public');
const viewsFolder =  path.join(__dirname, '../../../views');
  
render(app, {
  root: viewsFolder,
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
});

autorouter = async (ctx) => {

  if (!(ctx.path.includes('.'))) {
    if (ctx.path.length == 1) {
      await ctx.render('index', await run('index', ctx));

    } else {
      if (!(pageExists(ctx.path + '.html'))) {
        await ctx.render('404');
      } else {
        await ctx.render(ctx.path.substr(1), await run(ctx.path));
      }
    }
  } else {
	  
    await send(ctx, ctx.path, {
      root: publicFolder
    });
  }

}

module.exports = autorouter;


pageExists = (page) => {
  return fs.existsSync(viewsFolder + page);
}
