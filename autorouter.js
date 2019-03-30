const send = require("koa-send"),
  fs = require("fs"),
  render = require("koa-ejs"),
  path = require("path"),
  autorouterSetup = directory => {
    const autorouter = async ctx => {
      const run = require(directory + "/run.js");
      const publicFolder = path.join(directory, "/public");
      const viewsFolder = path.join(directory, "/views");
      render(app, {
        root: viewsFolder,
        layout: false,
        viewExt: "html",
        cache: false,
        debug: false
      });
      if (!ctx.path.includes(".")) {
        if (ctx.path.length == 1) {
          await ctx.render("index", await run("index", ctx));
        } else {
          if (!pageExists(viewsFolder, ctx.path + ".html")) {
            await ctx.render("404");
          } else {
            await ctx.render(ctx.path.substr(1), await run(ctx.path));
          }
        }
      } else {
        await send(ctx, ctx.path, {
          root: publicFolder
        });
      }
    };
    return autorouter;
  };

module.exports = autorouterSetup;

pageExists = (viewsFolder, page) => {
  return fs.existsSync(viewsFolder + page);
};
